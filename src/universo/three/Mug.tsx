import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import {
	CanvasTexture,
	ClampToEdgeWrapping,
	CylinderGeometry,
	Group,
	LatheGeometry,
	MathUtils,
	Mesh,
	MeshStandardMaterial,
	RepeatWrapping,
	SRGBColorSpace,
	TextureLoader,
	TorusGeometry,
	Vector2,
} from 'three';
import { motion } from '../../brand/motion';
import { rig } from '../rig';
import { MAT } from './materials';

/* ---------- Geometría (una sola vez, compartida) ---------- */
const PROFILE = [
	[0, 0],
	[0.44, 0],
	[0.49, 0.03],
	[0.5, 0.08],
	[0.5, 1.05],
	[0.495, 1.1],
	[0.475, 1.115],
	[0.455, 1.1],
	[0.455, 0.1],
	[0, 0.1],
].map(([x, y]) => new Vector2(x, y));

const BODY = new LatheGeometry(PROFILE, 96);
// Asa: medio toro girado para abrirse hacia el cuerpo.
const HANDLE = new TorusGeometry(0.27, 0.055, 24, 64, Math.PI);
// Superficie de impresión: una banda del cilindro que mira a cámara (+z).
const ARC = 2.0;
const DECAL_H = 0.6;
export const DECAL = new CylinderGeometry(
	0.503,
	0.503,
	DECAL_H,
	72,
	1,
	true,
	-ARC / 2,
	ARC,
);
// Transfer curvado con la misma proporción que la banda impresa (no deforma el diseño).
export const SHEET = new CylinderGeometry(
	0.62,
	0.62,
	0.62,
	48,
	1,
	true,
	-0.84,
	1.68,
);

/** Encaja el logo en un lienzo con la proporción de la banda impresa (sin deformarlo). */
export function useLogoTexture(mirror = false) {
	const tex = useLoader(TextureLoader, '/brand/isologo-color.png');
	const img: HTMLImageElement = tex.image;
	return useMemo(() => {
		const ratio = (0.503 * ARC) / DECAL_H;
		const c = document.createElement('canvas');
		c.height = 512;
		c.width = Math.round(512 * ratio);
		const ctx = c.getContext('2d')!;
		if (mirror) {
			// El transfer es papel: fondo claro y el diseño impreso en espejo.
			ctx.fillStyle = '#fbfaf7';
			ctx.fillRect(0, 0, c.width, c.height);
		}
		const h = c.height * (mirror ? 0.74 : 0.86);
		const w = h * (img.width / img.height);
		ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
		const t = new CanvasTexture(c);
		t.colorSpace = SRGBColorSpace;
		t.anisotropy = 4;
		if (mirror) {
			t.wrapS = RepeatWrapping;
			t.repeat.x = -1;
		}
		return t;
	}, [img, mirror]);
}

/** Máscara vertical con borde suave: al desplazarla, la impresión "sube" como en la prensa. */
export function useRevealMask() {
	return useMemo(() => {
		const c = document.createElement('canvas');
		c.width = 2;
		c.height = 256;
		const ctx = c.getContext('2d')!;
		const g = ctx.createLinearGradient(0, 256, 0, 0);
		g.addColorStop(0, '#fff');
		g.addColorStop(0.44, '#fff');
		g.addColorStop(0.56, '#000');
		g.addColorStop(1, '#000');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 2, 256);
		const t = new CanvasTexture(c);
		t.wrapT = ClampToEdgeWrapping;
		t.offset.y = 0.5;
		return t;
	}, []);
}

export function MugBody({ rim = false }: { rim?: boolean }) {
	return (
		<group>
			<mesh geometry={BODY} material={MAT.ceramic} />
			<mesh
				geometry={HANDLE}
				material={MAT.ceramic}
				position={[0.47, 0.58, 0]}
				rotation={[0, 0, -Math.PI / 2]}
			/>
			{rim && (
				<mesh
					position={[0, 1.112, 0]}
					rotation={[Math.PI / 2, 0, 0]}
					material={MAT.gold}
				>
					<torusGeometry args={[0.475, 0.008, 8, 96]} />
				</mesh>
			)}
		</group>
	);
}

const lerpK = (lambda: number, dt: number) =>
	rig.reduced ? 1 : 1 - Math.exp(-lambda * Math.min(dt, 1 / 30));

