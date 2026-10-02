import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { NeutralToneMapping } from 'three';
import { rig } from './rig';
import Precompile from '../../../universo/three/Precompile';
import { QUALITY } from './webgl';
import SealStage from './SealStage';
import MugStage from './MugStage';

interface Props {
	/** Se llama cuando el primer fotograma ya se dibujó (para retirar el póster 2D). */
	onReady: () => void;
}

const GL = {
	antialias: QUALITY.antialias,
	alpha: true,
	powerPreference: 'high-performance' as const,
	// Neutral (Khronos PBR): conserva el marfil y el dorado de marca; ACES los apaga.
	toneMapping: NeutralToneMapping,
};

export function SealCanvas({ onReady }: Props) {
	return (
		<Canvas
			frameloop='demand'
			dpr={QUALITY.dpr}
			gl={GL}
			camera={{ fov: 24, near: 0.1, far: 60, position: [0.5, 0.6, 14.5] }}
			onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
			aria-hidden
		>
			<Suspense fallback={null}>
				<SealStage />
				<Precompile onReady={onReady} />
			</Suspense>
		</Canvas>
	);
}

export function MugCanvas({ onReady }: Props) {
	return (
		<Canvas
			frameloop='demand'
			dpr={QUALITY.dpr}
			gl={GL}
			camera={{ fov: window.innerWidth < 700 ? 36 : 28, near: 0.1, far: 40, position: [0, 0.78, 5.6] }}
			onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
			aria-hidden
		>
			<Suspense fallback={null}>
				<MugStage />
				<Precompile onReady={onReady} />
			</Suspense>
		</Canvas>
	);
}

export { rig };
