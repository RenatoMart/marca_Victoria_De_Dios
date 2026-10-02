import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { damp } from '../../motion/tokens';
import { rig } from './rig';

type V3 = [number, number, number];
export interface Shot {
	pos: V3;
	target: V3;
}

/** Tomas de cámara de la marca. Todas las escenas comparten este vocabulario. */
export const SHOTS = {
	/** Sello — entrada: más lejos y ligeramente alta; la cámara «llega» al producto. */
	sealEnter: { pos: [0.5, 0.6, 14.5], target: [0, 0, 0] },
	/** Sello — plano de producto con teleobjetivo (FOV bajo): comprime la profundidad. */
	sealHero: { pos: [0, 0.05, 9.8], target: [0, 0, 0] },
	/** Sello — salida: pequeño dolly-out mientras la cortina sube. */
	sealExit: { pos: [0, -0.5, 13.2], target: [0, -0.3, 0] },
	/** Taza — plano de producto. */
	mug: { pos: [0, 0.78, 5.6], target: [0, 0.55, 0] },
	/** Taza — hover: se acerca y baja unos centímetros. */
	mugHover: { pos: [0.28, 0.7, 4.8], target: [0, 0.58, 0] },
} satisfies Record<string, Shot>;

export const mix = (a: V3, b: V3, t: number): V3 => [
	MathUtils.lerp(a[0], b[0], t),
	MathUtils.lerp(a[1], b[1], t),
	MathUtils.lerp(a[2], b[2], t),
];

interface Props {
	shot: () => Shot;
	/** Amplitud del parallax del puntero en unidades de escena. */
	parallax?: number;
}

/**
 * Cámara dirigida: interpola hacia la toma actual con amortiguación (nunca de golpe)
 * y suma un micro-parallax subconsciente del puntero. Solo pide fotogramas mientras se mueve.
 */
export default function CameraRig({ shot, parallax = 0.2 }: Props) {
	const camera = useThree(s => s.camera);
	const invalidate = useThree(s => s.invalidate);
	const look = useRef<Vector3 | null>(null);
	const goal = useRef(new Vector3());
	const goalTarget = useRef(new Vector3());
	const pointer = useRef({ x: 0, y: 0 });

	useFrame((_, dt) => {
		const s = shot();
		const reduced = rig.reduced;
		const d = Math.min(dt, 1 / 30);

		pointer.current.x = MathUtils.damp(pointer.current.x, reduced ? 0 : rig.px, damp.pointer, d);
		pointer.current.y = MathUtils.damp(pointer.current.y, reduced ? 0 : rig.py, damp.pointer, d);

		goal.current.set(
			s.pos[0] + pointer.current.x * parallax,
			s.pos[1] - pointer.current.y * parallax * 0.5,
			s.pos[2],
		);
		goalTarget.current.set(...s.target);

		if (!look.current) {
			look.current = goalTarget.current.clone();
			camera.position.copy(goal.current);
		}

		const k = reduced ? 1 : 1 - Math.exp(-damp.camera * d);
		camera.position.lerp(goal.current, k);
		look.current.lerp(goalTarget.current, k);
		camera.lookAt(look.current);

		const moving =
			camera.position.distanceToSquared(goal.current) > 1e-6 ||
			look.current.distanceToSquared(goalTarget.current) > 1e-6 ||
			Math.abs(pointer.current.x - (reduced ? 0 : rig.px)) > 1e-3 ||
			Math.abs(pointer.current.y - (reduced ? 0 : rig.py)) > 1e-3;
		if (moving) invalidate();
	});

	return null;
}
