import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import Mark, { PAINT } from './Mark';
import { CURVES, prefersReducedMotion } from './motion';
import './BrandFilm.css';

interface Chapter {
	id: string;
	label: string;
	duration: number;
}

const CHAPTERS: Chapter[] = [
	{ id: 'apertura', label: 'Apertura', duration: 2800 },
	{ id: 'hogar', label: 'Hogar', duration: 3600 },
	{ id: 'dia', label: 'Día a día', duration: 3600 },
	{ id: 'estilo', label: 'Estilo de vida', duration: 3600 },
	{ id: 'personalizado', label: 'Hecho para ti', duration: 5400 },
	{ id: 'entrega', label: 'Con cuidado', duration: 3400 },
	{ id: 'cierre', label: 'Cierre', duration: 2600 },
];

/** Momento de inicio (ms) de cada capítulo. */
const STARTS = CHAPTERS.map((_, i) =>
	CHAPTERS.slice(0, i).reduce((sum, c) => sum + c.duration, 0),
);

const PHOTO_CHAPTERS = [
	{
		id: 'hogar',
		src: '/escenas/hogar-aromas.jpg',
		title: 'Hogar',
		sub: 'Velas, aromas y textiles que visten la casa.',
	},
	{
		id: 'dia',
		src: '/escenas/tazas-y-tomatodos.jpg',
		title: 'Día a día',
		sub: 'Tazas y tomatodos para cada mañana.',
	},
	{
		id: 'estilo',
		src: '/escenas/coleccion-textil.jpg',
		title: 'Estilo de vida',
		sub: 'Prendas con el bordado de la casa.',
	},
	{
		id: 'entrega',
		src: '/escenas/unboxing-empaque.jpg',
		title: 'Con cuidado',
		sub: 'Cada pedido llega envuelto como un regalo.',
	},
];

/** Construye la línea de tiempo. Cada elemento tiene una sola animación con fotogramas clave,
 *  así saltar a cualquier capítulo deja siempre el estado correcto. */
