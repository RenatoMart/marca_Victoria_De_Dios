import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import {
	DirectionalLight,
	Group,
	LatheGeometry,
	MathUtils,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	PointLight,
	TextureLoader,
	TorusGeometry,
	Vector2,
} from 'three';
import { damp } from '../../motion/tokens';
import CameraRig, { SHOTS, mix, type Shot } from './CameraRig';
import { maskTextures, paperGrain } from './masks';
import { rig } from './rig';
import { useStudioEnvironment } from './StudioEnvironment';
import { QUALITY } from './webgl';

/* ---------- Geometría (una sola vez) ---------- */
const R = 1.5; // radio del sello
const T = 0.07; // medio grosor
const PROFILE = [
	[0, -T],
	[R - 0.07, -T],
	[R - 0.02, -T + 0.012],
	[R, -T + 0.05],
	[R, T - 0.05],
	[R - 0.02, T - 0.012],
	[R - 0.07, T],
	[0, T],
].map(([x, y]) => new Vector2(x, y));
const PUCK = new LatheGeometry(PROFILE, 128);
const BEAD = new TorusGeometry(R - 0.17, 0.011, 8, 160);

/** Plano de producto con teleobjetivo: comprime la profundidad como una cámara de estudio. */
const shotFor = (): Shot => {
	if (!rig.entered) return SHOTS.sealEnter;
	const t = MathUtils.smoothstep(rig.scroll, 0, 1);
	return {
		pos: mix(SHOTS.sealHero.pos, SHOTS.sealExit.pos, t),
		target: mix(SHOTS.sealHero.target, SHOTS.sealExit.target, t),
	};
};

function Seal() {
	const invalidate = useThree(s => s.invalidate);
	const group = useRef<Group>(null);
	const glint = useRef<PointLight>(null);
	const key = useRef<DirectionalLight>(null);
	const lit = useRef(0);
	const pointer = useRef({ x: 0, y: 0 });

	const [goldImg, navyImg] = useLoader(TextureLoader, [
		'/brand/isologo-mask-gold.png',
		'/brand/isologo-mask-navy.png',
	]).map(t => t.image);

	const res = useMemo(() => {
		const gold = maskTextures(goldImg, QUALITY.bumpDetail, 3);
		const navy = maskTextures(navyImg, QUALITY.bumpDetail, 2);
		const grain = paperGrain();
		const mats = {
			// Soporte: algodón marfil con un velo de laca.
			puck: new MeshPhysicalMaterial({
				color: '#ece6da',
				roughness: 0.62,
				bumpMap: grain,
				bumpScale: 0.12,
				clearcoat: 0.25,
				clearcoatRoughness: 0.5,
				sheen: 0.4,
				sheenColor: '#fff8ea',
			}),
			// Tinta azul: mate, sin brillo.
			ink: new MeshStandardMaterial({
				color: '#1f2a3e',
				map: navy.color,
				roughness: 0.55,
				alphaTest: 0.4,
				alphaToCoverage: QUALITY.antialias,
				polygonOffset: true,
				polygonOffsetFactor: -1,
			}),
			// Foil dorado: metal con relieve, es lo que atrapa la luz.
			foil: new MeshStandardMaterial({
				color: '#bf9c55',
				map: gold.color,
				metalness: 1,
				roughness: 0.27,
				bumpMap: gold.height,
				bumpScale: 2.2,
				alphaTest: 0.4,
				alphaToCoverage: QUALITY.antialias,
				polygonOffset: true,
				polygonOffsetFactor: -2,
			}),
			bead: new MeshStandardMaterial({ color: '#c9a45a', metalness: 1, roughness: 0.3 }),
		};
		return { gold, navy, grain, mats };
	}, [goldImg, navyImg]);

	useEffect(
		() => () => {
			res.gold.color.dispose();
			res.gold.height.dispose();
			res.navy.color.dispose();
			res.navy.height.dispose();
			res.grain.dispose();
			Object.values(res.mats).forEach(m => m.dispose());
		},
		[res],
	);

	useFrame((_, dt) => {
		const g = group.current;
		if (!g) return;
		const d = Math.min(dt, 1 / 30);
		const reduced = rig.reduced;

		// «Se encienden las luces»: de 0 a 1 cuando el revelado de marca termina.
		const goalLit = rig.entered ? 1 : 0;
		lit.current = reduced ? goalLit : MathUtils.damp(lit.current, goalLit, 2.2, d);

		pointer.current.x = MathUtils.damp(pointer.current.x, reduced ? 0 : rig.px, damp.pointer, d);
		pointer.current.y = MathUtils.damp(pointer.current.y, reduced ? 0 : rig.py, damp.pointer, d);

		// El objeto casi no se mueve: lo que se mueve es la cámara. Solo un cabeceo mínimo.
		g.rotation.y = pointer.current.x * 0.07;
		g.rotation.x = pointer.current.y * 0.045;
		g.scale.setScalar(0.965 + 0.035 * lit.current);

		// Brillo que recorre el foil con el scroll y el puntero (la luz «pasa» por la pieza).
		const sweep = MathUtils.lerp(-3.2, 3.4, MathUtils.clamp(rig.scroll * 1.2, 0, 1));
		if (glint.current) {
			glint.current.position.x = sweep + pointer.current.x * 1.6;
			glint.current.position.y = 1.2 - pointer.current.y * 0.8;
			glint.current.intensity = 16 * lit.current;
		}
		if (key.current) key.current.intensity = 1.9 * lit.current;

		const settling =
			Math.abs(lit.current - goalLit) > 1e-3 ||
			Math.abs(pointer.current.x - (reduced ? 0 : rig.px)) > 1e-3 ||
			Math.abs(pointer.current.y - (reduced ? 0 : rig.py)) > 1e-3;
		if (settling) invalidate();
	});

	// Cada vez que el scroll cambia, la luz debe repintar aunque nada más se mueva.
	useEffect(() => rig.register(invalidate), [invalidate]);

	const w = 2.2;
	const h = w * res.gold.aspect;
	return (
		<>
			<group ref={group}>
				{/* El cilindro de Lathe se orienta con su eje en Y: se gira para que la cara mire a cámara (+z). */}
				<mesh geometry={PUCK} material={res.mats.puck} rotation={[Math.PI / 2, 0, 0]} />
				<mesh geometry={BEAD} material={res.mats.bead} position={[0, 0, T + 0.002]} />
				<mesh position={[0, 0.06, T + 0.004]} material={res.mats.ink}>
					<planeGeometry args={[w, h]} />
				</mesh>
				<mesh position={[0, 0.06, T + 0.012]} material={res.mats.foil}>
					<planeGeometry args={[w, h]} />
				</mesh>
			</group>
			<ambientLight intensity={0.22} color='#f4ede1' />
			<directionalLight ref={key} position={[-4, 4.5, 5]} intensity={0} color='#fff7ea' />
			<directionalLight position={[4.5, 2.5, -3]} intensity={0.6} color='#d6e0f4' />
			<pointLight ref={glint} position={[-3, 1.2, 2.6]} intensity={0} distance={9} decay={1.6} color='#fff1d6' />
		</>
	);
}

export default function SealStage() {
	useStudioEnvironment(0.8);
	return (
		<>
			<CameraRig shot={shotFor} parallax={0.3} />
			<Seal />
		</>
	);
}
