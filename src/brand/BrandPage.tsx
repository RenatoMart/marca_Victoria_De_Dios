import Mark, { PAINT } from './Mark';
import Identity from './Identity';
import Gallery from './Gallery';
import './tokens.css';
import './BrandPage.css';

const NAV = [
	{ href: '#identidad', label: 'Identidad' },
	{ href: '#color', label: 'Versiones' },
	{ href: '#paleta', label: 'Paleta' },
	{ href: '#reglas', label: 'Reglas' },
	{ href: '#aplicaciones', label: 'Aplicaciones' },
];

export default function BrandPage() {
	return (
		<div className='vd'>
			<nav className='vd-nav'>
				<a href='#top' className='vd-nav__brand'>
					<Mark kind='symbol' width='30px' primary={PAINT.ivory} accent={PAINT.gold} />
					<span>Victoria de Dios</span>
				</a>
				<div className='vd-nav__links'>
					{NAV.map(n => (
						<a key={n.href} href={n.href}>
							{n.label}
						</a>
					))}
				</div>
			</nav>

			<header id='top' className='vd-hero'>
				<div className='vd-hero__mark'>
					<Mark kind='isologo' mono={PAINT.foil} finish='foil' width='100%' />
				</div>
				<div className='vd-hero__text'>
					<p className='vd-eyebrow vd-eyebrow--gold'>Manual de aplicaciones · 2026</p>
					<h1>Cómo vive la marca en cada producto</h1>
					<p>
						Identidad, versiones de color y bocetos de aplicación de Victoria de Dios: desde la caja
						de envío hasta la etiqueta de un polo, una cartera o un tomatodo.
					</p>
					<a className='vd-btn' href='#aplicaciones'>
						Ver aplicaciones
					</a>
				</div>
			</header>

			<main>
				<Identity />
				<Gallery />
			</main>

			<footer className='vd-footer'>
				<Mark kind='wordmark' mono={PAINT.goldLight} width='min(320px, 70%)' />
				<p>Bocetos de presentación. Validar colores y tamaños con prueba física antes de producir.</p>
			</footer>
		</div>
	);
}
