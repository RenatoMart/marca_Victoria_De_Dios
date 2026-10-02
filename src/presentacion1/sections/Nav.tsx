import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND } from '../content/brand';
import { duration, easing, stagger } from '../motion/tokens';

const LINKS = [
	{ href: '#explora', label: 'Explora' },
	{ href: '#coleccion', label: 'Colección' },
	{ href: '#hazlo-tuyo', label: 'Hazlo tuyo' },
];

/**
 * Navegación: interacción frecuente → rápida. El menú móvil abre en 360 ms con un stagger
 * mínimo y cierra en 180 ms (la salida es más corta que la entrada).
 */
export default function Nav({ light }: { light: boolean }) {
	const [open, setOpen] = useState(false);
	const toggle = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		document.body.classList.toggle('is-locked', open);
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false);
				toggle.current?.focus();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.classList.remove('is-locked');
		};
	}, [open]);

	return (
		<header className='nav' data-light={light && !open}>
			<div className='nav__bar wrap'>
				<a className='nav__brand' href='#top' aria-label={`${BRAND.name} — inicio`} onClick={() => setOpen(false)}>
					<span className='nav__mark' aria-hidden />
					<span className='nav__name'>
						Victoria de Dios
						<small>Lifestyle &amp; Home</small>
					</span>
				</a>

				<nav className='nav__links' aria-label='Principal'>
					{LINKS.map(l => (
						<a key={l.href} className='u-link' href={l.href}>
							{l.label}
						</a>
					))}
				</nav>

				<button
					ref={toggle}
					className='nav__toggle'
					aria-expanded={open}
					aria-controls='menu-movil'
					aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
					onClick={() => setOpen(o => !o)}
				>
					<span />
					<span />
				</button>
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						id='menu-movil'
						className='menu'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0, transition: { duration: duration.normal, ease: easing.entrance } }}
						exit={{ opacity: 0, transition: { duration: duration.fast, ease: easing.exit } }}
					>
						<motion.ul
							initial='hidden'
							animate='shown'
							variants={{ shown: { transition: { staggerChildren: stagger.tight, delayChildren: 0.06 } } }}
						>
							{LINKS.map(l => (
								<motion.li
									key={l.href}
									variants={{
										hidden: { opacity: 0, y: 14 },
										shown: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: easing.entrance } },
									}}
								>
									<a href={l.href} onClick={() => setOpen(false)}>
										{l.label}
									</a>
								</motion.li>
							))}
						</motion.ul>
						<a className='btn btn--gold' href={BRAND.contactHref} onClick={() => setOpen(false)}>
							{BRAND.contactLabel}
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
