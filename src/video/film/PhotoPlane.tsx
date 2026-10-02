import { forwardRef, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { SRGBColorSpace, TextureLoader, type Group, type Texture } from 'three';

/** Ajusta la textura como `object-fit: cover` para la proporción del plano. */
function cover(tex: Texture, planeAspect: number) {
	const img = tex.image as { width: number; height: number };
	const imgAspect = img.width / img.height;
	const t = tex.clone();
	t.colorSpace = SRGBColorSpace;
	if (imgAspect > planeAspect) {
		t.repeat.set(planeAspect / imgAspect, 1);
		t.offset.set((1 - t.repeat.x) / 2, 0);
	} else {
		t.repeat.set(1, imgAspect / planeAspect);
		t.offset.set(0, (1 - t.repeat.y) / 2);
	}
	t.needsUpdate = true;
	return t;
}

interface Props {
	src: string;
	width: number;
	height: number;
	/** Margen de papel alrededor de la foto (unidades de escena). */
	border?: number;
	alphaMap?: Texture;
	position?: [number, number, number];
	rotation?: [number, number, number];
}

/**
 * Fotografía de producto como una impresión física: papel marfil con margen y una sombra suave.
 * Las fotos ya vienen iluminadas, así que no reciben luz de la escena (toneMapped: false).
 */
const PhotoPlane = forwardRef<Group, Props>(function PhotoPlane(
	{ src, width, height, border = 0.05, alphaMap, position, rotation },
	ref,
) {
	const base = useLoader(TextureLoader, src);
	const tex = useMemo(() => cover(base, width / height), [base, width, height]);
	return (
		<group ref={ref} position={position} rotation={rotation}>
			<mesh position={[0.05, -0.07, -0.02]}>
				<planeGeometry
					args={[width + border * 2 + 0.06, height + border * 2 + 0.06]}
				/>
				<meshBasicMaterial
					color='#1b1610'
					transparent
					opacity={0.16}
					toneMapped={false}
					alphaMap={alphaMap}
					depthWrite={false}
				/>
			</mesh>
			<mesh position={[0, 0, -0.01]}>
				<planeGeometry args={[width + border * 2, height + border * 2]} />
				<meshBasicMaterial
					color='#faf7f1'
					toneMapped={false}
					transparent
					alphaMap={alphaMap}
				/>
			</mesh>
			<mesh>
				<planeGeometry args={[width, height]} />
				<meshBasicMaterial
					map={tex}
					toneMapped={false}
					transparent
					alphaMap={alphaMap}
				/>
			</mesh>
		</group>
	);
});

export default PhotoPlane;
