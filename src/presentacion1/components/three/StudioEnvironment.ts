import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import {
	BoxGeometry,
	Color,
	Mesh,
	MeshBasicMaterial,
	PlaneGeometry,
	PMREMGenerator,
	Scene,
	type Texture,
	type WebGLRenderer,
} from 'three';

/**
 * Mapa de entorno de estudio: una sala neutra con softboxes, generada con PMREM.
 * Da reflejos creíbles al dorado y al esmalte sin descargar ningún HDR.
 * Se crea por renderer (cada canvas tiene su propio contexto WebGL) y se libera al desmontar.
 */

function buildStudio(gl: WebGLRenderer): Texture {
	const room = new Scene();
	room.background = new Color('#201c19');
	room.add(
		new Mesh(new BoxGeometry(20, 12, 20), new MeshBasicMaterial({ color: '#4a433c', side: 1 })),
	);
	const box = (
		color: string,
		power: number,
		pos: [number, number, number],
		size: [number, number],
		rx = 0,
		ry = 0,
	) => {
		const m = new Mesh(
			new PlaneGeometry(...size),
			new MeshBasicMaterial({ color: new Color(color).multiplyScalar(power) }),
		);
		m.position.set(...pos);
		m.rotation.set(rx, ry, 0);
		room.add(m);
	};
	box('#fff6ea', 6, [-7, 3, 3], [5, 7], 0, Math.PI / 2.4); // ventana · luz principal
	box('#e4ebf8', 2.4, [7, 2, -2], [3, 6], 0, -Math.PI / 2.2); // contraluz frío
	box('#ffffff', 1.8, [0, 5.9, 0], [8, 8], Math.PI / 2); // cenital suave
	box('#fff1dc', 1.7, [0, 1.2, 8.8], [11, 6], 0, Math.PI); // relleno frontal: lo que refleja el foil de cara
	const pmrem = new PMREMGenerator(gl);
	const env = pmrem.fromScene(room, 0.04).texture;
	pmrem.dispose();
	room.traverse(o => {
		if (o instanceof Mesh) {
			(o.geometry as BoxGeometry).dispose();
			(o.material as MeshBasicMaterial).dispose();
		}
	});
	return env;
}

export function useStudioEnvironment(intensity = 0.85) {
	const gl = useThree(s => s.gl);
	const scene = useThree(s => s.scene);
	const invalidate = useThree(s => s.invalidate);
	useEffect(() => {
		const env = buildStudio(gl);
		scene.environment = env;
		scene.environmentIntensity = intensity;
		invalidate(); // el entorno llega tras el primer render: hay que repintar
		return () => {
			scene.environment = null;
			env.dispose();
		};
	}, [gl, scene, invalidate, intensity]);
}
