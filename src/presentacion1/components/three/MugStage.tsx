import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import {
	CanvasTexture,
	Color,
	CylinderGeometry,
	DoubleSide,
	Group,
	LatheGeometry,
	MathUtils,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	PointLight,
	SRGBColorSpace,
	TextureLoader,
	TorusGeometry,
	Vector2,
	type DirectionalLight,
} from 'three';
import { damp } from '../../motion/tokens';
import CameraRig, { SHOTS } from './CameraRig';
import { DECAL_H, DECAL_W, MUG_TONES, drawDesign } from './designs';
import { rig } from './rig';
import { useStudioEnvironment } from './StudioEnvironment';

/* ---------- Geometría compartida ---------- */
const PROFILE = [
	[0, 0], [0.44, 0], [0.49, 0.03], [0.5, 0.08], [0.5, 1.05],
	[0.495, 1.1], [0.475, 1.115], [0.455, 1.1], [0.455, 0.1], [0, 0.1],
].map(([x, y]) => new Vector2(x, y));
const BODY = new LatheGeometry(PROFILE, 96);
const HANDLE = new TorusGeometry(0.27, 0.055, 24, 64, Math.PI);
const RIM = new TorusGeometry(0.475, 0.008, 8, 96);
const ARC = 2.0;
const DECAL = new CylinderGeometry(0.503, 0.503, 0.6, 72, 1, true, -ARC / 2, ARC);
const PLINTH = new LatheGeometry(
	[[0, -0.24], [1.22, -0.24], [1.27, -0.2], [1.28, -0.04], [1.26, 0], [0, 0]].map(([x, y]) => new Vector2(x, y)),
	96,
);

/** Sombra de contacto: un degradado radial bajo la taza, sin mapas de sombras. */
function useBlobShadow() {
	return useMemo(() => {
		const c = document.createElement('canvas');
		c.width = c.height = 128;
		const ctx = c.getContext('2d')!;
		const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
		g.addColorStop(0, 'rgba(0,0,0,.55)');
		g.addColorStop(0.55, 'rgba(0,0,0,.22)');
		g.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 128, 128);
		return new CanvasTexture(c);
	}, []);
}

/** Máscara vertical con borde suave: al desplazarla, la impresión «sube» como en la prensa. */
function useRevealMask() {
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
		t.offset.y = 0.5;
		return t;
	}, []);
}

const k = (lambda: number, dt: number) => (rig.reduced ? 1 : 1 - Math.exp(-lambda * Math.min(dt, 1 / 30)));

