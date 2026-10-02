import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Arrow, MotionReveal, MotionText } from '../components/motion';
import { BRAND, PRODUCTS, UNIVERSES, type Product, type Universe } from '../content/brand';
import { blur, distance, duration, easing } from '../motion/tokens';

type Filter = Universe | 'todo';

/**
 * Tarjeta de producto. Entrada discreta (opacidad + 20 px + velo de blur). Hover: elevación
 * (sombra), imagen que se desplaza dentro de su marco y flecha del CTA; la tarjeta no salta.
 */
function Card({ p, i }: { p: Product; i: number }) {
	return (
		<motion.li
			layout
			className='card'
			initial={{ opacity: 0, y: distance.md, filter: `blur(${blur.sm}px)` }}
			animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			exit={{ opacity: 0, transition: { duration: duration.fast, ease: easing.exit } }}
			transition={{
				duration: duration.slow,
				ease: easing.entrance,
				delay: (i % 3) * 0.06,
				layout: { duration: duration.normal, ease: easing.standard },
			}}
		>
			<a className='card__link' href={BRAND.contactHref} aria-label={`${p.name}: consultar`}>
				<span className='card__media'>
					<img src={`/presentacion1/photos/${p.img}.jpg`} alt='' loading='lazy' decoding='async' />
				</span>
				<span className='card__body'>
					<span className='card__name'>{p.name}</span>
					<span className='card__note'>{p.note}</span>
					<span className='card__cta'>
						Consultar <Arrow size={14} />
					</span>
				</span>
			</a>
		</motion.li>
	);
}

/** ESCENA 04 · ELEGIR. Catálogo con filtros: cambios de estado rápidos, sin coreografía larga. */
export default function Coleccion() {
	const [filter, setFilter] = useState<Filter>('todo');

	useEffect(() => {
		const on = (e: Event) => setFilter((e as CustomEvent<Filter>).detail ?? 'todo');
		window.addEventListener('vd:filter', on);
		return () => window.removeEventListener('vd:filter', on);
	}, []);

	const list = PRODUCTS.filter(p => filter === 'todo' || p.universe === filter);

	return (
		<section id='coleccion' className='coleccion on-light' aria-labelledby='coleccion-title'>
			<div className='wrap'>
				<header className='section-head section-head--split'>
					<div>
						<p className='eyebrow'>03 · Elegir</p>
						<MotionText id='coleccion-title' className='display section-title' lines={['Elige lo que', <em key='v'>va contigo.</em>]} />
					</div>
					<MotionReveal as='p' className='lead' delay={0.1}>
						Una muestra de lo que vive en el universo Victoria de Dios. Cuéntanos qué buscas y lo preparamos contigo.
					</MotionReveal>
				</header>

				<div className='filters' role='group' aria-label='Filtrar por universo'>
					{UNIVERSES.map(u => (
						<button key={u.id} className='chip' aria-pressed={filter === u.id} onClick={() => setFilter(u.id)}>
							{u.label}
						</button>
					))}
				</div>

				<ul className='grid' aria-live='polite'>
					<AnimatePresence mode='popLayout' initial={false}>
						{list.map((p, i) => (
							<Card key={p.id} p={p} i={i} />
						))}
					</AnimatePresence>
				</ul>
			</div>
		</section>
	);
}