function buildTimeline(root: HTMLElement, onUpdate: (t: number) => void) {
	const $ = (s: string) => root.querySelector(s);
	const $$ = (s: string) => root.querySelectorAll(s);
	const seda = CURVES.seda.anime;
	const ceremonia = CURVES.ceremonia.anime;
	const tl = anime.timeline({
		autoplay: false,
		easing: 'linear',
		update: a => onUpdate(a.currentTime),
	});
	const at = (id: string) => STARTS[CHAPTERS.findIndex(c => c.id === id)];
	const dur = (id: string) => CHAPTERS.find(c => c.id === id)!.duration;

	// Capas: aparecen al empezar su capítulo y se funden al terminar (la última se queda).
	CHAPTERS.forEach((c, i) => {
		const layer = $(`.vd-film__ch--${c.id}`);
		const start = STARTS[i];
		const last = i === CHAPTERS.length - 1;
		const first = i === 0;
		const keys = [
			{ value: first ? 1 : 0, duration: 0 },
			{ value: 1, duration: first ? 1 : 1 },
			{ value: 1, duration: c.duration - (last ? 1 : 450) },
			...(last ? [] : [{ value: 0, duration: 450, easing: 'easeInSine' }]),
		];
		tl.add({ targets: layer, opacity: keys }, start);
	});

	// Apertura: líneas que suben desde una máscara.
	tl.add(
		{
			targets: $$('.vd-film__ch--apertura .vd-film__line > span'),
			translateY: ['110%', '0%'],
			duration: 900,
			delay: anime.stagger(160),
			easing: seda,
		},
		250,
	);
	tl.add(
		{
			targets: $('.vd-film__ch--apertura .vd-film__kicker'),
			opacity: [0, 1],
			duration: 700,
			easing: seda,
		},
		1000,
	);

	// Capítulos con foto: telón de abajo arriba, acercamiento lento y título.
	PHOTO_CHAPTERS.forEach(p => {
		const s = at(p.id);
		const d = dur(p.id);
		const sel = `.vd-film__ch--${p.id}`;
		tl.add(
			{
				targets: $(`${sel} .vd-film__curtain`),
				translateY: ['100%', '0%'],
				duration: 950,
				easing: ceremonia,
			},
			s,
		)
			.add(
				{
					targets: $(`${sel} .vd-film__curtain-in`),
					translateY: ['-100%', '0%'],
					duration: 950,
					easing: ceremonia,
				},
				s,
			)
			.add(
				{
					targets: $(`${sel} img`),
					scale: [1.08, 1],
					duration: d + 400,
					easing: 'easeOutSine',
				},
				s,
			)
			.add(
				{
					targets: $(`${sel} .vd-film__title > span`),
					translateY: ['110%', '0%'],
					duration: 850,
					easing: seda,
				},
				s + 550,
			)
			.add(
				{
					targets: $(`${sel} .vd-film__sub`),
					opacity: [0, 1],
					translateY: [8, 0],
					filter: ['blur(4px)', 'blur(0px)'],
					duration: 600,
					easing: seda,
				},
				s + 900,
			);
	});

	// Hecho para ti: el sublimado.
	const s = at('personalizado');
	tl.add(
		{
			targets: $('.vd-film__ch--personalizado .vd-film__title > span'),
			translateY: ['110%', '0%'],
			duration: 850,
			easing: seda,
		},
		s + 200,
	)
		.add(
			{
				targets: $('.vd-film__ch--personalizado .vd-film__sub'),
				opacity: [0, 1],
				translateY: [8, 0],
				duration: 600,
				easing: seda,
			},
			s + 550,
		)
		.add(
			{
				targets: $('.vd-film__tee img'),
				scale: [1.04, 1],
				duration: 5400,
				easing: 'easeOutSine',
			},
			s,
		)
		.add(
			{
				targets: $('.vd-film__sheet'),
				opacity: [
					{ value: 0, duration: 0 },
					{ value: 1, duration: 500, easing: seda },
					{ value: 1, duration: 1900 },
					{ value: 0, duration: 650, easing: seda },
				],
				translateY: [
					{ value: '-26%', duration: 0 },
					{ value: '0%', duration: 650, easing: seda },
					{ value: '0%', duration: 1750 },
					{ value: '-38%', duration: 650, easing: seda },
				],
				rotate: [
					{ value: 0, duration: 2400 },
					{ value: -7, duration: 650, easing: seda },
				],
				scale: [
					{ value: 1, duration: 1300 },
					{ value: 0.975, duration: 180, easing: CURVES.lacre.anime },
					{ value: 0.975, duration: 700 },
					{ value: 1, duration: 220, easing: seda },
				],
			},
			s + 700,
		)
		.add(
			{
				targets: $('.vd-film__heat'),
				opacity: [
					{ value: 0, duration: 0 },
					{ value: 0.75, duration: 300, easing: seda },
					{ value: 0.75, duration: 500 },
					{ value: 0, duration: 700, easing: 'easeInSine' },
				],
			},
			s + 2000,
		)
		.add(
			{
				targets: $('.vd-film__print'),
				opacity: [0, 0.9],
				filter: ['blur(3px)', 'blur(0px)'],
				duration: 700,
				easing: seda,
			},
			s + 3150,
		);
	$$('.vd-film__steps li').forEach((li, i) => {
		const on = [s + 700, s + 2000, s + 3150][i];
		tl.add(
			{
				targets: li,
				opacity: [
					{ value: 0.35, duration: 0 },
					{ value: 1, duration: 300, easing: seda },
					...(i < 2
						? [
								{ value: 1, duration: 1000 },
								{ value: 0.35, duration: 300 },
							]
						: []),
				],
			},
			on,
		);
	});

	// Cierre: el isologo aparece y se queda.
	const c = at('cierre');
	tl.add(
		{
			targets: $('.vd-film__ch--cierre .vd-film__end'),
			opacity: [0, 1],
			scale: [0.97, 1],
			filter: ['blur(6px)', 'blur(0px)'],
			duration: 1300,
			easing: seda,
		},
		c + 200,
	);
	return tl;
}

