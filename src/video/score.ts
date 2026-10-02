/**
 * Banda sonora del anuncio, sintetizada en el navegador (Web Audio): sin archivos ni licencias.
 * Ambiente cálido en re mayor a 80 BPM: pads analógicos, piano suave, bajo y efectos
 * (cortinillas, golpe del sello, destello) sincronizados con la línea de tiempo del video.
 */
import { DURATION, SCENES, WIPE } from './timeline';

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const BEAT = 60 / 80;

const CH = {
	Dmaj9: [50, 57, 61, 66, 76],
	Bm9: [47, 54, 57, 62, 73],
	Gmaj9: [43, 50, 54, 59, 69],
	A6sus: [45, 52, 62, 66, 71],
	Em9: [40, 47, 55, 62, 66],
	Asus4: [45, 52, 62, 64, 69],
	A: [45, 52, 61, 64, 69],
};

/** Progresión: [inicio (s), duración (s), acorde]. */
const PROGRESSION: [number, number, number[]][] = [
	[0.3, 5.2, CH.Dmaj9],
	[5.5, 3, CH.Dmaj9],
	[8.5, 2.5, CH.Bm9],
	[11, 3.5, CH.Gmaj9],
	[14.5, 3.5, CH.A6sus],
	[18, 3.5, CH.Bm9],
	[21.5, 3.5, CH.Gmaj9],
	[25, 3, CH.Em9],
	[28, 3, CH.Gmaj9],
	[31, 1.8, CH.Asus4],
	[32.8, 1.2, CH.A],
	[34, 3, CH.Dmaj9],
	[37, 3, CH.Bm9],
	[40, 2, CH.Gmaj9],
	[42, 1.6, CH.Asus4],
	[43.6, 4.4, CH.Dmaj9],
];

/** Densidad del arpegio por tramo (0 = sin arpegio, 1 = negras, 2 = corcheas). */
const ARP: [number, number, number][] = [
	[5.5, 11, 1],
	[11, 25, 2],
	[25, 31, 2],
	[34, 40, 1],
];

type Voice = AudioScheduledSourceNode;

export class Score {
	readonly ctx: AudioContext;
	private master: GainNode;
	private speakers: GainNode;
	private music: GainNode;
	private sfx: GainNode;
	private reverb: ConvolverNode;
	private voices: Voice[] = [];
	private timer = 0;
	private noise: AudioBuffer;
	/** Salida extra para grabar el video con sonido. */
	readonly stream: MediaStreamAudioDestinationNode;

	constructor() {
		this.ctx = new AudioContext();
		const c = this.ctx;
		const comp = c.createDynamicsCompressor();
		comp.threshold.value = -18;
		comp.ratio.value = 3;
		comp.attack.value = 0.02;
		comp.release.value = 0.4;
		this.master = c.createGain();
		this.master.gain.value = 0.9;
		this.music = c.createGain();
		this.music.gain.value = 0.85;
		this.sfx = c.createGain();
		this.sfx.gain.value = 0.7;
		this.reverb = c.createConvolver();
		this.reverb.buffer = this.impulse(3.4);
		const wet = c.createGain();
		wet.gain.value = 0.55;
		this.reverb.connect(wet).connect(comp);
		this.music.connect(comp);
		this.sfx.connect(comp);
		comp.connect(this.master);
		// Altavoces y grabación van por ramas distintas: silenciar no afecta a la exportación.
		this.speakers = c.createGain();
		this.master.connect(this.speakers).connect(c.destination);
		this.stream = c.createMediaStreamDestination();
		this.master.connect(this.stream);
		this.noise = this.whiteNoise(2);
	}

	setMuted(muted: boolean) {
		this.speakers.gain.setTargetAtTime(
			muted ? 0 : 1,
			this.ctx.currentTime,
			0.05,
		);
	}

