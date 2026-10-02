import { useCallback, useEffect, useRef, useState } from 'react';
import Mark, { PAINT } from '../brand/Mark';
import { hasWebGL } from '../universo/webgl';
import Film from './film/Film';
import { Score } from './score';
import { DURATION, film, fmtTime, SCENES, sceneIndexAt } from './timeline';
import '../brand/tokens.css';
import './video.css';

/** Fotograma de portada: el sello ya revelado. */
const POSTER_T = 4.6;
const FONTS = [
	'400 80px "Cormorant Garamond"',
	'300 30px "Jost"',
	'500 22px "Jost"',
];

function Icon({ d }: { d: string }) {
	return (
		<svg width='18' height='18' viewBox='0 0 24 24' aria-hidden='true'>
			<path d={d} fill='currentColor' />
		</svg>
	);
}
const PLAY = 'M7 4.5v15l13-7.5z';
const PAUSE = 'M6 4h4v16H6zM14 4h4v16h-4z';
const SOUND =
	'M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z';
const MUTE =
	'M4 9v6h4l5 4V5L8 9H4zm15.6 3 2.2-2.2-1.4-1.4-2.2 2.2-2.2-2.2-1.4 1.4 2.2 2.2-2.2 2.2 1.4 1.4 2.2-2.2 2.2 2.2 1.4-1.4z';
const FULL =
	'M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z';

