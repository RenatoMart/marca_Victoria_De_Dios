import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { motion } from '../../brand/motion';
import { rig } from '../rig';

type V3 = [number, number, number];
export interface Shot {
	pos: V3;
	target: V3;
}

/** Tomas de cámara de la marca: todas las vistas 3D usan este vocabulario. */
export const SHOTS = {
	/** Entrada: un poco más lejos y alta; la cámara "llega" al bodegón. */
	enter: { pos: [0.2, 2.2, 11], target: [0, 0.5, 0] },
	hero: { pos: [0.1, 1.5, 8.2], target: [0, 0.5, 0] },
	/** Salida del hero: pequeño dolly-out hacia atrás y arriba. */
	exit: { pos: [0.1, 2.4, 10.6], target: [0, 0.42, 0] },
	product: { pos: [0, 0.95, 4.3], target: [0, 0.56, 0] },
	/** Hover sobre el producto: se acerca y baja unos centímetros. */
	productHover: { pos: [0.32, 0.82, 3.75], target: [0, 0.6, 0] },
} satisfies Record<string, Shot>;

const mix = (a: V3, b: V3, t: number): V3 => [
	MathUtils.lerp(a[0], b[0], t),
	MathUtils.lerp(a[1], b[1], t),
	MathUtils.lerp(a[2], b[2], t),
];

/** Elige la toma de cada vista a partir del estado compartido. */
export const shotFor = {
	hero: (): Shot => {
		if (!rig.heroEntered) return SHOTS.enter;
		const t = MathUtils.smoothstep(rig.heroProgress, 0, 1);
		return {
			pos: mix(SHOTS.hero.pos, SHOTS.exit.pos, t),
			target: mix(SHOTS.hero.target, SHOTS.exit.target, t),
		};
	},
	product: (): Shot => (rig.productHover ? SHOTS.productHover : SHOTS.product),
};

interface Props {
	shot: () => Shot;
	/** Amplitud del parallax del puntero en unidades de escena (0 = sin parallax). */
	parallax?: number;
}

/**
 * Cámara dirigida: interpola hacia la toma actual con amortiguación (nunca de golpe)
 * y añade un micro-parallax subconsciente del puntero. Solo pide fotogramas mientras se mueve.
 */
export default function CameraRig({ shot, parallax = 0.22 }: Props) {
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

		pointer.current.x = MathUtils.damp(
			pointer.current.x,
			reduced ? 0 : rig.px,
			motion.damp.pointer,
			d,
		);
		pointer.current.y = MathUtils.damp(
			pointer.current.y,
			reduced ? 0 : rig.py,
			motion.damp.pointer,
			d,
		);

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

		const k = reduced ? 1 : 1 - Math.exp(-motion.damp.camera * d);
		camera.position.lerp(goal.current, k);
		look.current.lerp(goalTarget.current, k);
		camera.lookAt(look.current);

		const moving =
			camera.position.distanceToSquared(goal.current) > 1e-6 ||
			look.current.distanceToSquared(goalTarget.current) > 1e-6 ||
			Math.abs(pointer.current.x - rig.px) > 1e-3 ||
			Math.abs(pointer.current.y - rig.py) > 1e-3;
		if (moving && !reduced) invalidate();
	});

	return null;
}
