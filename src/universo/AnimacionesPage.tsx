import Mark, { PAINT } from '../brand/Mark';
import Universo from './Universo';
import '../brand/tokens.css';
import '../brand/BrandPage.css';

/**
 * Página aparte (/animaciones) para la experiencia de motion 2D + 3D.
 * Vive separada del manual para probarla sin afectar a sus secciones.
 */
export default function AnimacionesPage() {
	return (
		<div className='vd'>
			<nav className='vd-nav' aria-label='Navegación'>
				<a
					href='/'
					className='vd-nav__brand'
					aria-label='Victoria de Dios, volver al manual'
				>
					<Mark kind='symbol' width='26px' mono={PAINT.goldLight} />
				</a>
				<div className='vd-nav__links'>
					<a href='/'>Volver al manual</a>
				</div>
			</nav>

			<main>
				<Universo />
			</main>

			<footer className='vd-footer'>
				<Mark kind='wordmark' mono={PAINT.goldLight} width='min(260px, 64%)' />
				<p>
					Experiencia de movimiento de la marca. Página de pruebas, separada del
					manual.
				</p>
			</footer>
		</div>
	);
}
