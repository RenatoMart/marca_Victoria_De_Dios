import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, type Category, type MockupItem } from './types';
import { photoPackaging } from './photo/packaging';
import { photoStationery } from './photo/stationery';
import { photoApparel } from './photo/apparel';
import { photoAccessories } from './photo/accessories';
import { photoHome } from './photo/home';

export const ALL: MockupItem[] = [
	...photoPackaging,
	...photoStationery,
	...photoApparel,
	...photoAccessories,
	...photoHome,
];

type Filter = Category | 'todos';

export default function Gallery() {
	const [filter, setFilter] = useState<Filter>('todos');
	const [open, setOpen] = useState<number | null>(null);

	const items = useMemo(
		() => (filter === 'todos' ? ALL : ALL.filter(i => i.category === filter)),
		[filter],
	);
	const current = open === null ? null : items[open];

	useEffect(() => {
		if (open === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(null);
			if (e.key === 'ArrowRight')
				setOpen(i => (i === null ? i : (i + 1) % items.length));
			if (e.key === 'ArrowLeft')
				setOpen(i => (i === null ? i : (i - 1 + items.length) % items.length));
		};
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKey);
		};
	}, [open, items.length]);

	return (
		<section id='productos' className='vd-section'>
			<header className='vd-head'>
				<h2>Productos</h2>
				<p>
					El logo real aplicado a cada producto de la marca. Toca una pieza para
					verla en grande.
				</p>
			</header>

			<div className='vd-tabs' role='tablist' aria-label='Categorías'>
				{(
					[{ id: 'todos', label: 'Todo' }, ...CATEGORIES] as {
						id: Filter;
						label: string;
					}[]
				).map(c => (
					<button
						key={c.id}
						type='button'
						role='tab'
						aria-selected={filter === c.id}
						onClick={() => setFilter(c.id)}
					>
						{c.label}
					</button>
				))}
			</div>

			<div className='vd-products'>
				{items.map((item, i) => (
					<button
						key={item.id}
						type='button'
						className='vd-product'
						onClick={() => setOpen(i)}
					>
						<span className='vd-product__stage'>
							<item.Scene />
						</span>
						<span className='vd-product__title'>{item.title}</span>
						<span className='vd-product__tech'>{item.technique}</span>
					</button>
				))}
			</div>

			{current && open !== null && (
				<div
					className='vd-lightbox'
					role='dialog'
					aria-modal='true'
					aria-label={current.title}
					onClick={() => setOpen(null)}
				>
					<div
						className='vd-lightbox__panel'
						onClick={e => e.stopPropagation()}
					>
						<div className='vd-lightbox__stage'>
							<current.Scene />
						</div>
						<aside className='vd-lightbox__info'>
							<h3>{current.title}</h3>
							<p className='vd-lightbox__meta'>
								{CATEGORIES.find(c => c.id === current.category)?.label} ·{' '}
								{open + 1} de {items.length}
							</p>
							<dl>
								<dt>Técnica</dt>
								<dd>{current.technique}</dd>
								<dt>Material</dt>
								<dd>{current.material}</dd>
							</dl>
							{current.note && (
								<p className='vd-lightbox__note'>{current.note}</p>
							)}
							{current.credit && (
								<p className='vd-lightbox__credit'>
									Foto base:{' '}
									<a href={current.credit.url} target='_blank' rel='noreferrer'>
										{current.credit.photographer}
									</a>{' '}
									· Pexels
								</p>
							)}
							<div className='vd-lightbox__nav'>
								<button
									type='button'
									onClick={() =>
										setOpen((open - 1 + items.length) % items.length)
									}
									aria-label='Anterior'
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
									onClick={() => setOpen((open + 1) % items.length)}
									aria-label='Siguiente'
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
								<button
									type='button'
									className='vd-lightbox__close'
									onClick={() => setOpen(null)}
								>
									Cerrar
								</button>
							</div>
						</aside>
					</div>
				</div>
			)}
		</section>
	);
}
