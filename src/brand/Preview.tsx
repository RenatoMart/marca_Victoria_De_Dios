import { useEffect } from 'react';
import { ALL } from './Gallery';
import Motion from './Motion';
import BrandFilm from './BrandFilm';
import Universo from '../universo/Universo';
import './tokens.css';
import './BrandPage.css';

/** Vista de desarrollo: /?preview=<id> muestra una maqueta; /?preview=movimiento, la sección de movimiento. */
export default function Preview({ id }: { id: string }) {
	// /?preview=…&y=<px>: desplaza la vista para revisar zonas concretas en capturas.
	useEffect(() => {
		const y = Number(new URLSearchParams(location.search).get('y') ?? 0);
		if (y) setTimeout(() => window.scrollTo(0, y), 300);
	}, []);
	if (id === 'universo-custom') {
		return (
			<div className='vd'>
				<Universo part='custom' />
			</div>
		);
	}
	if (id === 'universo') {
		return (
			<div className='vd'>
				<Universo />
			</div>
		);
	}
	if (id === 'pelicula') {
		return (
			<div className='vd'>
				<BrandFilm />
			</div>
		);
	}
	if (id === 'movimiento') {
		return (
			<div className='vd'>
				<Motion />
			</div>
		);
	}
	const item = ALL.find(i => i.id === id);
	if (!item) return <p>No existe la maqueta «{id}».</p>;
	return (
		<div style={{ width: 1200 }}>
			<item.Scene />
		</div>
	);
}
