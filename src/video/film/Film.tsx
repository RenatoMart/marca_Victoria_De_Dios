import { Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Hud, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useStudioEnvironment } from '../../universo/three/LightingRig';
import { DURATION, film, SCENES } from '../timeline';
import { SceneCopy } from './Copy';
import { Director, Vignette, Wipe } from './Director';
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

function ActiveScene({ index }: { index: number }) {
	switch (SCENES[index].id) {
		case 'apertura':
			return <SealScene which='apertura' />;
		case 'universo':
			return <UniverseScene />;
		case 'hogar':
			return <HogarScene />;
		case 'estilo':
			return <EstiloScene />;
		case 'personalizados':
			return <CustomScene />;
		case 'regalo':
			return <RegaloScene />;
		case 'cierre':
			return <SealScene which='cierre' />;
	}
}

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
}

/** El anuncio completo en un solo canvas WebGL (3D + tipografía + cortinillas): se puede exportar. */
export default function Film({ width, height, playing }: Props) {
	const [index, setIndex] = useState(0);
	return (
		<Canvas
			className='vd-film-canvas'
			style={{ width, height }}
			resize={{ offsetSize: true }}
			dpr={1}
			frameloop={playing ? 'always' : 'demand'}
			gl={{
				antialias: true,
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
			<Director onScene={setIndex} />
			<Suspense fallback={null}>
				<ActiveScene index={index} />
			</Suspense>
			<Hud renderPriority={1}>
				<OrthographicCamera makeDefault position={[0, 0, 100]} zoom={1} />
				<HudContent index={index} />
			</Hud>
		</Canvas>
	);
}
