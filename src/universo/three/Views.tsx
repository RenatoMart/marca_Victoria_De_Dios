import { Suspense, useEffect, type ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { rig } from '../rig';
import CameraRig, { shotFor } from './CameraRig';
import LightingRig from './LightingRig';
import StillLife from './StillLife';
import { CustomMug } from './Mug';

/** Registra el canvas para que el DOM (estado, puntero, scroll del hero) pueda pedirle fotogramas. */
function DemandBridge() {
	const invalidate = useThree(s => s.invalidate);
	useEffect(() => {
		const f = () => invalidate();
		rig.invalidators.add(f);
		invalidate();
		return () => {
			rig.invalidators.delete(f);
		};
	}, [invalidate]);
	return null;
}

interface StageProps {
	dpr: [number, number];
	children: ReactNode;
}

/**
 * Canvas de un escenario: vive dentro de su contenedor y se desplaza con la página.
 * Render bajo demanda: si nada se mueve, la GPU no trabaja.
 */
function Stage({ dpr, children }: StageProps) {
	return (
		<Canvas
			className='uv-view'
			frameloop='demand'
			dpr={dpr}
			gl={{
				antialias: true,
				alpha: true,
				powerPreference: 'high-performance',
				preserveDrawingBuffer: import.meta.env.DEV,
			}}
			aria-hidden='true'
		>
			<DemandBridge />
			{children}
		</Canvas>
	);
}

export function HeroCanvas({ dpr }: { dpr: [number, number] }) {
	return (
		<Stage dpr={dpr}>
			<PerspectiveCamera
				makeDefault
				fov={26}
				near={0.1}
				far={60}
				position={[0.2, 2.2, 11]}
			/>
			<CameraRig shot={shotFor.hero} parallax={0.24} />
			<LightingRig />
			<StillLife />
		</Stage>
	);
}

export function CustomizeCanvas({ dpr }: { dpr: [number, number] }) {
	return (
		<Stage dpr={dpr}>
			<PerspectiveCamera
				makeDefault
				fov={26}
				near={0.1}
				far={40}
				position={[0, 0.95, 4.3]}
			/>
			<CameraRig shot={shotFor.product} parallax={0.12} />
			<LightingRig reactive />
			<Suspense fallback={null}>
				<CustomMug />
			</Suspense>
			<mesh position={[0, -0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<circleGeometry args={[1.6, 64]} />
				<meshStandardMaterial color='#ebe4d8' roughness={0.95} />
			</mesh>
			<ContactShadows
				position={[0, 0.002, 0]}
				scale={3}
				blur={2.2}
				opacity={0.45}
				far={1.4}
				resolution={512}
				frames={1}
				color='#1b1610'
			/>
		</Stage>
	);
}
