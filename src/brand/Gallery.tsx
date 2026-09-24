import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, type Category, type MockupItem } from './types';
import { packaging } from './mockups/packaging';
import { stationery } from './mockups/stationery';
import { apparel } from './mockups/apparel';
import { accessories } from './mockups/accessories';
import { home } from './mockups/home';

const ALL: MockupItem[] = [...packaging, ...stationery, ...apparel, ...accessories, ...home];

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
			if (e.key === 'ArrowRight') setOpen(i => (i === null ? i : (i + 1) % items.length));
			if (e.key === 'ArrowLeft') setOpen(i => (i === null ? i : (i - 1 + items.length) % items.length));
		};
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKey);
		};
	}, [open, items.length]);

	const count = (c: Filter) => (c === 'todos' ? ALL.length : ALL.filter(i => i.category === c).length);

	return (
		<section id='aplicaciones' className='vd-section vd-section--wide'>
			<header className='vd-section__head'>
				<p className='vd-eyebrow'>05 · Aplicaciones</p>
				<h2>La marca en producto</h2>
				<p className='vd-lede'>
					Bocetos de aplicación con el logo real: empaques, ropa, carteras, tazas, tomatodos y
					hogar. Toca cualquier pieza para verla en grande.
				</p>
			</header>

			<div className='vd-chips' role='tablist' aria-label='Categorías'>
				{([{ id: 'todos', label: 'Todo' }, ...CATEGORIES] as { id: Filter; label: string }[]).map(c => (
					<button
						key={c.id}
						type='button'
						role='tab'
						aria-selected={filter === c.id}
						className={filter === c.id ? 'is-on' : ''}
						onClick={() => setFilter(c.id)}
					>
						{c.label}
						<span>{count(c.id)}</span>
					</button>
				))}
			</div>

			<div className='vd-grid'>
				{items.map((item, i) => (
					<button key={item.id} type='button' className='vd-card' onClick={() => setOpen(i)}>
						<div className='vd-card__stage'>
							<item.Scene />
						</div>
						<div className='vd-card__meta'>
							<span className='vd-card__cat'>
								{CATEGORIES.find(c => c.id === item.category)?.label}
							</span>
							<strong>{item.title}</strong>
							<span className='vd-card__tech'>{item.technique}</span>
						</div>
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
					<div className='vd-lightbox__panel' onClick={e => e.stopPropagation()}>
						<div className='vd-lightbox__stage'>
							<current.Scene />
						</div>
						<aside className='vd-lightbox__info'>
							<p className='vd-eyebrow'>
								{CATEGORIES.find(c => c.id === current.category)?.label} · {open + 1}/{items.length}
							</p>
							<h3>{current.title}</h3>
							<dl>
								<dt>Técnica</dt>
								<dd>{current.technique}</dd>
								<dt>Material</dt>
								<dd>{current.material}</dd>
							</dl>
							{current.note && <p className='vd-lightbox__note'>{current.note}</p>}
							<div className='vd-lightbox__nav'>
								<button
									type='button'
									onClick={() => setOpen((open - 1 + items.length) % items.length)}
									aria-label='Anterior'
								>
									←
								</button>
								<button
									type='button'
									onClick={() => setOpen((open + 1) % items.length)}
									aria-label='Siguiente'
								>
									→
								</button>
								<button type='button' className='vd-lightbox__close' onClick={() => setOpen(null)}>
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
