import { applyCssVars } from './motion/tokens';
import { useEffect } from 'react';
import { hasWebGL } from './components/three/webgl';
import { prefetch3D } from './components/three/Stage3D';
import Presentacion1 from './Presentacion1';
import './index.css';
import './styles.css';

applyCssVars();

/** Punto de entrada de /presentacion1: sus estilos globales solo se cargan en esta ruta. */
export default function Page() {
	useEffect(() => {
		if (hasWebGL()) prefetch3D();
	}, []);
	return <Presentacion1 />;
}
