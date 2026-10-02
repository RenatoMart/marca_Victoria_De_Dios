import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
	CanvasTexture,
	Color,
	type Group,
	type Mesh,
	type MeshBasicMaterial,
	type PerspectiveCamera,
	SRGBColorSpace,
	Vector3,
} from 'three';
import {
	DURATION,
	ease,
	film,
	lerp,
	prog,
	SCENES,
	sceneIndexAt,
	seg,
	WIPE,
	type SceneId,
} from '../timeline';
import { HUD_H, HUD_W } from './Caption';

type V3 = [number, number, number];
interface Key {
	at: number;
	pos: V3;
	target: V3;
	fov: number;
}

/**
 * Tomas de cámara por escena (fracción 0–1 de la escena). La cámara manda:
 * dolly, pequeñas órbitas y desplazamientos laterales; nunca giros completos.
 */
const SHOTS: Record<SceneId, Key[]> = {
	apertura: [
		{ at: 0, pos: [0, 0.2, 7.6], target: [0, 0.3, 0], fov: 30 },
		{ at: 1, pos: [0, 0.3, 5.9], target: [0, 0.32, 0], fov: 30 },
	],
	universo: [
		{ at: 0, pos: [2.6, 2.1, 9.4], target: [0.2, 0.45, 0], fov: 28 },
		{ at: 1, pos: [-0.9, 1.4, 7.2], target: [0.35, 0.5, 0], fov: 28 },
	],
	hogar: [
		{ at: 0, pos: [0.9, 0.2, 10.2], target: [0.9, 0, 0], fov: 30 },
		{ at: 1, pos: [0.5, 0.05, 8.1], target: [0.6, 0, 0], fov: 30 },
	],
	estilo: [
		{ at: 0, pos: [-1.6, 0.3, 8.4], target: [-1.2, 0.05, 0], fov: 32 },
		{ at: 1, pos: [1.7, 0.15, 7.8], target: [1.4, -0.05, 0], fov: 32 },
	],
	personalizados: [
		{ at: 0, pos: [0.4, 1.35, 5.4], target: [-0.55, 0.58, 0], fov: 26 },
		{ at: 0.45, pos: [-0.05, 1.0, 4.4], target: [-0.6, 0.58, 0], fov: 26 },
		{ at: 1, pos: [-0.55, 0.9, 4.0], target: [-0.65, 0.6, 0], fov: 26 },
	],
	regalo: [
		{ at: 0, pos: [0, 0.1, 10.4], target: [0, 0, 0], fov: 30 },
		{ at: 1, pos: [0.25, 0.05, 8.9], target: [0.15, 0, 0], fov: 30 },
	],
	cierre: [
		{ at: 0, pos: [0, 0.75, 7.2], target: [0, 0.55, 0], fov: 30 },
		{ at: 1, pos: [0, 0.65, 6.4], target: [0, 0.52, 0], fov: 30 },
	],
};

function sample(keys: Key[], u: number) {
	let i = 0;
	while (i < keys.length - 2 && u > keys[i + 1].at) i++;
	const a = keys[i];
	const b = keys[i + 1] ?? a;
	const k = ease.suave(seg(u, a.at, b.at || 1));
	const mix = (x: V3, y: V3): V3 => [
		lerp(x[0], y[0], k),
		lerp(x[1], y[1], k),
		lerp(x[2], y[2], k),
	];
	return {
		pos: mix(a.pos, b.pos),
		target: mix(a.target, b.target),
		fov: lerp(a.fov, b.fov, k),
	};
}

/** Separación entre escenas en el mundo: todas viven montadas, cada una en su sitio. */
export const SCENE_GAP = 80;

interface DirectorProps {
	onScene: (i: number) => void;
	/** Grupo de cada escena (para mostrar solo la activa). */
	groups: React.RefObject<(Group | null)[]>;
	/** false mientras se precompila: todas visibles para compilar sus shaders y hornear sombras. */
	warm: React.RefObject<boolean>;
}

