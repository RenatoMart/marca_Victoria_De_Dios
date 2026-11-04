import Mark, { PAINT } from '../brand/Mark';
import SiteNav from '../brand/SiteNav';
import '../brand/tokens.css';
import '../brand/BrandPage.css';

/** /video2: la película de motion design (Remotion), reproducida desde un archivo MP4. */
export default function Video2Page() {
	return (
		<div className='vd'>
			<SiteNav current='/video2' />

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
