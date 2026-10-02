import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Compila todos los shaders de la escena antes de mostrarla (en paralelo si el navegador
 * lo permite), para que el primer movimiento no se trabe compilando en ese momento.
 * Debe ir dentro del mismo <Suspense> que el contenido: se monta cuando todo ya cargó.
 */
export default function Precompile({ onReady }: { onReady?: () => void }) {
	const gl = useThree(s => s.gl);
	const scene = useThree(s => s.scene);
	const camera = useThree(s => s.camera);
	const invalidate = useThree(s => s.invalidate);

	useEffect(() => {
		let alive = true;
		gl.compileAsync(scene, camera)
			.catch(() => undefined)
			.finally(() => {
				if (!alive) return;
				invalidate();
				// Un fotograma completo ya dibujado antes de avisar: nada aparece a medias.
				requestAnimationFrame(() => {
					if (!alive) return;
					invalidate();
					requestAnimationFrame(() => alive && onReady?.());
				});
			});
		return () => {
			alive = false;
		};
	}, [gl, scene, camera, invalidate, onReady]);

	return null;
}
