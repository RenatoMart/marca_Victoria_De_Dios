import Mark, { PAINT } from './Mark';
import Identity from './Identity';
import Gallery from './Gallery';
import Showcase from './Showcase';
import Envelope from './Envelope';
import Motion from './Motion';
import BrandFilm from './BrandFilm';
import './tokens.css';
import './BrandPage.css';

const NAV = [
	{ href: '#escenas', label: 'Escenas' },
	{ href: '#pelicula', label: 'Película' },
	{ href: '#identidad', label: 'Identidad' },
	{ href: '#color', label: 'Color' },
	{ href: '#movimiento', label: 'Movimiento' },
	{ href: '/animaciones', label: 'Animaciones' },
	{ href: '/video', label: 'Video' },
	{ href: '#productos', label: 'Productos' },
];

export default function BrandPage() {
	return (
		<div className='vd'>
			<nav className='vd-nav' aria-label='Secciones'>
				<a
					href='#top'
					className='vd-nav__brand'
					aria-label='Victoria de Dios, inicio'
				>
					<Mark kind='symbol' width='26px' mono={PAINT.goldLight} />
				</a>
				<div className='vd-nav__links'>
					{NAV.map(n => (
						<a key={n.href} href={n.href}>
							{n.label}
						</a>
					))}
				</div>
			</nav>

			<Envelope />

			<main>
				<Showcase />
				<BrandFilm />
				<Identity />
				<Motion />
				<Gallery />
			</main>

			<footer className='vd-footer'>
				<Mark kind='wordmark' mono={PAINT.goldLight} width='min(260px, 64%)' />
				<p>
					Maquetas de presentación. Valida colores y tamaños con una prueba
					física antes de producir.
				</p>
			</footer>
		</div>
	);
}
