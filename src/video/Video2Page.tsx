import Mark, { PAINT } from '../brand/Mark';
import '../brand/tokens.css';
import '../brand/BrandPage.css';

/** /video2: la película de motion design (Remotion), reproducida desde un archivo MP4. */
export default function Video2Page() {
	return (
		<div className='vd'>
			<nav className='vd-nav' aria-label='Navegación'>
				<a
					href='/'
					className='vd-nav__brand'
					aria-label='Victoria de Dios, volver a la Presentación 1'
				>
					<Mark kind='symbol' width='26px' mono={PAINT.goldLight} />
				</a>
				<div className='vd-nav__links'>
					<a href='/'>Presentación 1</a>
					<a href='/presentacion2'>Presentación 2</a>
					<a href='/animaciones'>Animaciones</a>
					<a href='/video'>Video 1</a>
					<a href='/video2' aria-current='page'>
						Video 2
					</a>
				</div>
			</nav>

			<main style={{ padding: '96px 5vw 64px', display: 'grid', placeItems: 'center' }}>
				<video
					src='/videos/video2.mp4'
					controls
					playsInline
					preload='metadata'
					style={{ width: 'min(1100px, 100%)', borderRadius: 12, background: '#000' }}
				>
					Tu navegador no puede reproducir este video.
				</video>
			</main>

			<footer className='vd-footer'>
				<Mark kind='wordmark' mono={PAINT.goldLight} width='min(260px, 64%)' />
				<p>Video 2 · película de motion design de la marca (32 s).</p>
			</footer>
		</div>
	);
}
