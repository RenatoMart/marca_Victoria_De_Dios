import Mark, { PAINT } from './Mark';
import SiteNav from './SiteNav';
import Identity from './Identity';
import Gallery from './Gallery';
import Showcase from './Showcase';
import Envelope from './Envelope';
import Motion from './Motion';
import BrandFilm from './BrandFilm';
import './tokens.css';
import './BrandPage.css';

export default function BrandPage() {
	return (
		<div className='vd'>
			<SiteNav current='/' />

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
