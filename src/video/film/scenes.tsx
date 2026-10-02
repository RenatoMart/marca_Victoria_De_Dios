import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import {
	CanvasTexture,
	ClampToEdgeWrapping,
	type Group,
	type Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	SRGBColorSpace,
	TextureLoader,
} from 'three';
import { QUALITY } from '../../universo/quality';
import StillLife from '../../universo/three/StillLife';
import {
	DECAL,
	MugBody,
	SHEET,
	useLogoTexture,
	useRevealMask,
} from '../../universo/three/Mug';
import { ease, film, lerp, prog, SCENES } from '../timeline';
import PhotoPlane from './PhotoPlane';

const S = Object.fromEntries(SCENES.map(s => [s.id, s])) as Record<
	(typeof SCENES)[number]['id'],
	(typeof SCENES)[number]
>;

/** Ajusta la opacidad de todo un grupo respetando la opacidad base de cada material. */
function fade(group: Group, o: number) {
	group.traverse(obj => {
		const m = (obj as Mesh).material as MeshBasicMaterial | undefined;
		if (!m || Array.isArray(m)) return;
		if (m.userData.base === undefined) m.userData.base = m.opacity;
		m.opacity = (m.userData.base as number) * o;
		m.transparent = true;
	});
}

/** Máscara vertical (revelado de abajo arriba al desplazar offset.y). */
function verticalWipe() {
	const c = document.createElement('canvas');
	c.width = 2;
	c.height = 256;
	const ctx = c.getContext('2d')!;
	const g = ctx.createLinearGradient(0, 256, 0, 0);
	g.addColorStop(0, '#fff');
	g.addColorStop(0.46, '#fff');
	g.addColorStop(0.54, '#000');
	g.addColorStop(1, '#000');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 2, 256);
	const t = new CanvasTexture(c);
	t.wrapT = ClampToEdgeWrapping;
	return t;
}

/** Fondo de estudio: degradado radial para que el espacio tenga profundidad. */
function useBackdrop(inner: string, outer: string) {
	return useMemo(() => {
		const c = document.createElement('canvas');
		c.width = c.height = 512;
		const ctx = c.getContext('2d')!;
		const g = ctx.createRadialGradient(256, 230, 20, 256, 256, 360);
		g.addColorStop(0, inner);
		g.addColorStop(1, outer);
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 512, 512);
		const t = new CanvasTexture(c);
		t.colorSpace = SRGBColorSpace;
		return t;
	}, [inner, outer]);
}

function Backdrop({
	inner,
	outer,
	z = -6,
	size = 40,
}: {
	inner: string;
	outer: string;
	z?: number;
	size?: number;
}) {
	const tex = useBackdrop(inner, outer);
	return (
		<mesh position={[0, 0, z]}>
			<planeGeometry args={[size, size * 0.6]} />
			<meshBasicMaterial map={tex} toneMapped={false} depthWrite={false} />
		</mesh>
	);
}

/* =========================================================================================
 * 01 · Apertura / 07 · Cierre — el sello en foil dorado, descubierto por un haz de luz.
 * ======================================================================================= */
export function SealScene({ which }: { which: 'apertura' | 'cierre' }) {
	const sc = S[which];
	const seal = useRef<Mesh>(null);
	const mask = useLoader(TextureLoader, '/brand/symbol-mask.png');
	const mat = useMemo(
		() =>
			new MeshStandardMaterial({
				map: mask,
				color: '#cfa95f',
				metalness: 1,
				roughness: 0.26,
				transparent: true,
				alphaTest: 0.35,
				envMapIntensity: 1.4,
			}),
		[mask],
	);
	useEffect(() => () => mat.dispose(), [mat]);

	useFrame(() => {
		const t = film.t - sc.start;
		const m = seal.current;
		if (!m) return;
		const appear = prog(t, 0.15, 2.2, ease.seda);
		mat.opacity = appear;
		m.scale.setScalar(lerp(0.94, 1, appear));
		m.position.z = lerp(-0.4, 0, appear);
	});

	return (
		<group>
			<Backdrop inner='#1c2538' outer='#0b0f19' />
			<mesh
				ref={seal}
				material={mat}
				position={[0, which === 'apertura' ? 0.62 : 0.78, 0]}
			>
				<planeGeometry args={[2.3, 2.3 / (1000 / 965)]} />
			</mesh>
		</group>
	);
}

/* =========================================================================================
 * 02 · Universo — el bodegón de la marca: hogar (volumen), estilo (aro), personalizados (taza).
 * ======================================================================================= */
