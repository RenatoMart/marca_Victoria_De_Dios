import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { Arrow, MotionImage, MotionReveal, MotionText, VIEWPORT } from '../components/motion';
import { distance, duration, easing, stagger } from '../motion/tokens';
import { useReduced } from '../motion/hooks';
import type { Universe } from '../content/brand';

const ph = (n: string) => `/presentacion1/photos/${n}.jpg`;

function Chapter({
	num,
	title,
	text,
	filter,
	cta,
	flip,
	children,
}: {
	num: string;
	title: string;
	text: string;
	filter: Universe;
	cta: string;
	flip?: boolean;
	children: ReactNode;
}) {
	return (
		<article className={`chapter ${flip ? 'chapter--flip' : ''}`}>
			<div className='chapter__copy'>
				<MotionReveal className='chapter__num' aria-hidden>
					{num}
				</MotionReveal>
				<MotionText as='h3' className='display chapter__title' lines={[title]} />
				<MotionReveal as='p' className='lead' delay={0.1}>
					{text}
				</MotionReveal>
				<MotionReveal delay={0.18}>
					<a
						className='u-link'
						href='#coleccion'
						onClick={() => window.dispatchEvent(new CustomEvent('vd:filter', { detail: filter }))}
					>
						{cta} <Arrow />
					</a>
				</MotionReveal>
			</div>
			<div className='chapter__visual'>{children}</div>
		</article>
	);
}

/**
 * HOGAR — orden + utilidad + descubrimiento.
 * Tres piezas llegan desde distancias mínimas y se «acomodan» en una retícula; filetes que se dibujan.
 */
const HOGAR_TILES = [
	{ img: 'hog-vela', alt: 'Vela de vidrio con el isologo', from: { x: -distance.md, y: distance.sm }, cls: 'tile--a' },
	{ img: 'hog-taza-blanca', alt: 'Taza esmaltada con filo dorado', from: { x: distance.sm, y: -distance.md }, cls: 'tile--b' },
	{ img: 'hog-difusor', alt: 'Difusor de ambiente en frasco ámbar', from: { x: distance.md, y: distance.md }, cls: 'tile--c' },
] as const;

function HogarComposition() {
	return (
		<motion.div
			className='hogar'
			initial='hidden'
			whileInView='shown'
			viewport={VIEWPORT}
			transition={{ staggerChildren: stagger.normal }}
		>
			{HOGAR_TILES.map(t => (
				<motion.figure
					key={t.img}
					className={`tile ${t.cls}`}
					variants={{
						hidden: { opacity: 0, ...t.from, clipPath: 'inset(8% 8% 8% 8%)' },
						shown: { opacity: 1, x: 0, y: 0, clipPath: 'inset(0% 0% 0% 0%)' },
					}}
					transition={{ duration: duration.slow, ease: easing.entrance }}
				>
					<img src={ph(t.img)} alt={t.alt} loading='lazy' decoding='async' />
				</motion.figure>
			))}
			<motion.span
				className='hogar__rule hogar__rule--h'
				variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
				transition={{ duration: duration.cinematic, ease: easing.emphasized }}
				aria-hidden
			/>
			<motion.span
				className='hogar__rule hogar__rule--v'
				variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
				transition={{ duration: duration.cinematic, ease: easing.emphasized, delay: 0.1 }}
				aria-hidden
			/>
		</motion.div>
	);
}

/**
 * ESTILO DE VIDA — fluidez + moda + movimiento humano.
 * Recorte editorial en diagonal, más lento (emphasized) y dos planos con parallax distinto.
 */
function EstiloComposition() {
	return (
		<div className='estilo'>
			<MotionImage
				className='estilo__main'
				src={ph('ropa-chaqueta-cuero')}
				alt='Chaqueta de cuero con isologo bordado'
				reveal='diagonal'
				parallax={5}
				slow
			/>
			<MotionImage
				className='estilo__side'
				src={ph('ropa-hoodie-blanco')}
				alt='Hoodie blanco con isologo bordado'
				reveal='diagonal'
				parallax={9}
				delay={0.18}
				slow
			/>
		</div>
	);
}

/**
 * SUBLIMACIÓN — creatividad + personalización.
 * La misma foto en dos estados: sin personalizar (velo desenfocado y neutro) y personalizada.
 * El scroll empuja una «pasada de prensa» que revela el diseño de abajo hacia arriba.
 */
function SublimacionComposition() {
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useReduced();
	const [done, setDone] = useState(false);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'center 0.5'] });
	const p = useTransform(scrollYProgress, v => (reduced ? 1 : v));
	const veil = useTransform(p, v => `inset(0% 0% ${v * 100}% 0%)`);
	const edge = useTransform(p, v => `${(1 - v) * 100}%`);
	const edgeOpacity = useTransform(p, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
	useMotionValueEvent(p, 'change', v => setDone(v > 0.6));

	return (
		<div className='sublima' ref={ref}>
			<img className='sublima__img' src={ph('tazas-y-tomatodos')} alt='Taza, tomatodo y vaso personalizados con el isologo' loading='lazy' decoding='async' />
			<motion.div className='sublima__veil' style={{ clipPath: veil }} aria-hidden>
				<img src={ph('tazas-y-tomatodos')} alt='' loading='lazy' decoding='async' />
			</motion.div>
			<motion.span className='sublima__edge' style={{ top: edge, opacity: edgeOpacity }} aria-hidden />
			<span className='sublima__chip' aria-live='polite'>
				{done ? 'Personalizado' : 'Sin personalizar'}
			</span>
		</div>
	);
}

export default function Explora() {
	return (
		<section id='explora' className='explora on-light' aria-labelledby='explora-title'>
			<div className='wrap'>
				<header className='section-head'>
					<p className='eyebrow'>02 · Explorar</p>
					<MotionText id='explora-title' className='display section-title' lines={['Tres universos,', <em key='u'>una misma firma.</em>]} />
				</header>

				<Chapter
					num='01'
					title='Hogar'
					text='Orden, utilidad y pequeños hallazgos para cada rincón: aromas, textiles y piezas que se quedan en la rutina de todos los días.'
					filter='hogar'
					cta='Ver Hogar'
				>
					<HogarComposition />
				</Chapter>

				<Chapter
					num='02'
					title='Estilo de vida'
					text='Ropa y accesorios con carácter: prendas que acompañan, bolsos con presencia y colecciones de temporada para dama, caballero y niños.'
					filter='estilo'
					cta='Ver Estilo de vida'
					flip
				>
					<EstiloComposition />
				</Chapter>

				<Chapter
					num='03'
					title='Sublimación'
					text='Tazas, tomatodos y regalos con tu diseño. Lo neutro se vuelve personal: ese es nuestro mejor truco.'
					filter='regalo'
					cta='Ver personalizados'
				>
					<SublimacionComposition />
				</Chapter>
			</div>
		</section>
	);
}
