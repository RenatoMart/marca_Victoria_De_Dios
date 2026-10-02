import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import {
	CanvasTexture,
	ClampToEdgeWrapping,
	LinearFilter,
	type Mesh,
	type MeshBasicMaterial,
	SRGBColorSpace,
	TextureLoader,
} from 'three';
import { ease, film, lerp, prog } from '../timeline';

/** Lienzo de referencia del HUD: 1920 × 1080 px (origen arriba a la izquierda). */
export const HUD_W = 1920;
export const HUD_H = 1080;
const SCALE = 2; // supermuestreo para bordes nítidos

export interface Line {
	text: string;
	/** Peso/estilo CSS, p. ej. '300' o 'italic 400'. */
	weight: string;
	/** Familia CSS, p. ej. '"Jost"'. */
	family: string;
	size: number;
	color: string;
	tracking?: number;
	upper?: boolean;
	gap?: number;
}

interface Timing {
	/** Segundo en que empieza a revelarse. */
	in: number;
	/** Segundo en que empieza a desaparecer (omitir = se queda). */
	out?: number;
	revealDur?: number;
}

/** Máscara horizontal con borde suave: al desplazarla, el contenido se descubre de izquierda a derecha. */
function makeWipe() {
	const c = document.createElement('canvas');
	c.width = 256;
	c.height = 2;
	const ctx = c.getContext('2d')!;
	const g = ctx.createLinearGradient(0, 0, 256, 0);
	g.addColorStop(0, '#fff');
	g.addColorStop(0.42, '#fff');
	g.addColorStop(0.58, '#000');
	g.addColorStop(1, '#000');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 256, 2);
	const t = new CanvasTexture(c);
	t.wrapS = ClampToEdgeWrapping;
	return t;
}

/** Posición HUD (px desde arriba-izquierda) → coordenadas de la cámara ortográfica centrada. */
const toHud = (x: number, y: number): [number, number] => [
	x - HUD_W / 2,
	HUD_H / 2 - y,
];

function useReveal(
	mesh: React.RefObject<Mesh | null>,
	timing: Timing,
	baseY: number,
) {
	const wipe = useMemo(makeWipe, []);
	useEffect(() => () => wipe.dispose(), [wipe]);
	useFrame(() => {
		const m = mesh.current;
		if (!m) return;
		const t = film.t;
		const pIn = prog(
			t,
			timing.in,
			timing.in + (timing.revealDur ?? 1.1),
			ease.seda,
		);
		const pOut =
			timing.out === undefined
				? 0
				: prog(t, timing.out, timing.out + 0.5, ease.salida);
		const mat = m.material as MeshBasicMaterial;
		wipe.offset.x = lerp(0.6, -0.6, pIn);
		mat.opacity = 1 - pOut;
		m.position.y = baseY - (1 - pIn) * 14 + pOut * 8;
		m.visible = pIn > 0 && pOut < 1;
	});
	return wipe;
}

interface CaptionProps extends Timing {
	lines: Line[];
	/** Esquina de anclaje en px (1920 × 1080). */
	x: number;
	y: number;
	align?: 'left' | 'center';
}

/** Titular tipográfico dibujado en un lienzo (nítido y exportable) con revelado por máscara. */
export function Caption({
	lines,
	x,
	y,
	align = 'left',
	...timing
}: CaptionProps) {
	const mesh = useRef<Mesh>(null);
	const { texture, w, h } = useMemo(() => {
		const c = document.createElement('canvas');
		const ctx = c.getContext('2d')!;
		const setFont = (l: Line) => {
			ctx.font = `${l.weight} ${l.size * SCALE}px ${l.family}`;
			ctx.letterSpacing = `${(l.tracking ?? 0) * l.size * SCALE}px`;
		};
		let width = 0;
		let height = 0;
		const metrics = lines.map(l => {
			setFont(l);
			const text = l.upper ? l.text.toUpperCase() : l.text;
			const lw = ctx.measureText(text).width;
			width = Math.max(width, lw);
			const lh = l.size * SCALE * 1.18;
			height += lh + (l.gap ?? 0) * SCALE;
			return { text, lh };
		});
		c.width = Math.ceil(width + 8);
		c.height = Math.ceil(height + 8);
		let yy = 0;
		lines.forEach((l, i) => {
			setFont(l);
			ctx.fillStyle = l.color;
			ctx.textBaseline = 'top';
			ctx.textAlign = align === 'center' ? 'center' : 'left';
			ctx.fillText(
				metrics[i].text,
				align === 'center' ? c.width / 2 : 2,
				yy + 2,
			);
			yy += metrics[i].lh + (l.gap ?? 0) * SCALE;
		});
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		tex.minFilter = LinearFilter;
		tex.generateMipmaps = false;
		return { texture: tex, w: c.width / SCALE, h: c.height / SCALE };
	}, [lines, align]);
	useEffect(() => () => texture.dispose(), [texture]);

	const [hx, hy] = toHud(align === 'center' ? x : x + w / 2, y + h / 2);
	const wipe = useReveal(mesh, timing, hy);

	return (
		<mesh ref={mesh} position={[hx, hy, 1]}>
			<planeGeometry args={[w, h]} />
			<meshBasicMaterial
				map={texture}
				alphaMap={wipe}
				transparent
				toneMapped={false}
				depthTest={false}
			/>
		</mesh>
	);
}

interface MarkProps extends Timing {
	src: string;
	color: string;
	width: number;
	ratio: number;
	x: number;
	y: number;
}

/** Logotipo real (máscara PNG) teñido de un color de marca, con el mismo revelado. */
export function MarkImage({
	src,
	color,
	width,
	ratio,
	x,
	y,
	...timing
}: MarkProps) {
	const mesh = useRef<Mesh>(null);
	const tex = useLoader(TextureLoader, src);
	tex.colorSpace = SRGBColorSpace;
	const h = width / ratio;
	const [hx, hy] = toHud(x, y + h / 2);
	const wipe = useReveal(mesh, timing, hy);
	return (
		<mesh ref={mesh} position={[hx, hy, 1]}>
			<planeGeometry args={[width, h]} />
			<meshBasicMaterial
				map={tex}
				color={color}
				alphaMap={wipe}
				transparent
				toneMapped={false}
				depthTest={false}
			/>
		</mesh>
	);
}
