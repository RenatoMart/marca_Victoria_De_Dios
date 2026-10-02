import { lazy, Suspense } from 'react';
import BrandPage from './brand/BrandPage';
import Preview from './brand/Preview';

/** /animaciones se carga aparte: el manual no descarga nada de la experiencia 3D. */
const AnimacionesPage = lazy(() => import('./universo/AnimacionesPage'));
/** /video: el anuncio de marca (three.js y la música solo se descargan aquí). */
const VideoPage = lazy(() => import('./video/VideoPage'));

function App() {
	const preview = import.meta.env.DEV
		? new URLSearchParams(location.search).get('preview')
		: null;
	if (preview) return <Preview id={preview} />;
	const path = location.pathname.replace(/\/+$/, '');
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