export function UniverseScene() {
	return (
		<group>
			<Backdrop inner='#f5efe5' outer='#d8cdbb' z={-8} size={60} />
			<StillLife />
		</group>
	);
}

/* =========================================================================================
 * 03 · Hogar — las piezas llegan dispersas y se ordenan en una retícula (orden + utilidad).
 * ======================================================================================= */
const HOGAR = [
	'hog-vela',
	'hog-difusor',
	'hog-cojin',
	'hog-toallas',
	'hog-taza-negra',
	'hog-bata',
];
// Desorden inicial determinista (no aleatorio: el video debe ser idéntico en cada pase).
const SCATTER = [
	[-1.4, 0.9, -2.6, 0.12],
	[0.6, 1.3, -3.4, -0.09],
	[1.9, 0.7, -2.2, 0.15],
	[-1.7, -1.0, -3.0, -0.13],
	[0.3, -1.4, -2.4, 0.08],
	[2.1, -0.9, -3.6, -0.11],
];

export function HogarScene() {
	const sc = S.hogar;
	const items = useRef<(Group | null)[]>([]);
	const W = 1.62;
	const H = 1.22;
	const GAP = 0.16;
	useFrame(() => {
		const t = film.t - sc.start;
		items.current.forEach((g, i) => {
			if (!g) return;
			const col = i % 3;
			const row = Math.floor(i / 3);
			const gx = (col - 1) * (W + GAP) + 1.25;
			const gy = (0.5 - row) * (H + GAP);
			const p = prog(t, 0.25 + i * 0.16, 1.85 + i * 0.16, ease.seda);
			const [sx, sy, sz, sr] = SCATTER[i];
			g.position.set(
				lerp(gx + sx, gx, p),
				lerp(gy + sy, gy, p),
				lerp(sz, 0, p),
			);
			g.rotation.z = lerp(sr, 0, p);
			fade(g, prog(t, 0.2 + i * 0.16, 0.9 + i * 0.16));
		});
	});
	return (
		<group>
			<Backdrop inner='#f8f4ed' outer='#e7dfd2' z={-9} size={60} />
			{HOGAR.map((n, i) => (
				<PhotoPlane
					key={n}
					ref={g => {
						items.current[i] = g;
					}}
					src={`/mockups/${n}.jpg`}
					width={W}
					height={H}
				/>
			))}
		</group>
	);
}

/* =========================================================================================
 * 04 · Estilo de vida — telones verticales y deslizamiento lateral (fluidez editorial).
 * ======================================================================================= */
const ESTILO = [
	{ src: '/escenas/coleccion-textil.jpg', x: -4.3, z: -0.9 },
	{ src: '/mockups/ropa-hoodie-blanco.jpg', x: -2.15, z: 0 },
	{ src: '/mockups/ropa-chaqueta-cuero.jpg', x: 0, z: -0.6 },
	{ src: '/mockups/acc-tote-crema.jpg', x: 2.15, z: 0 },
	{ src: '/mockups/ropa-gorra-blanca.jpg', x: 4.3, z: -0.9 },
];

export function EstiloScene() {
	const sc = S.estilo;
	const masks = useMemo(() => ESTILO.map(verticalWipe), []);
	useEffect(() => () => masks.forEach(m => m.dispose()), [masks]);
	const groups = useRef<(Group | null)[]>([]);
	useFrame(() => {
		const t = film.t - sc.start;
		masks.forEach((m, i) => {
			const p = prog(t, 0.3 + i * 0.22, 1.6 + i * 0.22, ease.ceremonia);
			m.offset.y = lerp(0.56, -0.56, p);
			const g = groups.current[i];
			if (g)
				g.position.y =
					lerp(-0.25, 0, prog(t, 0.3 + i * 0.22, 2.2 + i * 0.22, ease.seda)) -
					0.25;
		});
	});
	return (
		<group>
			<Backdrop inner='#f5f0e7' outer='#e2d8c8' z={-9} size={60} />
			{ESTILO.map((e, i) => (
				<PhotoPlane
					key={e.src}
					ref={g => {
						groups.current[i] = g;
					}}
					src={e.src}
					width={1.95}
					height={2.6}
					alphaMap={masks[i]}
					position={[e.x, -0.25, e.z]}
				/>
			))}
		</group>
	);
}

/* =========================================================================================
 * 05 · Hazlo tuyo — sublimación: taza blanca → transfer en espejo → prensa → impresión.
 * ======================================================================================= */
