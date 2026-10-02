import {
	Suspense,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type PointerEvent,
} from 'react';
import anime from 'animejs';
import Mark, { PAINT } from '../brand/Mark';
import { motion, motionCssVars } from '../brand/motion';
import {
	useFinePointer,
	useInViewOnce,
	useNearViewport,
	useReducedMotion,
} from './hooks';
import { CustomizeCanvas3D, Guard3D, HeroCanvas3D } from './Lazy3D';
import Reveal, { Lines } from './Reveal';
import { rig, setCustom, type CustomState } from './rig';
import { hasWebGL } from './webgl';
import './universo.css';

/* ---------------------------------------------------------------------------------------------
 * «El universo Victoria de Dios»: DESCUBRIR → EXPLORAR → ELEGIR → PERSONALIZAR → COMPRAR.
 * Capa 2D (DOM + anime.js) y capa 3D (un único canvas WebGL con dos vistas) comparten tokens.
 * ------------------------------------------------------------------------------------------- */

function Arrow() {
	return (
		<svg
			className='uv-arrow'
			width='16'
			height='16'
			viewBox='0 0 24 24'
			aria-hidden='true'
		>
			<path
				d='M5 12h14M13 6l6 6-6 6'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

/* ---------- 1. Descubrir: revelado de marca + bodegón 3D ---------- */
function Hero({ three, onFail }: { three: boolean; onFail: () => void }) {
	const root = useRef<HTMLDivElement>(null);
	const copy = useRef<HTMLDivElement>(null);
	const stage = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();
	const fine = useFinePointer();
	const dpr: [number, number] = fine ? [1, 1.75] : [1, 1.25];
	// Cada escenario monta su canvas solo cuando está cerca de la pantalla.
	const near = useNearViewport(stage, '200px');
	const show3d = three && near;
	const seen = useInViewOnce(root, 0.4);

	// Coreografía: visual principal → titular → texto → CTA, con diferencias mínimas.
	useEffect(() => {
		const el = root.current;
		if (!el || !seen) return;
		rig.heroEntered = true;
		rig.invalidate();
		if (reduced) return;
		const E = motion.easing;
		const tl = anime.timeline({ easing: E.entrance.anime });
		tl.add({
			targets: el.querySelector('.uv-hero__seal'),
			clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
			translateY: [6, 0],
			duration: 700,
			easing: E.emphasized.anime,
		})
			.add(
				{
					targets: el.querySelectorAll('.uv-hero__title [data-line] > span'),
					translateY: ['105%', '0%'],
					duration: 720,
					delay: anime.stagger(motion.stagger.normal),
				},
				280,
			)
			.add(
				{
					targets: el.querySelector('.uv-hero__lede'),
					opacity: [0, 1],
					translateY: [motion.distance.sm, 0],
					duration: motion.duration.slow,
				},
				560,
			)
			.add(
				{
					targets: el.querySelector('.uv-hero__cta'),
					opacity: [0, 1],
					translateY: [motion.distance.sm, 0],
					duration: motion.duration.slow,
				},
				660,
			);
		el.dataset.reveal = 'done';
		return () => tl.pause();
	}, [seen, reduced]);

	// Salida del hero ligada al scroll nativo (sin secuestrarlo): el texto retrocede y la cámara hace dolly-out.
	useEffect(() => {
		const el = root.current;
		if (!el) return;
		let frame = 0;
		const update = () => {
			frame = 0;
			const r = el.getBoundingClientRect();
			const p = Math.min(1, Math.max(0, -r.top / (r.height * 0.85)));
			rig.heroProgress = reduced ? 0 : p;
			rig.invalidate();
			if (copy.current && !reduced) {
				copy.current.style.transform = `translate3d(0, ${-p * motion.distance.lg}px, 0) scale(${1 - p * 0.03})`;
				copy.current.style.opacity = String(1 - p * 0.7);
			}
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [reduced]);

	return (
		<div
			className='uv-hero'
			ref={root}
			data-reveal={reduced ? 'done' : 'pending'}
		>
			<div className='uv-hero__copy' ref={copy}>
				<span className='uv-hero__seal'>
					<Mark
						kind='symbol'
						primary={PAINT.navy}
						accent={PAINT.gold}
						width='100%'
						label='Victoria de Dios'
					/>
				</span>
				<Lines
					as='h2'
					className='uv-hero__title'
					lines={['Un universo para tu casa,', 'tu estilo y tus regalos.']}
				/>
				<p className='uv-hero__lede'>
					Hogar, moda y productos personalizados, elegidos con cuidado y
					enviados a todo el Perú.
				</p>
				<a className='uv-btn uv-hero__cta' href='#uv-explora'>
					Explorar el universo
					<Arrow />
				</a>
			</div>
			<div className={`uv-hero__stage ${show3d ? 'is-3d' : ''}`} ref={stage}>
				<img
					className='uv-poster'
					src='/escenas/regalo-corporativo.jpg'
					alt=''
					width={1024}
					height={572}
				/>
				{show3d && (
					<Guard3D fallback={null} onError={onFail}>
						<Suspense fallback={null}>
							<HeroCanvas3D dpr={dpr} />
						</Suspense>
					</Guard3D>
				)}
			</div>
		</div>
	);
}

/* ---------- 2. Explorar: tres mundos, tres identidades de movimiento ---------- */
function Explora() {
	const [printed, setPrinted] = useState(false);
	return (
		<div id='uv-explora' className='uv-block'>
			<Reveal as='header' className='uv-head'>
				<h2>Explora</h2>
				<p>Tres mundos, una misma casa. Cada uno se mueve a su manera.</p>
			</Reveal>

			<div className='uv-cats'>
				<Reveal as='article' variant='settle' className='uv-cat uv-cat--hogar'>
					<div className='uv-cat__grid'>
						{['hog-vela', 'hog-difusor', 'hog-cojin', 'hog-toallas'].map(n => (
							<img
								key={n}
								data-settle
								src={`/mockups/800/${n}.jpg`}
								alt=''
								loading='lazy'
								width={800}
								height={600}
							/>
						))}
					</div>
					<h3>Hogar</h3>
					<p>
						Orden, aroma y textura para cada rincón: decoración, artículos
						útiles y detalles para los más pequeños.
					</p>
					<a className='uv-link' href='/#productos'>
						Ver hogar
					</a>
				</Reveal>

				<Reveal
					as='article'
					variant='editorial'
					className='uv-cat uv-cat--estilo'
				>
					<div className='uv-cat__frame' data-clip>
						<img
							data-depth
							src='/escenas/coleccion-textil.jpg'
							alt=''
							loading='lazy'
							width={1024}
							height={955}
						/>
					</div>
					<h3>Estilo de vida</h3>
					<p>Ropa para dama, caballero y niños, y accesorios de temporada.</p>
					<a className='uv-link' href='/#productos'>
						Ver estilo de vida
					</a>
				</Reveal>

				<Reveal as='article' className='uv-cat uv-cat--subli'>
					<div className={`uv-tee ${printed ? 'is-printed' : ''}`}>
						<img
							src='/mockups/800/ropa-camiseta-flatlay.jpg'
							alt=''
							loading='lazy'
							width={800}
							height={600}
						/>
						<span className='uv-tee__print'>
							<Mark
								kind='isologo'
								mono={PAINT.navy}
								width='100%'
								label='Diseño Victoria de Dios impreso'
							/>
						</span>
					</div>
					<h3>Personalizados</h3>
					<p>Tazas, tomatodos, vasos y regalos con tu diseño.</p>
					<button
						type='button'
						className='uv-link'
						aria-pressed={printed}
						onClick={() => setPrinted(v => !v)}
					>
						{printed ? 'Ver sin diseño' : 'Ver con diseño'}
					</button>
				</Reveal>
			</div>
		</div>
	);
}

/* ---------- 3. Elegir: productos destacados (2D discreto) ---------- */
const FEATURED = [
	{ img: 'hog-taza-blanca', title: 'Taza de cerámica', cat: 'Personalizados' },
	{ img: 'ropa-gorra-blanca', title: 'Gorra bordada', cat: 'Estilo de vida' },
	{ img: 'hog-vela', title: 'Vela aromática', cat: 'Hogar' },
	{ img: 'hog-tomatodo', title: 'Tomatodo de acero', cat: 'Personalizados' },
];

function Destacados() {
	return (
		<div className='uv-block'>
			<Reveal as='header' className='uv-head'>
				<h2>Destacados</h2>
				<p>
					Piezas que resumen la casa: útiles, bonitas y listas para regalar.
				</p>
			</Reveal>
			<div className='uv-products'>
				{FEATURED.map((p, i) => (
					<Reveal
						key={p.img}
						as='article'
						className='uv-product'
						delay={i * motion.stagger.tight}
					>
						<div className='uv-product__media'>
							<img
								src={`/mockups/800/${p.img}.jpg`}
								alt={p.title}
								loading='lazy'
								width={800}
								height={600}
							/>
						</div>
						<p className='uv-product__cat'>{p.cat}</p>
						<h3>{p.title}</h3>
						<a className='uv-product__cta' href='/#productos'>
							Ver en catálogo
							<Arrow />
						</a>
					</Reveal>
				))}
			</div>
		</div>
	);
}

/* ---------- 4. Personalizar: «Hazlo tuyo» (3D) ---------- */
const STATES: { id: CustomState; label: string; text: string }[] = [
	{
		id: 'neutral',
		label: 'Taza blanca',
		text: 'Partimos de una taza de cerámica blanca, lista para sublimar.',
	},
	{
		id: 'design',
		label: 'Tu diseño',
		text: 'Tu diseño se imprime en espejo sobre papel transfer.',
	},
	{
		id: 'personal',
		label: 'Personalizada',
		text: 'Con calor y presión, la tinta pasa a la cerámica y queda para siempre.',
	},
];

function HazloTuyo({ three, onFail }: { three: boolean; onFail: () => void }) {
	const [state, setState] = useState<CustomState>(() => {
		// Desarrollo: /?preview=universo&custom=personal fija un estado para revisarlo.
		const fixed = import.meta.env.DEV
			? new URLSearchParams(location.search).get('custom')
			: null;
		const s = (fixed ?? 'neutral') as CustomState;
		rig.custom = s;
		return s;
	});
	const fine = useFinePointer();
	const stage = useRef<HTMLDivElement>(null);
	const near = useNearViewport(stage, '200px');
	const show3d = three && near;
	const dpr: [number, number] = fine ? [1, 1.75] : [1, 1.25];
	const choose = (s: CustomState) => {
		setState(s);
		setCustom(s);
	};
	const current = STATES.find(s => s.id === state)!;

	return (
		<div className='uv-block uv-custom' id='uv-hazlo-tuyo'>
			<div
				ref={stage}
				className='uv-custom__stage'
				onPointerEnter={() => {
					if (!fine) return;
					rig.productHover = true;
					rig.invalidate();
				}}
				onPointerLeave={() => {
					rig.productHover = false;
					rig.invalidate();
				}}
			>
				{show3d ? (
					<Guard3D fallback={null} onError={onFail}>
						<Suspense fallback={null}>
							<CustomizeCanvas3D dpr={dpr} />
						</Suspense>
					</Guard3D>
				) : (
					<div className={`uv-tee uv-tee--fallback is-${state}`}>
						<img
							src='/mockups/800/ropa-camiseta-flatlay.jpg'
							alt=''
							width={800}
							height={600}
						/>
						<span className='uv-tee__print'>
							<Mark kind='isologo' mono={PAINT.navy} width='100%' />
						</span>
						<span className='uv-tee__sheet'>
							<Mark kind='isologo' mono={PAINT.navy} width='100%' />
						</span>
					</div>
				)}
			</div>

			<Reveal className='uv-custom__panel'>
				<h2>Hazlo tuyo</h2>
				<div
					className='uv-steps'
					role='radiogroup'
					aria-label='Estado de la taza'
				>
					{STATES.map((s, i) => (
						<button
							key={s.id}
							type='button'
							role='radio'
							aria-checked={state === s.id}
							onClick={() => choose(s.id)}
						>
							<span className='uv-steps__n'>{i + 1}</span>
							{s.label}
						</button>
					))}
				</div>
				<p className='uv-custom__text' aria-live='polite'>
					{current.text}
				</p>
				<a className='uv-btn' href='/#productos'>
					Ver productos personalizables
					<Arrow />
				</a>
			</Reveal>
		</div>
	);
}

/* ---------- 5. Comprar ---------- */
function Cierre() {
	return (
		<Reveal className='uv-block uv-close'>
			<h2>Elige lo tuyo.</h2>
			<p>
				Descubre el catálogo completo y encuentra algo para ti o para regalar.
			</p>
			<a className='uv-btn uv-btn--solid' href='/#productos'>
				Ver el catálogo
				<Arrow />
			</a>
		</Reveal>
	);
}

/* ---------- Sección ---------- */
/** `part` solo se usa en la vista de desarrollo para revisar un bloque aislado. */
export default function Universo({ part }: { part?: 'custom' } = {}) {
	const root = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();
	const fine = useFinePointer();
	const [failed, setFailed] = useState(false);
	const [webgl] = useState(hasWebGL);
	const three = webgl && !failed;
	const fail = () => setFailed(true);

	useEffect(() => {
		rig.reduced = reduced;
		rig.invalidate();
	}, [reduced]);

	// Puntero → parallax subconsciente (solo ratón; en táctil no hay).
	const onPointerMove = (e: PointerEvent<HTMLElement>) => {
		if (!fine || reduced) return;
		rig.px = (e.clientX / window.innerWidth) * 2 - 1;
		rig.py = (e.clientY / window.innerHeight) * 2 - 1;
		rig.invalidate();
	};

	return (
		<section
			id='universo'
			className='uv'
			ref={root}
			style={motionCssVars as CSSProperties}
			onPointerMove={onPointerMove}
			onPointerLeave={() => {
				rig.px = 0;
				rig.py = 0;
				rig.invalidate();
			}}
		>
			<h2 className='uv-sr'>El universo Victoria de Dios</h2>
			{part === 'custom' ? (
				<HazloTuyo three={three} onFail={fail} />
			) : (
				<>
					<Hero three={three} onFail={fail} />
					<Explora />
					<Destacados />
					<HazloTuyo three={three} onFail={fail} />
					<Cierre />
				</>
			)}
		</section>
	);
}