/** Mueve la cámara, el fondo y la luz de entorno según el tiempo del video. */
export function Director({ onScene, groups, warm }: DirectorProps) {
	const camera = useThree(s => s.camera) as PerspectiveCamera;
	const scene = useThree(s => s.scene);
	const current = useRef(-1);
	const target = useMemo(() => new Vector3(), []);
	const bg = useMemo(() => new Color(), []);

	useFrame(() => {
		const t = Math.min(film.t, DURATION - 1e-3);
		const i = sceneIndexAt(t);
		const sc = SCENES[i];
		if (i !== current.current) {
			current.current = i;
			onScene(i);
		}
		groups.current.forEach((g, gi) => {
			if (g) g.visible = !warm.current || gi === i;
		});
		const s = sample(SHOTS[sc.id], seg(t, sc.start, sc.end));
		const off = i * SCENE_GAP;
		camera.position.set(s.pos[0] + off, s.pos[1], s.pos[2]);
		target.set(s.target[0] + off, s.target[1], s.target[2]);
		camera.lookAt(target);
		if (Math.abs(camera.fov - s.fov) > 1e-3) {
			camera.fov = s.fov;
			camera.updateProjectionMatrix();
		}
		scene.background = bg.set(sc.bg);
		const dark = sc.id === 'apertura' || sc.id === 'cierre';
		scene.environmentIntensity = dark
			? lerp(0.05, 0.4, prog(t - sc.start, 0.4, 3.2))
			: 0.85;
	});
	return null;
}

/** Cortinilla entre escenas: un panel del color de la escena siguiente con un filo dorado. */
export function Wipe() {
	const panel = useRef<Mesh>(null);
	const edge = useRef<Mesh>(null);
	useFrame(() => {
		const t = film.t;
		const p = panel.current;
		const e = edge.current;
		if (!p || !e) return;
		const next = SCENES.findIndex(
			(s, i) => i > 0 && Math.abs(t - s.start) < WIPE,
		);
		if (next < 0) {
			p.visible = e.visible = false;
			return;
		}
		const b = SCENES[next].start;
		const covering = t < b;
		const x = covering
			? lerp(-HUD_W, 0, prog(t, b - WIPE, b, ease.ceremonia))
			: lerp(0, HUD_W, prog(t, b, b + WIPE, ease.ceremonia));
		p.visible = e.visible = true;
		p.position.x = x;
		(p.material as MeshBasicMaterial).color.set(SCENES[next].bg);
		e.position.x = x + (covering ? HUD_W / 2 : -HUD_W / 2);
	});
	return (
		<>
			<mesh ref={panel} position={[0, 0, 5]}>
				<planeGeometry args={[HUD_W, HUD_H]} />
				<meshBasicMaterial toneMapped={false} depthTest={false} transparent />
			</mesh>
			<mesh ref={edge} position={[0, 0, 6]}>
				<planeGeometry args={[3, HUD_H]} />
				<meshBasicMaterial
					color='#d8bd7e'
					toneMapped={false}
					depthTest={false}
					transparent
				/>
			</mesh>
		</>
	);
}

/** Viñeta suave: concentra la mirada en el centro, como en la fotografía de producto. */
export function Vignette() {
	const tex = useMemo(() => {
		const c = document.createElement('canvas');
		c.width = 512;
		c.height = 288;
		const ctx = c.getContext('2d')!;
		const g = ctx.createRadialGradient(256, 144, 90, 256, 144, 320);
		g.addColorStop(0, 'rgba(0,0,0,0)');
		g.addColorStop(1, 'rgba(10,8,6,0.28)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 512, 288);
		const t = new CanvasTexture(c);
		t.colorSpace = SRGBColorSpace;
		return t;
	}, []);
	return (
		<mesh position={[0, 0, 0]}>
			<planeGeometry args={[HUD_W, HUD_H]} />
			<meshBasicMaterial
				map={tex}
				transparent
				toneMapped={false}
				depthTest={false}
			/>
		</mesh>
	);
}