export function CustomScene() {
	const sc = S.personalizados;
	const mug = useRef<Group>(null);
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
				roughness: 0.85,
				transparent: true,
				side: 2,
				opacity: 0,
			}),
		[mirrored],
	);
	useEffect(
		() => () => {
			decalMat.dispose();
			sheetMat.dispose();
		},
		[decalMat, sheetMat],
	);

	useFrame(() => {
		const t = film.t - sc.start;
		const g = mug.current;
		const sh = sheet.current;
		if (!g || !sh) return;
		// Giro de producto: unos grados, nunca una vuelta completa.
		g.rotation.y =
			lerp(-0.85, -0.5, prog(t, 0, 2.2, ease.suave)) +
			lerp(0, 0.47, prog(t, 4.8, 6.6, ease.ceremonia));
		// Transfer: aparece delante, se acerca a la taza y se presiona.
		const appear = prog(t, 1.4, 2.4, ease.seda);
		const toMug = prog(t, 3.4, 4.5, ease.ceremonia);
		// El transfer baja desde arriba hasta la cara de la taza, como la plancha de una prensa.
		sh.position.set(
			lerp(0.15, 0, toMug),
			lerp(lerp(1.62, 1.36, appear), 0.56, toMug),
			lerp(0.55, -0.12, toMug),
		);
		sh.rotation.set(lerp(-0.18, 0, toMug), lerp(-0.2, 0, toMug), 0);
		sh.scale.setScalar(lerp(0.7, 0.83, toMug));
		sheetMat.opacity = appear * (1 - prog(t, 4.9, 5.4, ease.salida));
		sh.visible = sheetMat.opacity > 0.01;
		// La tinta pasa a la cerámica de abajo arriba.
		const print = prog(t, 4.9, 6.8, ease.seda);
		mask.offset.y = lerp(0.56, -0.56, print);
		decalMat.opacity = Math.min(1, print * 3);
	});

	return (
		<group>
			<Backdrop inner='#f6f0e6' outer='#dcd1bf' z={-6} size={30} />
			<group ref={mug}>
				<MugBody rim />
				<mesh
					geometry={DECAL}
					material={decalMat}
					position={[0, 0.56, 0]}
					renderOrder={2}
				/>
				<mesh ref={sheet} geometry={SHEET} material={sheetMat} />
			</group>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
				<circleGeometry args={[2.2, 64]} />
				<meshStandardMaterial color='#e9e1d4' roughness={0.95} />
			</mesh>
			<ContactShadows
				position={[0, 0.002, 0]}
				scale={3}
				blur={2.2}
				opacity={0.45}
				far={1.4}
				resolution={QUALITY.shadowRes}
				frames={1}
				color='#1b1610'
			/>
		</group>
	);
}

/* =========================================================================================
 * 06 · Regalo — el pedido llega: unboxing al centro, bolsa y caja a los lados.
 * ======================================================================================= */
export function RegaloScene() {
	const sc = S.regalo;
	const main = useRef<Group>(null);
	const left = useRef<Group>(null);
	const right = useRef<Group>(null);
	useFrame(() => {
		const t = film.t - sc.start;
		const pm = prog(t, 0.2, 1.6, ease.seda);
		const ps = prog(t, 0.7, 2.1, ease.seda);
		if (main.current) {
			main.current.position.y = lerp(-0.9, -0.5, pm);
			fade(main.current, prog(t, 0.15, 0.9));
		}
		if (left.current) {
			left.current.position.x = lerp(-4.6, -3.55, ps);
			fade(left.current, prog(t, 0.6, 1.3));
		}
		if (right.current) {
			right.current.position.x = lerp(4.6, 3.55, ps);
			fade(right.current, prog(t, 0.6, 1.3));
		}
	});
	return (
		<group>
			<Backdrop inner='#f8f4ed' outer='#e6ddcf' z={-9} size={60} />
			<PhotoPlane
				ref={left}
				src='/escenas/bolsa-de-compra.jpg'
				width={2.2}
				height={2.9}
				position={[-3.55, -0.72, -1]}
				rotation={[0, 0.18, 0]}
			/>
			<PhotoPlane
				ref={main}
				src='/escenas/unboxing-empaque.jpg'
				width={4.4}
				height={2.46}
				position={[0, -0.5, 0]}
			/>
			<PhotoPlane
				ref={right}
				src='/escenas/regalo-corporativo.jpg'
				width={2.2}
				height={2.9}
				position={[3.55, -0.72, -1]}
				rotation={[0, -0.18, 0]}
			/>
		</group>
	);
}
