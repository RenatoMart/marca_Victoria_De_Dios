import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
	BoxGeometry,
	Color,
	Mesh,
	MeshBasicMaterial,
	MathUtils,
	PlaneGeometry,
	PMREMGenerator,
	Scene,
	type DirectionalLight,
	type Texture,
} from 'three';
import { motion } from '../../brand/motion';
import { rig } from '../rig';

interface Props {
	/** Si reacciona al hover del producto (luz principal más cerca y cálida). */
	reactive?: boolean;
}

/**
 * Mapa de entorno de estudio, generado una vez: una sala neutra con tres softboxes.
 * Da reflejos creíbles al esmalte y al dorado sin descargar ningún HDR.
 */
let studioEnv: Texture | null = null;
export function useStudioEnvironment() {
	const gl = useThree(s => s.gl);
	const scene = useThree(s => s.scene);
	useEffect(() => {
		if (!studioEnv) {
			const room = new Scene();
			room.background = new Color('#2a2622');
			const walls = new Mesh(
				new BoxGeometry(20, 12, 20),
				new MeshBasicMaterial({ color: '#5a524a', side: 1 }),
			);
			room.add(walls);
			const box = (
				color: string,
				intensity: number,
				pos: [number, number, number],
				size: [number, number],
				rx = 0,
				ry = 0,
			) => {
				const m = new Mesh(
					new PlaneGeometry(...size),
					new MeshBasicMaterial({
						color: new Color(color).multiplyScalar(intensity),
					}),
				);
				m.position.set(...pos);
				m.rotation.set(rx, ry, 0);
				room.add(m);
			};
			box('#fff3e2', 6, [-7, 3, 3], [5, 7], 0, Math.PI / 2.4); // ventana / key
			box('#e8eef8', 2.2, [7, 2, -2], [3, 6], 0, -Math.PI / 2.2); // contraluz frío
			box('#ffffff', 1.6, [0, 5.9, 0], [8, 8], Math.PI / 2); // cenital suave
			const pmrem = new PMREMGenerator(gl);
			studioEnv = pmrem.fromScene(room, 0.04).texture;
			pmrem.dispose();
			room.traverse(o => {
				if (o instanceof Mesh) {
					(o.geometry as BoxGeometry).dispose();
					(o.material as MeshBasicMaterial).dispose();
				}
			});
		}
		scene.environment = studioEnv;
		scene.environmentIntensity = 0.85;
		return () => {
			scene.environment = null;
		};
	}, [gl, scene]);
}

/**
 * Iluminación de estudio fotográfico: luz principal cálida desde la izquierda (ventana),
 * contraluz frío suave, relleno bajo y reflejos de softbox para cerámica y metal.
 * Sin bloom, sin neón, sin colores saturados.
 */
export default function LightingRig({ reactive = false }: Props) {
	const key = useRef<DirectionalLight>(null);
	const invalidate = useThree(s => s.invalidate);
	useStudioEnvironment();

	useFrame((_, dt) => {
		if (!reactive || !key.current) return;
		const d = Math.min(dt, 1 / 30);
		const goalI = rig.productHover ? 2.6 : 2.1;
		const goalX = rig.productHover ? -2.6 : -4;
		const k = rig.reduced ? 1 : 1 - Math.exp(-motion.damp.object * d);
		key.current.intensity = MathUtils.lerp(key.current.intensity, goalI, k);
		key.current.position.x = MathUtils.lerp(key.current.position.x, goalX, k);
		if (Math.abs(key.current.intensity - goalI) > 1e-3) invalidate();
	});

	return (
		<>
			<ambientLight intensity={0.28} color='#f4ede1' />
			<directionalLight
				ref={key}
				position={[-4, 5, 3.5]}
				intensity={2.1}
				color='#fff1dc'
			/>
			<directionalLight
				position={[4, 3, -4]}
				intensity={0.75}
				color='#d9e1f2'
			/>
		</>
	);
}
