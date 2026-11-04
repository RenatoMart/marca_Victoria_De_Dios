import Mark, { PAINT } from './Mark';
import './tokens.css';
import './BrandPage.css';

/** Presentaciones a la izquierda (junto al logo); el resto de páginas a la derecha. */
const PRESENTACIONES = [
	{ href: '/', label: 'Presentación 1' },
	{ href: '/presentacion2', label: 'Presentación 2' },
];
const PAGINAS = [
	{ href: '/animaciones', label: 'Animaciones' },
	{ href: '/video', label: 'Video 1' },
	{ href: '/video2', label: 'Video 2' },
];

/** Barra común de Presentación 1, Animaciones y Video 2. `current` marca la pestaña activa. */
export default function SiteNav({ current }: { current: string }) {
	const link = (n: { href: string; label: string }) => (
		<a
			key={n.href}
			href={n.href}
			aria-current={n.href === current ? 'page' : undefined}
		>
			{n.label}
		</a>
	);
	return (
		<nav className='vd-nav' aria-label='Navegación'>
			<div className='vd-nav__left'>
				<a
					href='/'
					className='vd-nav__brand'
					aria-label='Victoria de Dios, inicio'
				>
					<Mark kind='symbol' width='26px' mono={PAINT.goldLight} />
				</a>
				{PRESENTACIONES.map(link)}
			</div>
			<div className='vd-nav__links'>{PAGINAS.map(link)}</div>
		</nav>
	);
}