/**
 * Taza de «Hazlo tuyo». Tres estados interrumpibles (se interpolan, no son keyframes):
 * neutral → design (aparece el transfer con el diseño en espejo) → personal (el transfer
 * se apoya en la taza y la impresión sube de abajo arriba).
 */
export function CustomMug() {
	const invalidate = useThree(s => s.invalidate);
	const group = useRef<Group>(null);
	const sheet = useRef<Mesh>(null);
	const logo = useLogoTexture(false);
	const mirrored = useLogoTexture(true);
	const mask = useRevealMask();

	const decalMat = useMemo(
		() =>
			new MeshStandardMaterial({
				map: logo,
				alphaMap: mask,
				transparent: true,
				roughness: 0.35,
				depthWrite: false,
			}),
		[logo, mask],
	);
	const sheetMat = useMemo(
		() =>
			new MeshStandardMaterial({
				map: mirrored,
				color: '#ffffff',
				roughness: 0.85,
				transparent: true,
				side: 2,
			}),
		[mirrored],
	);
	useEffect(
		() => () => {
			[logo, mirrored, mask].forEach(t => t.dispose());
			decalMat.dispose();
			sheetMat.dispose();
		},
		[logo, mirrored, mask, decalMat, sheetMat],
	);

	const reveal = useRef(0);

	useFrame((state, dt) => {
		const g = group.current;
		const sh = sheet.current;
		if (!g || !sh) return;
		const t = performance.now() / 1000 - rig.customChangedAt;
		const s = rig.custom;

		// Giro de producto: pocos grados; muestra el asa en neutro y el frente al personalizar.
		const yaw =
			(s === 'neutral' ? -0.55 : -0.08) + (rig.reduced ? 0 : rig.px * 0.12);
		g.rotation.y = MathUtils.lerp(
			g.rotation.y,
			yaw,
			lerpK(motion.damp.object * 0.6, dt),
		);

		// Transfer: fuera (abajo), delante a la izquierda (diseño) o pegado a la taza (personalizada).
		const show = s !== 'neutral' && !(s === 'personal' && t > 0.9);
		const goal =
			s === 'neutral'
				? { x: -0.9, y: 0.2, z: 0.9, rot: 0.5, sc: 0.85 }
				: s === 'design'
					? { x: -0.62, y: 0.62, z: 0.78, rot: 0.38, sc: 0.92 }
					: { x: 0, y: 0.56, z: -0.12, rot: 0, sc: 0.83 };
		const k = lerpK(motion.damp.object, dt);
		sh.position.x = MathUtils.lerp(sh.position.x, goal.x, k);
		sh.position.y = MathUtils.lerp(sh.position.y, goal.y, k);
		sh.position.z = MathUtils.lerp(sh.position.z, goal.z, k);
		sh.rotation.y = MathUtils.lerp(sh.rotation.y, goal.rot, k);
		sh.scale.setScalar(MathUtils.lerp(sh.scale.x, goal.sc, k));
		sheetMat.opacity = MathUtils.lerp(
			sheetMat.opacity,
			show ? 1 : 0,
			lerpK(6, dt),
		);
		sh.visible = sheetMat.opacity > 0.01;

		// Impresión: empieza cuando el transfer ya tocó la taza.
		const want = s === 'personal' && (t > 0.45 || rig.reduced) ? 1 : 0;
		reveal.current = MathUtils.lerp(
			reveal.current,
			want,
			lerpK(want ? 2.2 : 6, dt),
		);
		mask.offset.y = MathUtils.lerp(0.56, -0.56, reveal.current);
		decalMat.opacity = Math.min(1, reveal.current * 3);

		const settling =
			Math.abs(g.rotation.y - yaw) > 1e-3 ||
			Math.abs(sh.position.x - goal.x) > 1e-3 ||
			Math.abs(sheetMat.opacity - (show ? 1 : 0)) > 1e-3 ||
			Math.abs(reveal.current - want) > 1e-3 ||
			(s === 'personal' && t < 1.2);
		if (settling && !rig.reduced) invalidate();
		void state;
	});

	return (
		<group ref={group}>
			<MugBody />
			<mesh
				geometry={DECAL}
				material={decalMat}
				position={[0, 0.56, 0]}
				renderOrder={2}
			/>
			<mesh
				ref={sheet}
				geometry={SHEET}
				material={sheetMat}
				position={[-0.9, 0.2, 0.9]}
			/>
		</group>
	);
}
