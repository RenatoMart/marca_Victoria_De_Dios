import BrandPage from './brand/BrandPage';
import Preview from './brand/Preview';

function App() {
	const preview = import.meta.env.DEV ? new URLSearchParams(location.search).get('preview') : null;
	return preview ? <Preview id={preview} /> : <BrandPage />;
}

export default App;
