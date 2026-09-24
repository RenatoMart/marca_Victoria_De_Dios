import { useEffect, useRef, useState } from 'react';
import { SCENES } from './scenes';

export default function Showcase() {
	const [open, setOpen] = useState<number | null>(null);
	const strip = useRef<HTMLDivElement>(null);
	const [featured, ...rest] = SCENES;

	useEffect(() => {
		if (open === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(null);
		};
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKey);
		};
	}, [open]);

	const scroll = (dir: 1 | -1) => {
		const el = strip.current;
		if (!el) return;
		const reduce = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		el.scrollBy({
			left: dir * el.clientWidth * 0.8,
			behavior: reduce ? 'auto' : 'smooth',
		});
	};

	if (!featured) return null;
	const current = open === null ? null : SCENES[open];

	return (
		<section id='escenas' className='vd-section'>
			<header className='vd-head'>
				<h2>Escenas</h2>
				<p>
					La marca completa en un mismo espacio: papelería, textil, empaque y
					hogar.
				</p>
			</header>

			<figure className='vd-feature'>
				<button
					type='button'
					onClick={() => setOpen(0)}
					aria-label={`Ampliar: ${featured.title}`}
				>
					<img
						src={featured.src}
						alt={featured.title}
						width={1600}
						height={900}
					/>
				</button>
				<figcaption>
					<strong>{featured.title}</strong> {featured.description}
				</figcaption>
			</figure>

			{rest.length > 0 && (
				<div className='vd-strip'>
					<div className='vd-strip__controls'>
						<span>{rest.length} escenas más</span>
						<button
							type='button'
							onClick={() => scroll(-1)}
							aria-label='Escenas anteriores'
						>
							<svg
								width='18'
								height='18'
								viewBox='0 0 24 24'
								aria-hidden='true'
							>
								<path
									d='M19 12H5M11 6l-6 6 6 6'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.4'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
						<button
							type='button'
							onClick={() => scroll(1)}
							aria-label='Escenas siguientes'
						>
							<svg
								width='18'
								height='18'
								viewBox='0 0 24 24'
								aria-hidden='true'
							>
								<path
									d='M5 12h14M13 6l6 6-6 6'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.4'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
					<div
						className='vd-strip__track'
						ref={strip}
						tabIndex={0}
						aria-label='Escenas de marca'
					>
						{rest.map((s, i) => (
							<figure key={s.src} className='vd-strip__item'>
								<button
									type='button'
									onClick={() => setOpen(i + 1)}
									aria-label={`Ampliar: ${s.title}`}
								>
									<img
										src={s.src}
										alt={s.title}
										loading='lazy'
										width={1024}
										height={576}
									/>
								</button>
								<figcaption>{s.title}</figcaption>
							</figure>
						))}
					</div>
				</div>
			)}

			{current && (
				<div
					className='vd-zoom'
					role='dialog'
					aria-modal='true'
					aria-label={current.title}
					onClick={() => setOpen(null)}
				>
					<img src={current.src} alt={current.title} />
					<p>
						<strong>{current.title}.</strong> {current.description}
					</p>
				</div>
			)}
		</section>
	);
}