function Mug({ fontsReady }: { fontsReady: boolean }) {
	const invalidate = useThree(s => s.invalidate);
	const group = useRef<Group>(null);
	const sweep = useRef<PointLight>(null);
	const reveal = useRef(0);
	const lastPrint = useRef(0);
	const pointer = useRef(0);

	const [logoColor, logoMask] = useLoader(TextureLoader, [
		'/brand/isologo-color.png',
		'/brand/isologo-mask.png',
	]).map(t => t.image);

	const canvas = useMemo(() => {
		const c = document.createElement('canvas');
		c.width = DECAL_W;
		c.height = DECAL_H;
		return c;
	}, []);
	const decalTex = useMemo(() => {
		const t = new CanvasTexture(canvas);
		t.colorSpace = SRGBColorSpace;
		t.anisotropy = 4;
		return t;
	}, [canvas]);
	const mask = useRevealMask();
	const shadow = useBlobShadow();

	const mats = useMemo(
		() => ({
			ceramic: new MeshPhysicalMaterial({
				color: MUG_TONES.marfil.body,
				roughness: 0.3,
				clearcoat: 0.75,
				clearcoatRoughness: 0.16,
				side: DoubleSide,
			}),
			decal: new MeshStandardMaterial({
				map: decalTex,
				alphaMap: mask,
				transparent: true,
				roughness: 0.35,
				depthWrite: false,
			}),
			rim: new MeshStandardMaterial({ color: '#c9a45a', metalness: 1, roughness: 0.3 }),
			plinth: new MeshStandardMaterial({ color: '#cdc6b9', roughness: 0.9 }),
			shadow: new MeshStandardMaterial({ map: shadow, transparent: true, depthWrite: false, color: '#000' }),
		}),
		[decalTex, mask, shadow],
	);

	// Repinta el diseño cuando cambia la elección (o cuando las tipografías de marca terminan de cargar).
	const target = useRef(new Color(MUG_TONES.marfil.body));
	useEffect(() => {
		const redraw = () => {
			const { design, text, color } = rig.mug;
			drawDesign(canvas, design, text, color, { logoColor, logoMask });
			decalTex.needsUpdate = true;
			target.current.set(MUG_TONES[color].body);
			invalidate();
		};
		redraw();
		return rig.onMugChange(redraw);
		// fontsReady fuerza un repintado al llegar Cinzel / Cormorant.
	}, [canvas, decalTex, logoColor, logoMask, invalidate, fontsReady]);

	useEffect(
		() => () => {
			decalTex.dispose();
			mask.dispose();
			shadow.dispose();
			Object.values(mats).forEach(m => m.dispose());
		},
		[decalTex, mask, shadow, mats],
	);

	useFrame((_, dt) => {
		const g = group.current;
		if (!g) return;
		const m = rig.mug;
		const reduced = rig.reduced;
		const d = Math.min(dt, 1 / 30);

		if (m.printedAt !== lastPrint.current) {
			lastPrint.current = m.printedAt;
			reveal.current = 0; // reimprimir: la prensa vuelve a empezar desde abajo
		}

		// Producto: muestra el asa en liso y se pone de frente al personalizar. Pocos grados.
		pointer.current = MathUtils.damp(pointer.current, reduced ? 0 : rig.px, damp.pointer, d);
		const yaw = (m.stage === 'plain' ? -0.62 : -0.1) + pointer.current * 0.1;
		g.rotation.y = MathUtils.lerp(g.rotation.y, yaw, k(damp.object * 0.6, dt));

		mats.ceramic.color.lerp(target.current, k(7, dt));

		const printed = m.stage === 'printed';
		const wantReveal = printed ? 1 : m.stage === 'preview' ? 1 : 0;
		reveal.current = MathUtils.lerp(
			reveal.current,
			wantReveal,
			printed ? k(1.9, dt) : k(8, dt),
		);
		mask.offset.y = MathUtils.lerp(0.56, -0.56, reveal.current);
		const ghost = m.stage === 'preview' ? 0.26 : 1;
		mats.decal.opacity = MathUtils.lerp(mats.decal.opacity, m.stage === 'plain' ? 0 : ghost, k(8, dt));
		mats.decal.visible = mats.decal.opacity > 0.01;

		// Destello de la prensa: la luz sube con la impresión.
		if (sweep.current) {
			const active = printed && reveal.current < 0.985;
			sweep.current.position.y = MathUtils.lerp(0.1, 1.3, reveal.current);
			sweep.current.intensity = MathUtils.lerp(sweep.current.intensity, active ? 5 : 0, k(10, dt));
		}

		const settling =
			Math.abs(g.rotation.y - yaw) > 1e-3 ||
			Math.abs(reveal.current - wantReveal) > 1e-3 ||
			Math.abs(mats.decal.opacity - (m.stage === 'plain' ? 0 : ghost)) > 1e-3 ||
			Math.abs(mats.ceramic.color.r - target.current.r) + Math.abs(mats.ceramic.color.g - target.current.g) + Math.abs(mats.ceramic.color.b - target.current.b) > 2e-3 ||
			Math.abs(pointer.current - (reduced ? 0 : rig.px)) > 1e-3 ||
			(sweep.current?.intensity ?? 0) > 0.02;
		if (settling) invalidate();
	});

	return (
		<>
			<mesh geometry={PLINTH} material={mats.plinth} />
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]} material={mats.shadow}>
				<planeGeometry args={[1.9, 1.9]} />
			</mesh>
			<group ref={group}>
				<mesh geometry={BODY} material={mats.ceramic} />
				<mesh geometry={HANDLE} material={mats.ceramic} position={[0.47, 0.58, 0]} rotation={[0, 0, -Math.PI / 2]} />
				<mesh geometry={RIM} material={mats.rim} position={[0, 1.112, 0]} rotation={[Math.PI / 2, 0, 0]} />
				<mesh geometry={DECAL} material={mats.decal} position={[0, 0.56, 0]} renderOrder={2} />
			</group>
			<pointLight ref={sweep} position={[0, 0.2, 1.6]} intensity={0} distance={5} decay={1.4} color='#ffe6bd' />
		</>
	);
}

function Lights() {
	const key = useRef<DirectionalLight>(null);
	const invalidate = useThree(s => s.invalidate);
	useFrame((_, dt) => {
		const l = key.current;
		if (!l) return;
		// Hover: la luz principal se acerca y sube un punto, como si el fotógrafo ajustara el softbox.
		const goalI = rig.hover ? 2.7 : 2.1;
		const goalX = rig.hover ? -2.6 : -4;
		const kk = k(damp.light, dt);
		l.intensity = MathUtils.lerp(l.intensity, goalI, kk);
		l.position.x = MathUtils.lerp(l.position.x, goalX, kk);
		if (Math.abs(l.intensity - goalI) > 1e-3) invalidate();
	});
	return (
		<>
			<ambientLight intensity={0.3} color='#f4ede1' />
			<directionalLight ref={key} position={[-4, 5, 3.5]} intensity={2.1} color='#fff1dc' />
			<directionalLight position={[4, 3, -4]} intensity={0.7} color='#d9e1f2' />
		</>
	);
}

const shot = () => (rig.hover ? SHOTS.mugHover : SHOTS.mug);

export default function MugStage() {
	useStudioEnvironment(0.85);
	const [fontsReady, setFontsReady] = useState(false);
	useEffect(() => {
		let on = true;
		void Promise.all([
			document.fonts.load('600 80px "Cormorant Garamond"'),
			document.fonts.load('500 80px Cinzel'),
		])
			.catch(() => undefined)
			.then(() => on && setFontsReady(true));
		return () => {
			on = false;
		};
	}, []);
	return (
		<>
			<CameraRig shot={shot} parallax={0.16} />
			<Lights />
			<Mug fontsReady={fontsReady} />
		</>
	);
}
