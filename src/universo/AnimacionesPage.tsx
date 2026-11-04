import Mark, { PAINT } from '../brand/Mark';
import SiteNav from '../brand/SiteNav';
import { useEffect } from 'react';
import { prefetch3D } from './Lazy3D';
import { hasWebGL } from './webgl';
import Universo from './Universo';
import '../brand/tokens.css';
import '../brand/BrandPage.css';

/**
 * Página aparte (/animaciones) para la experiencia de motion 2D + 3D.
 * Vive separada del manual para probarla sin afectar a sus secciones.
 */
export default function AnimacionesPage() {
	// Precarga: el código 3D se baja desde que se abre la página, antes de que haga falta.
	useEffect(() => {
		if (hasWebGL()) prefetch3D();
	}, []);

	return (
		<div className='vd'>
			<SiteNav current='/animaciones' />

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