export default function BrandFilm() {
	const root = useRef<HTMLElement>(null);
	const tlRef = useRef<anime.AnimeTimelineInstance | null>(null);
	const fills = useRef<(HTMLSpanElement | null)[]>([]);
	const [state, setState] = useState<'idle' | 'playing' | 'paused' | 'ended'>(
		'idle',
	);
	const [chapter, setChapter] = useState(0);
	const [reduced] = useState(prefersReducedMotion);
	const userPaused = useRef(false);
	const sync = useRef<(t: number) => void>(() => undefined);

	useEffect(() => {
		const el = root.current;
		if (!el) return;
		let current = -1;
		const onUpdate = (t: number) => {
			let idx = 0;
			STARTS.forEach((st, i) => {
				if (t >= st) idx = i;
			});
			fills.current.forEach((f, i) => {
				if (!f) return;
				const p = Math.min(
					1,
					Math.max(0, (t - STARTS[i]) / CHAPTERS[i].duration),
				);
				f.style.transform = `scaleX(${p})`;
			});
			if (idx !== current) {
				current = idx;
				setChapter(idx);
			}
		};
		sync.current = onUpdate;
		const tl = buildTimeline(el, onUpdate);
		tl.complete = () => setState('ended');
		tlRef.current = tl;
		tl.seek(0);

		// Desarrollo: /?preview=pelicula&film=<ms> fija la película en un instante.
		const fixed = import.meta.env.DEV
			? new URLSearchParams(location.search).get('film')
			: null;
		if (fixed !== null) {
			tl.seek(Number(fixed));
			onUpdate(Number(fixed));
			return () => anime.remove(el.querySelectorAll('*'));
		}

		if (reduced) {
			// Sin movimiento: cada capítulo se muestra como un fotograma fijo.
			tl.seek(STARTS[0] + CHAPTERS[0].duration - 500);
			onUpdate(STARTS[0] + CHAPTERS[0].duration - 500);
			return () => anime.remove(el.querySelectorAll('*'));
		}

		// Se reproduce sola la primera vez que se ve, y se pausa fuera de pantalla.
		let started = false;
		const io = new IntersectionObserver(
			([entry]) => {
				const t = tlRef.current;
				if (!t) return;
				if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
					if (!started) {
						started = true;
						t.play();
						setState('playing');
					} else if (!userPaused.current && t.paused && !t.completed) {
						t.play();
						setState('playing');
					}
				} else if (!entry.isIntersecting && !t.paused) {
					t.pause();
					setState('paused');
				}
			},
			{ threshold: [0, 0.5] },
		);
		io.observe(el);
		return () => {
			io.disconnect();
			tl.pause();
			anime.remove(el.querySelectorAll('*'));
		};
	}, [reduced]);

	const toggle = () => {
		const tl = tlRef.current;
		if (!tl) return;
		if (state === 'playing') {
			tl.pause();
			userPaused.current = true;
			setState('paused');
		} else {
			if (state === 'ended') tl.restart();
			else tl.play();
			userPaused.current = false;
			setState('playing');
		}
	};

	const goTo = (i: number) => {
		const tl = tlRef.current;
		if (!tl) return;
		if (reduced) {
			const t = STARTS[i] + CHAPTERS[i].duration - 500;
			tl.seek(t);
			sync.current(t);
			return;
		}
		tl.seek(STARTS[i]);
		tl.play();
		userPaused.current = false;
		setState('playing');
	};

	const playLabel =
		state === 'playing'
			? 'Pausar'
			: state === 'ended'
				? 'Volver a ver'
				: 'Reproducir';

	return (
		<section id='pelicula' className='vd-section' ref={root}>
			<header className='vd-head'>
				<h2>La marca en movimiento</h2>
				<p>
					Una película breve de lo que hace Victoria de Dios: hogar, día a día,
					estilo de vida y piezas personalizadas por sublimación.
				</p>
			</header>

			<div className='vd-film' aria-label='Película de marca'>
				<div className='vd-film__ch vd-film__ch--apertura'>
					<p className='vd-film__kicker'>Lifestyle &amp; Home</p>
					<p className='vd-film__lines'>
						<span className='vd-film__line'>
							<span>Para la casa, el día a día</span>
						</span>
						<span className='vd-film__line'>
							<span>y lo que llevas puesto.</span>
						</span>
					</p>
				</div>

				{PHOTO_CHAPTERS.map(p => (
					<div
						key={p.id}
						className={`vd-film__ch vd-film__ch--photo vd-film__ch--${p.id}`}
					>
						<div className='vd-film__curtain'>
							<div className='vd-film__curtain-in'>
								<img
									src={p.src}
									alt=''
									loading='lazy'
									width={1024}
									height={572}
								/>
							</div>
						</div>
						<div className='vd-film__caption'>
							<h3 className='vd-film__title'>
								<span>{p.title}</span>
							</h3>
							<p className='vd-film__sub'>{p.sub}</p>
						</div>
					</div>
				))}

				<div className='vd-film__ch vd-film__ch--personalizado'>
					<div className='vd-film__split'>
						<div className='vd-film__caption vd-film__caption--static'>
							<h3 className='vd-film__title'>
								<span>Hecho para ti</span>
							</h3>
							<p className='vd-film__sub'>
								Sublimamos tu diseño en tazas, ropa y regalos.
							</p>
							<ol className='vd-film__steps'>
								<li>Diseño</li>
								<li>Prensa</li>
								<li>Listo</li>
							</ol>
						</div>
						<div className='vd-film__tee'>
							<img
								src='/mockups/800/ropa-camiseta-flatlay.jpg'
								alt=''
								loading='lazy'
								width={800}
								height={600}
							/>
							<span className='vd-film__print'>
								<Mark kind='isologo' mono={PAINT.navy} width='100%' />
							</span>
							<span className='vd-film__sheet'>
								<span className='vd-film__sheet-logo'>
									<Mark kind='isologo' mono={PAINT.navy} width='100%' />
								</span>
							</span>
							<span className='vd-film__heat' />
						</div>
					</div>
				</div>

				<div className='vd-film__ch vd-film__ch--cierre'>
					<div className='vd-film__end'>
						<Mark
							kind='isologo'
							mono={PAINT.foil}
							finish='foil'
							width='100%'
							label='Victoria de Dios, Lifestyle & Home'
						/>
					</div>
				</div>
			</div>

			<div className='vd-film__controls'>
				<button
					type='button'
					className='vd-film__play'
					onClick={toggle}
					hidden={reduced}
				>
					{state === 'playing' ? (
						<svg width='12' height='12' viewBox='0 0 12 12' aria-hidden='true'>
							<path d='M2 1h3v10H2zM7 1h3v10H7z' fill='currentColor' />
						</svg>
					) : (
						<svg width='12' height='12' viewBox='0 0 12 12' aria-hidden='true'>
							<path d='M2 1l9 5-9 5z' fill='currentColor' />
						</svg>
					)}
					{playLabel}
				</button>
				<ol className='vd-film__chapters'>
					{CHAPTERS.map((c, i) => (
						<li key={c.id}>
							<button
								type='button'
								aria-current={chapter === i ? 'step' : undefined}
								onClick={() => goTo(i)}
							>
								<span className='vd-film__bar'>
									<span
										className='vd-film__fill'
										ref={n => {
											fills.current[i] = n;
										}}
									/>
								</span>
								{c.label}
							</button>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
