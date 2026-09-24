import { ALL } from './Gallery';
import './tokens.css';

/** Vista de desarrollo: /?preview=<id> muestra una sola maqueta a 1200 px. */
export default function Preview({ id }: { id: string }) {
	const item = ALL.find(i => i.id === id);
	if (!item) return <p>No existe la maqueta «{id}».</p>;
	return (
		<div style={{ width: 1200 }}>
			<item.Scene />
		</div>
	);
}
