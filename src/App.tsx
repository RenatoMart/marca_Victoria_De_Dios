import { lazy, Suspense } from 'react';
import BrandPage from './brand/BrandPage';
import Preview from './brand/Preview';

/** /animaciones se carga aparte: el manual no descarga nada de la experiencia 3D. */
const AnimacionesPage = lazy(() => import('./universo/AnimacionesPage'));
/** /video: el anuncio de marca (three.js y la música solo se descargan aquí). */
const VideoPage = lazy(() => import('./video/VideoPage'));

/** /video2: la película de motion design en MP4. */
const Video2Page = lazy(() => import('./video/Video2Page'));

/** /presentacion2: la web promocional de marca (Motion + R3F), con sus propios estilos. */
const Presentacion1Page = lazy(() => import('./presentacion1/Page'));

function App() {
	const preview = import.meta.env.DEV
		? new URLSearchParams(location.search).get('preview')
		: null;
	if (preview) return <Preview id={preview} />;
	const path = location.pathname.replace(/\/+$/, '');
	if (path === '/presentacion2') {
		return (
			<Suspense fallback={null}>
				<Presentacion1Page />
			</Suspense>
		);
	}
	if (path === '/video2') {
		return (
			<Suspense fallback={null}>
				<Video2Page />
			</Suspense>
		);
	}
	if (path === '/video') {
		return (
			<Suspense fallback={null}>
				<VideoPage />
			</Suspense>
		);
	}
	if (path === '/animaciones') {
		return (
			<Suspense fallback={null}>
				<AnimacionesPage />
			</Suspense>
		);
	}
	return <BrandPage />;
}

export default App;