	/**
	 * Desbloquea el audio dentro del mismo toque del usuario (iOS/Android lo exigen):
	 * reanuda el contexto y reproduce un instante de silencio. Llamar SIN await previo.
	 */
	unlock() {
		void this.ctx.resume();
		const b = this.ctx.createBuffer(1, 1, this.ctx.sampleRate);
		const src = this.ctx.createBufferSource();
		src.buffer = b;
		src.connect(this.ctx.destination);
		src.start(0);
	}

	/**
	 * Reproduce desde `from` (s del video) empezando en `when` (tiempo del contexto).
	 * Programador anticipado: cada 100 ms se programan solo los sonidos de los próximos
	 * 1,5 s. Crear cientos de osciladores de golpe satura el audio en móviles.
	 */
	play(from: number, when = this.ctx.currentTime + 0.05) {
		this.stop();
		const events = this.events(from).sort((a, b) => a[0] - b[0]);
		const at = (s: number) => when + (s - from);
		let next = 0;
		const pump = () => {
			const songNow = from + (this.ctx.currentTime - when);
			while (next < events.length && events[next][0] <= songNow + 1.5) {
				const [s, fn] = events[next++];
				fn(at(s));
			}
			if (next >= events.length && this.timer) {
				clearInterval(this.timer);
				this.timer = 0;
			}
		};
		pump();
		this.timer = window.setInterval(pump, 100);
	}

	/** Lista de sonidos del video (instante en s del video → cómo sonarlo) a partir de `from`. */
	private events(from: number) {
		const list: [number, (t: number) => void][] = [];
		for (const [s, d, chord] of PROGRESSION) {
			if (s + d < from) continue;
			const start = Math.max(s, from);
			list.push([start, t => this.pad(chord, t, s + d - start, start > s)]);
			list.push([
				start,
				t => this.sub(chord[0] - 12, t, Math.min(d, s + d - start)),
			]);
		}
		for (const [a, b, density] of ARP) {
			const step = density === 2 ? BEAT / 2 : BEAT;
			let i = 0;
			for (let s = a; s < b - 0.05; s += step, i++) {
				if (s < from) continue;
				const chord = chordAt(s);
				const upper = [chord[2], chord[3], chord[4], chord[3] + 12];
				const note = upper[i % upper.length];
				const vel = i % 4 === 0 ? 0.11 : 0.075;
				list.push([s, t => this.pluck(note, t, vel)]);
				if (density === 2 && s > 18 && s < 31)
					list.push([s + step / 2, t => this.shaker(t)]);
			}
		}
		// Efectos sincronizados con la imagen.
		const fx: [number, (t: number) => void][] = [
			[0.9, t => this.bell(86, t, 0.08)],
			[2.6, t => this.bell(81, t, 0.06)],
			...SCENES.slice(1).map(
				sc =>
					[sc.start - WIPE, (t: number) => this.whoosh(t, WIPE * 2)] as [
						number,
						(t: number) => void,
					],
			),
			[29.6, t => this.thud(t)],
			[31.2, t => this.riser(t, 2.6)],
			[43.6, t => this.bell(88, t, 0.09)],
			[43.78, t => this.bell(81, t, 0.06)],
		];
		for (const e of fx) if (e[0] >= from) list.push(e);
		return list;
	}