export default function VideoPage() {
	const stage = useRef<HTMLDivElement>(null);
	const score = useRef<Score | null>(null);
	const recorder = useRef<MediaRecorder | null>(null);
	const [ready, setReady] = useState(false);
	const [started, setStarted] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [muted, setMuted] = useState(false);
	const [time, setTime] = useState(POSTER_T);
	const [recording, setRecording] = useState(false);
	const [box, setBox] = useState({ s: 1, x: 0, y: 0 });
	const [webgl] = useState(hasWebGL);
	// Resolución interna fija (el video siempre se compone igual); más ligera en pantallas pequeñas.
	const [res] = useState(() =>
		window.innerWidth < 900 ? { w: 1280, h: 720 } : { w: 1920, h: 1080 },
	);
	const canRecord =
		typeof MediaRecorder !== 'undefined' &&
		'captureStream' in HTMLCanvasElement.prototype;

	// Fuentes cargadas antes de dibujar los textos del video.
	useEffect(() => {
		film.t = POSTER_T;
		film.playing = false;
		if (import.meta.env.DEV) Object.assign(window, { __film: film, __score: score });
		// Desarrollo: /video?t=12.5 fija el video en un instante para revisarlo.
		const fixed = import.meta.env.DEV
			? new URLSearchParams(location.search).get('t')
			: null;
		if (fixed !== null) {
			film.t = Number(fixed);
			setTime(film.t);
			setStarted(true);
		}
		void Promise.all(FONTS.map(f => document.fonts.load(f))).finally(() =>
			setReady(true),
		);
		return () => {
			film.playing = false;
			film.now = null;
			film.onEnd = null;
			void score.current?.close();
		};
	}, []);

	// Escala el lienzo 1920 × 1080 al espacio disponible (también en pantalla completa).
	useEffect(() => {
		const el = stage.current;
		if (!el) return;
		const ro = new ResizeObserver(([e]) => {
			const { width, height } = e.contentRect;
			const s = Math.min(width / res.w, height / res.h);
			setBox({ s, x: (width - res.w * s) / 2, y: (height - res.h * s) / 2 });
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, [res]);

	// Tiempo en pantalla (10 veces por segundo; el render no depende de React).
	useEffect(() => {
		if (!playing) return;
		const id = setInterval(() => setTime(film.t), 100);
		return () => clearInterval(id);
	}, [playing]);

	const getScore = () => (score.current ??= new Score());

	const play = useCallback(async (from = film.t) => {
		const sc = getScore();
		await sc.ctx.resume();
		const start = from >= DURATION - 0.05 ? 0 : from;
		const when = sc.ctx.currentTime + 0.06;
		sc.play(start, when);
		film.t = start;
		film.now = () => start + Math.max(0, sc.ctx.currentTime - when);
		film.playing = true;
		setStarted(true);
		setPlaying(true);
	}, []);

	const pause = useCallback(() => {
		if (film.now) film.t = film.now();
		film.playing = false;
		score.current?.stop();
		setPlaying(false);
		setTime(film.t);
		film.invalidate();
	}, []);

	const seek = useCallback(
		(t: number) => {
			const to = Math.min(DURATION, Math.max(0, t));
			if (film.playing) void play(to);
			else {
				film.t = to;
				setTime(to);
				film.invalidate();
			}
		},
		[play],
	);

	const finishRecording = useCallback(() => {
		recorder.current?.stop();
	}, []);

	useEffect(() => {
		film.onEnd = () => {
			score.current?.stop();
			setPlaying(false);
			setTime(DURATION);
			finishRecording();
		};
	}, [finishRecording]);

	const toggleMute = () => {
		const m = !muted;
		setMuted(m);
		getScore().setMuted(m);
	};

	const startWith = (sound: boolean) => {
		setMuted(!sound);
		getScore().setMuted(!sound);
		void play(0);
	};

	const exportVideo = () => {
		const canvas = stage.current?.querySelector('canvas');
		if (!canvas || recording) return;
		const sc = getScore();
		const stream = canvas.captureStream(30);
		sc.stream.stream.getAudioTracks().forEach(tr => stream.addTrack(tr));
		const type = [
			'video/webm;codecs=vp9,opus',
			'video/webm;codecs=vp8,opus',
			'video/webm',
		].find(t => MediaRecorder.isTypeSupported(t));
		const rec = new MediaRecorder(stream, {
			mimeType: type,
			videoBitsPerSecond: 12_000_000,
		});
		const chunks: Blob[] = [];
		rec.ondataavailable = e => e.data.size && chunks.push(e.data);
		rec.onstop = () => {
			const url = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
			const a = document.createElement('a');
			a.href = url;
			a.download = 'victoria-de-dios-anuncio.webm';
			a.click();
			setTimeout(() => URL.revokeObjectURL(url), 2000);
			setRecording(false);
			recorder.current = null;
		};
		recorder.current = rec;
		setRecording(true);
		rec.start(250);
		void play(0);
	};

	// Teclado: espacio/K reproducir-pausar, flechas ±5 s (respuesta inmediata, sin animación).
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (recording || (e.target as HTMLElement).closest('input, textarea'))
				return;
			if (e.key === ' ' || e.key === 'k') {
				e.preventDefault();
				if (film.playing) pause();
				else void play();
			} else if (e.key === 'ArrowRight') seek(film.t + 5);
			else if (e.key === 'ArrowLeft') seek(film.t - 5);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [pause, play, seek, recording]);

	const chapter = SCENES[sceneIndexAt(time)];

	return (
		<div className='vv'>
			<header className='vv-top'>
				<a
					href='/'
					className='vv-brand'
					aria-label='Victoria de Dios, volver al manual'
				>
					<Mark kind='symbol' width='26px' mono={PAINT.goldLight} />
					<span>Anuncio de marca · {Math.round(DURATION)} s</span>
				</a>
				<a href='/' className='vv-back'>
					Volver al manual
				</a>
			</header>

			<main className='vv-main'>
				<div
					className='vv-stage'
					ref={stage}
					onDoubleClick={() => void stage.current?.requestFullscreen()}
				>
					{webgl ? (
						<div
							className='vv-frame'
							style={{
								width: res.w,
								height: res.h,
								transform: `translate(${box.x}px, ${box.y}px) scale(${box.s})`,
							}}
						>
							{ready && <Film width={res.w} height={res.h} playing={playing} />}
						</div>
					) : (
						<div className='vv-nogl'>
							<p>
								Tu navegador no puede reproducir este video (WebGL no
								disponible).
							</p>
						</div>
					)}

					{!started && webgl && (
						<div className='vv-poster'>
							<button
								type='button'
								className='vv-bigplay'
								onClick={() => startWith(true)}
								aria-label='Reproducir con sonido'
							>
								<Icon d={PLAY} />
							</button>
							<button
								type='button'
								className='vv-silent'
								onClick={() => startWith(false)}
							>
								Reproducir sin sonido
							</button>
							<span className='vv-poster__label'>
								Ver el anuncio · {Math.round(DURATION)} s
							</span>
						</div>
					)}
					{recording && (
						<p className='vv-rec'>
							Grabando el video… {fmtTime(time)} / {fmtTime(DURATION)}
						</p>
					)}
				</div>

				<div className='vv-controls' aria-label='Controles del video'>
					<button
						type='button'
						onClick={() => (playing ? pause() : void play())}
						disabled={recording}
						aria-label={playing ? 'Pausar' : 'Reproducir'}
					>
						<Icon d={playing ? PAUSE : PLAY} />
					</button>
					<span className='vv-time'>
						{fmtTime(time)} / {fmtTime(DURATION)}
					</span>
					<div className='vv-track'>
						<input
							type='range'
							min={0}
							max={DURATION}
							step={0.1}
							value={time}
							disabled={recording}
							aria-label='Posición del video'
							onChange={e => seek(Number(e.target.value))}
							style={
								{ '--p': `${(time / DURATION) * 100}%` } as React.CSSProperties
							}
						/>
						{SCENES.slice(1).map(s => (
							<i
								key={s.id}
								style={{ left: `${(s.start / DURATION) * 100}%` }}
								aria-hidden='true'
							/>
						))}
					</div>
					<button
						type='button'
						onClick={toggleMute}
						aria-label={muted ? 'Activar sonido' : 'Silenciar'}
					>
						<Icon d={muted ? MUTE : SOUND} />
					</button>
					<button
						type='button'
						onClick={() => void stage.current?.requestFullscreen()}
						aria-label='Pantalla completa'
					>
						<Icon d={FULL} />
					</button>
					{canRecord && (
						<button
							type='button'
							className='vv-export'
							onClick={exportVideo}
							disabled={recording}
						>
							{recording ? 'Grabando…' : 'Exportar .webm'}
						</button>
					)}
				</div>

				<ol className='vv-chapters'>
					{SCENES.map(s => (
						<li key={s.id}>
							<button
								type='button'
								aria-current={chapter.id === s.id ? 'step' : undefined}
								onClick={() => seek(s.start + 0.01)}
								disabled={recording}
							>
								<span>{fmtTime(s.start)}</span>
								{s.label}
							</button>
						</li>
					))}
				</ol>

				<p className='vv-credits'>
					Música original sintetizada para esta pieza. Imágenes: escenas y
					fotografías de producto de la marca. El sonido solo se activa al
					pulsar reproducir. Atajos: espacio para pausar, flechas para avanzar o
					retroceder 5 s.
				</p>
			</main>
		</div>
	);
}
