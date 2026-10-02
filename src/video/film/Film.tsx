import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Hud, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import {
	Object3D,
	type AmbientLight,
	type DirectionalLight,
	type Group,
	type PointLight,
	type SpotLight,
} from 'three';
import { useStudioEnvironment } from '../../universo/three/LightingRig';
import Precompile from '../../universo/three/Precompile';
import { QUALITY } from '../../universo/quality';
import {
	DURATION,
	ease,
	film,
	lerp,
	prog,
	SCENES,
	sceneIndexAt,
} from '../timeline';
import { SceneCopy } from './Copy';
import { Director, SCENE_GAP, Vignette, Wipe } from './Director';
import { HUD_W } from './Caption';
import {
	CustomScene,
	EstiloScene,
	HogarScene,
	RegaloScene,
	SealScene,
	UniverseScene,
} from './scenes';

/** Avanza el reloj del video a partir del reloj maestro (el del audio). */
function Clock() {
	useFrame(() => {
		if (!film.playing || !film.now) return;
		film.t = Math.min(DURATION, film.now());
		if (film.t >= DURATION) {
			film.playing = false;
			film.onEnd?.();
		}
	}, -1);
	return null;
}

/** Pide un fotograma cuando el reproductor salta a otro momento estando en pausa. */
function SeekBridge() {
	const invalidate = useThree(s => s.invalidate);
	film.invalidate = invalidate;
	return null;
}

function Environment() {
	useStudioEnvironment();
	return null;
}

/**
 * Iluminación única para todo el video. Siempre existen las mismas luces (solo cambia su
 * intensidad y posición): así los shaders nunca se recompilan a mitad de la reproducción.
 */
function FilmLights() {
	const amb = useRef<AmbientLight>(null);
	const key = useRef<DirectionalLight>(null);
	const rim = useRef<DirectionalLight>(null);
	const spot = useRef<SpotLight>(null);
	const heat = useRef<PointLight>(null);
	const keyTarget = useMemo(() => new Object3D(), []);
	const spotTarget = useMemo(() => new Object3D(), []);

	useFrame(() => {
		const t = Math.min(film.t, DURATION - 1e-3);
		const i = sceneIndexAt(t);
		const sc = SCENES[i];
		const local = t - sc.start;
		const off = i * SCENE_GAP;
		const dark = sc.id === 'apertura' || sc.id === 'cierre';
		if (
			!amb.current ||
			!key.current ||
			!rim.current ||
			!spot.current ||
			!heat.current
		)
			return;

		keyTarget.position.set(off, 0.4, 0);
		keyTarget.updateMatrixWorld();
		amb.current.intensity = dark ? 0.06 : 0.28;
		key.current.position.set(off - 4, 5, 3.5);
		key.current.intensity = dark ? 0 : 2.1;
		rim.current.position.set(off + 4, 3, -4);
		rim.current.intensity = dark ? 0 : 0.75;

		// Haz que descubre el sello en foil (apertura y cierre).
		spotTarget.position.set(off, 0.6, 0);
		spotTarget.updateMatrixWorld();
		const sweep = prog(local, 0.3, 3.4, ease.ceremonia);
		spot.current.position.set(off + lerp(-6, 2.2, sweep), 2.4, 4);
		spot.current.intensity = dark
			? lerp(0, 160, prog(local, 0.2, 1.4, ease.seda))
			: 0;

		// Destello de calor de la prensa de sublimación.
		heat.current.position.set(off + 0.3, 0.6, 1.4);
		heat.current.intensity =
			sc.id === 'personalizados'
				? 7 * Math.sin(Math.PI * prog(local, 4.55, 5.5, ease.suave))
				: 0;
	});

	return (
		<>
			<primitive object={keyTarget} />
			<primitive object={spotTarget} />
			<ambientLight ref={amb} intensity={0.28} color='#f4ede1' />
			<directionalLight
				ref={key}
				target={keyTarget}
				intensity={2.1}
				color='#fff1dc'
			/>
			<directionalLight
				ref={rim}
				target={keyTarget}
				intensity={0.75}
				color='#d9e1f2'
			/>
			<spotLight
				ref={spot}
				target={spotTarget}
				angle={0.5}
				penumbra={0.9}
				distance={0}
				decay={2}
				intensity={0}
				color='#fff2dc'
			/>
			<pointLight
				ref={heat}
				color='#ffae63'
				intensity={0}
				distance={4}
				decay={2}
			/>
		</>
	);
}

const SCENE_COMPONENTS = [
	<SealScene key='apertura' which='apertura' />,
	<UniverseScene key='universo' />,
	<HogarScene key='hogar' />,
	<EstiloScene key='estilo' />,
	<CustomScene key='personalizados' />,
	<RegaloScene key='regalo' />,
	<SealScene key='cierre' which='cierre' />,
];

/** El HUD trabaja en píxeles de un lienzo 1920 × 1080, sea cual sea la resolución interna. */
function HudContent({ index }: { index: number }) {
	const width = useThree(s => s.size.width);
	const s = width / HUD_W;
	return (
		<group scale={[s, s, 1]}>
			<Suspense fallback={null}>
				<SceneCopy id={SCENES[index].id} />
			</Suspense>
			<Vignette />
			<Wipe />
		</group>
	);
}

interface Props {
	width: number;
	height: number;
	playing: boolean;
	/** Se llama cuando todo está cargado y los shaders compilados. */
	onReady: () => void;
}

/**
 * El anuncio completo en un solo canvas WebGL (3D + tipografía + cortinillas): se puede exportar.
 * Todas las escenas quedan montadas y precompiladas desde el inicio; la cámara solo enseña la activa.
 */
export default function Film({ width, height, playing, onReady }: Props) {
	const [index, setIndex] = useState(0);
	const groups = useRef<(Group | null)[]>([]);
	const warm = useRef(false);
	const ready = useMemo(
		() => () => {
			warm.current = true;
			film.invalidate();
			onReady();
		},
		[onReady],
	);

	return (
		<Canvas
			className='vd-film-canvas'
			style={{ width, height }}
			resize={{ offsetSize: true }}
			dpr={1}
			frameloop={playing ? 'always' : 'demand'}
			gl={{
				antialias: QUALITY.antialias,
				preserveDrawingBuffer: true,
				powerPreference: 'high-performance',
			}}
		>
			<PerspectiveCamera
				makeDefault
				fov={30}
				near={0.1}
				far={80}
				position={[0, 0.2, 7.6]}
			/>
			<Clock />
			<SeekBridge />
			<Environment />
			<FilmLights />
			<Director onScene={setIndex} groups={groups} warm={warm} />
			<Suspense fallback={null}>
				{SCENE_COMPONENTS.map((el, i) => (
					<group
						key={i}
						position={[i * SCENE_GAP, 0, 0]}
						ref={g => {
							groups.current[i] = g;
						}}
					>
						{el}
					</group>
				))}
				<Precompile onReady={ready} />
			</Suspense>
			<Hud renderPriority={1}>
				<OrthographicCamera makeDefault position={[0, 0, 100]} zoom={1} />
				<HudContent index={index} />
			</Hud>
		</Canvas>
	);
}