	stop() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = 0;
		}
		const now = this.ctx.currentTime;
		for (const v of this.voices) {
			try {
				v.stop(now + 0.03);
			} catch {
				/* ya detenido */
			}
		}
		this.voices = [];
	}

	async close() {
		this.stop();
		await this.ctx.close();
	}

	/* ---------- Instrumentos ---------- */

	private env(
		g: GainNode,
		t: number,
		peak: number,
		attack: number,
		hold: number,
		release: number,
	) {
		g.gain.setValueAtTime(0, t);
		g.gain.linearRampToValueAtTime(peak, t + attack);
		g.gain.setValueAtTime(peak, t + attack + hold);
		g.gain.linearRampToValueAtTime(0, t + attack + hold + release);
	}

	/** Pad analógico: dos sierras desafinadas por nota, filtradas y con reverb. */
	private pad(chord: number[], t: number, dur: number, skipAttack: boolean) {
		const c = this.ctx;
		const filter = c.createBiquadFilter();
		filter.type = 'lowpass';
		filter.frequency.value = 820;
		filter.Q.value = 0.4;
		const g = c.createGain();
		const attack = skipAttack ? 0.15 : 1.4;
		this.env(g, t, 0.05, attack, Math.max(0, dur - attack - 0.4), 1.8);
		filter.connect(g);
		g.connect(this.music);
		g.connect(this.reverb);
		for (const n of chord) {
			for (const det of [-7, 7]) {
				const o = c.createOscillator();
				o.type = 'sawtooth';
				o.frequency.value = hz(n);
				o.detune.value = det;
				const og = c.createGain();
				og.gain.value = n > 70 ? 0.35 : 0.6;
				o.connect(og).connect(filter);
				o.start(t);
				o.stop(t + dur + 2.4);
				this.track(o);
			}
		}
	}

	private sub(n: number, t: number, dur: number) {
		const c = this.ctx;
		const o = c.createOscillator();
		o.type = 'sine';
		o.frequency.value = hz(n);
		const g = c.createGain();
		this.env(g, t, 0.16, 0.6, Math.max(0, dur - 1), 1.2);
		o.connect(g).connect(this.music);
		o.start(t);
		o.stop(t + dur + 1.4);
		this.track(o);
	}

	/** Piano suave: ataque rápido y caída exponencial, con mucha sala. */
	private pluck(n: number, t: number, vel: number) {
		const c = this.ctx;
		const g = c.createGain();
		g.gain.setValueAtTime(0, t);
		g.gain.linearRampToValueAtTime(vel, t + 0.006);
		g.gain.exponentialRampToValueAtTime(0.0006, t + 1.8);
		const lp = c.createBiquadFilter();
		lp.type = 'lowpass';
		lp.frequency.value = 2600;
		lp.connect(g);
		g.connect(this.music);
		g.connect(this.reverb);
		for (const [type, mult, amp] of [
			['triangle', 1, 1],
			['sine', 2, 0.25],
		] as const) {
			const o = c.createOscillator();
			o.type = type;
			o.frequency.value = hz(n) * mult;
			const og = c.createGain();
			og.gain.value = amp;
			o.connect(og).connect(lp);
			o.start(t);
			o.stop(t + 1.9);
			this.track(o);
		}
	}

	/** Campana: el brillo del dorado. */
	private bell(n: number, t: number, vel: number) {
		const c = this.ctx;
		for (const [mult, amp, decay] of [
			[1, 1, 3.2],
			[2.76, 0.35, 1.6],
			[5.4, 0.12, 0.8],
		]) {
			const o = c.createOscillator();
			o.type = 'sine';
			o.frequency.value = hz(n) * mult;
			const g = c.createGain();
			g.gain.setValueAtTime(0, t);
			g.gain.linearRampToValueAtTime(vel * amp, t + 0.004);
			g.gain.exponentialRampToValueAtTime(0.0005, t + decay);
			o.connect(g);
			g.connect(this.sfx);
			g.connect(this.reverb);
			o.start(t);
			o.stop(t + decay + 0.1);
			this.track(o);
		}
	}

	private noiseSource(t: number, dur: number) {
		const s = this.ctx.createBufferSource();
		s.buffer = this.noise;
		s.loop = true;
		s.start(t);
		s.stop(t + dur + 0.1);
		this.track(s);
		return s;
	}

	/** Cortinilla: soplo de aire que cruza de izquierda a derecha. */
	private whoosh(t: number, dur: number) {
		const c = this.ctx;
		const src = this.noiseSource(t, dur);
		const bp = c.createBiquadFilter();
		bp.type = 'bandpass';
		bp.Q.value = 1.1;
		bp.frequency.setValueAtTime(380, t);
		bp.frequency.exponentialRampToValueAtTime(3400, t + dur * 0.7);
		bp.frequency.exponentialRampToValueAtTime(1200, t + dur);
		const g = c.createGain();
		g.gain.setValueAtTime(0, t);
		g.gain.linearRampToValueAtTime(0.22, t + dur * 0.6);
		g.gain.linearRampToValueAtTime(0, t + dur);
		const pan = c.createStereoPanner();
		pan.pan.setValueAtTime(-0.6, t);
		pan.pan.linearRampToValueAtTime(0.6, t + dur);
		src.connect(bp).connect(g).connect(pan);
		pan.connect(this.sfx);
		pan.connect(this.reverb);
	}

	/** Golpe de la prensa de sublimación. */
	private thud(t: number) {
		const c = this.ctx;
		const o = c.createOscillator();
		o.type = 'sine';
		o.frequency.setValueAtTime(130, t);
		o.frequency.exponentialRampToValueAtTime(42, t + 0.28);
		const g = c.createGain();
		g.gain.setValueAtTime(0, t);
		g.gain.linearRampToValueAtTime(0.5, t + 0.006);
		g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
		o.connect(g).connect(this.sfx);
		o.start(t);
		o.stop(t + 0.7);
		this.track(o);
		const src = this.noiseSource(t, 0.12);
		const lp = c.createBiquadFilter();
		lp.type = 'lowpass';
		lp.frequency.value = 900;
		const ng = c.createGain();
		ng.gain.setValueAtTime(0.18, t);
		ng.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
		src.connect(lp).connect(ng).connect(this.sfx);
	}

	/** Subida antes del final de «Hazlo tuyo». */
	private riser(t: number, dur: number) {
		const c = this.ctx;
		const src = this.noiseSource(t, dur);
		const hp = c.createBiquadFilter();
		hp.type = 'highpass';
		hp.frequency.setValueAtTime(300, t);
		hp.frequency.exponentialRampToValueAtTime(5000, t + dur);
		const g = c.createGain();
		g.gain.setValueAtTime(0, t);
		g.gain.linearRampToValueAtTime(0.09, t + dur * 0.9);
		g.gain.linearRampToValueAtTime(0, t + dur);
		src.connect(hp).connect(g);
		g.connect(this.sfx);
		g.connect(this.reverb);
	}

	private shaker(t: number) {
		const c = this.ctx;
		const src = this.noiseSource(t, 0.05);
		const hp = c.createBiquadFilter();
		hp.type = 'highpass';
		hp.frequency.value = 7000;
		const g = c.createGain();
		g.gain.setValueAtTime(0.028, t);
		g.gain.exponentialRampToValueAtTime(0.0005, t + 0.05);
		src.connect(hp).connect(g).connect(this.music);
	}

	/* ---------- Utilidades ---------- */

	/** Guarda la voz para poder pararla; se olvida sola al terminar (sin crecer sin límite). */
	private track(v: Voice) {
		this.voices.push(v);
		v.onended = () => {
			const i = this.voices.indexOf(v);
			if (i >= 0) this.voices.splice(i, 1);
		};
	}

	private whiteNoise(seconds: number) {
		const len = this.ctx.sampleRate * seconds;
		const b = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
		const d = b.getChannelData(0);
		for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
		return b;
	}

	/** Sala: respuesta al impulso estéreo con caída exponencial. */
	private impulse(seconds: number) {
		const rate = this.ctx.sampleRate;
		const len = rate * seconds;
		const b = this.ctx.createBuffer(2, len, rate);
		for (let ch = 0; ch < 2; ch++) {
			const d = b.getChannelData(ch);
			for (let i = 0; i < len; i++)
				d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
		}
		return b;
	}
}

function chordAt(s: number) {
	let chord = PROGRESSION[0][2];
	for (const [start, , c] of PROGRESSION) if (s >= start) chord = c;
	return chord;
}

export const SCORE_LENGTH = DURATION;
