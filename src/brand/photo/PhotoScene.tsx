import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import Mark, {
	MARK_MASK,
	MARK_RATIO,
	type Finish,
	type MarkKind,
} from '../Mark';
import './PhotoScene.css';

type Pt = [number, number];

/**
 * Una aplicación del logo sobre la foto. Coordenadas en % del lienzo 4:3
 * (x: 0–100 a lo ancho, y: 0–100 a lo alto).
 */
export interface Application {
	kind?: MarkKind;
	/** Colocación frontal: centro (x, y) y ancho w, en %; rotate en grados. */
	x?: number;
	y?: number;
	w?: number;
	rotate?: number;
	/** Colocación en perspectiva: esquinas del logo TL, TR, BR, BL en %. Tiene prioridad. */
	quad?: [Pt, Pt, Pt, Pt];
	primary?: string;
	accent?: string;
	mono?: string;
	finish?: Finish;
	/** Cómo se funde con la foto: multiply para tinta sobre soportes claros, normal/screen para foil, etc. */
	blend?: CSSProperties['mixBlendMode'];
	opacity?: number;
	/** Gradiente de sombreado aplicado solo sobre el logo (curvatura, pliegues, luz). */
	shade?: string;
}

const BASE = 1000; // ancho interno del logo antes de transformar (px)

/** Homografía que lleva el rectángulo (0,0)-(w,h) al cuadrilátero q, como matrix3d CSS. */
function homography(w: number, h: number, q: [Pt, Pt, Pt, Pt]): string {
	const src: Pt[] = [
		[0, 0],
		[w, 0],
		[w, h],
		[0, h],
	];
	const A: number[][] = [];
	const b: number[] = [];
	for (let i = 0; i < 4; i++) {
		const [x, y] = src[i];
		const [u, v] = q[i];
		A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
		b.push(u);
		A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
		b.push(v);
	}
	// Eliminación gaussiana con pivoteo parcial
	for (let c = 0; c < 8; c++) {
		let p = c;
		for (let r = c + 1; r < 8; r++)
			if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
		[A[c], A[p]] = [A[p], A[c]];
		[b[c], b[p]] = [b[p], b[c]];
		for (let r = 0; r < 8; r++) {
			if (r === c) continue;
			const f = A[r][c] / A[c][c];
			for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
			b[r] -= f * b[c];
		}
	}
	const [a, bb, c, d, e, f, g, hh] = b.map((v, i) => v / A[i][i]);
	// Sin perspectiva real: transformación 2D (evita capas 3D que Chrome a veces no pinta con máscaras)
	if (Math.abs(g) < 1e-7 && Math.abs(hh) < 1e-7)
		return `matrix(${[a, d, bb, e, c, f].join(',')})`;
	return `matrix3d(${[a, d, 0, g, bb, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1].join(',')})`;
}

function quadOf(app: Application, ratio: number): [Pt, Pt, Pt, Pt] {
	if (app.quad) return app.quad;
	const { x = 50, y = 50, w = 20, rotate = 0 } = app;
	// alto en % del lienzo 4:3: (w% de ancho → px) / ratio → % de alto
	const h = (w * 4) / 3 / ratio;
	const rad = (rotate * Math.PI) / 180;
	const cos = Math.cos(rad);
	const sin = Math.sin(rad);
	const pt = (dx: number, dy: number): Pt => {
		// rotar en espacio de píxeles (x en unidades de ancho, y en unidades de alto*3/4)
		const px = dx;
		const py = (dy * 3) / 4;
		return [x + px * cos - py * sin, y + ((px * sin + py * cos) * 4) / 3];
	};
	return [
		pt(-w / 2, -h / 2),
		pt(w / 2, -h / 2),
		pt(w / 2, h / 2),
		pt(-w / 2, h / 2),
	];
}

function Applied({
	app,
	size,
}: {
	app: Application;
	size: { w: number; h: number };
}) {
	const kind = app.kind ?? 'isologo';
	const ratio = MARK_RATIO[kind];
	const bw = BASE;
	const bh = BASE / ratio;
	const q = quadOf(app, ratio).map(([x, y]) => [
		(x / 100) * size.w,
		(y / 100) * size.h,
	]) as [Pt, Pt, Pt, Pt];
	const mask = `url(${MARK_MASK[kind]})`;
	return (
		<div
			className='vd-photo__app'
			style={{
				width: bw,
				height: bh,
				transform: homography(bw, bh, q),
				mixBlendMode: app.blend ?? 'normal',
				opacity: app.opacity ?? 1,
			}}
		>
			<Mark
				kind={kind}
				primary={app.primary}
				accent={app.accent}
				mono={app.mono}
				finish={app.finish}
				width='100%'
			/>
			{app.shade && (
				<span
					className='vd-photo__shade'
					style={{
						background: app.shade,
						WebkitMaskImage: mask,
						maskImage: mask,
					}}
				/>
			)}
		</div>
	);
}

interface PhotoSceneProps {
	src: string;
	apps: Application[];
	alt: string;
}

/** Foto de producto 4:3 con el logo real aplicado encima. */
export function PhotoScene({ src, apps, alt }: PhotoSceneProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ w: 0, h: 0 });
	const hasApps = apps.length > 0;

	// Solo las fotos con logo superpuesto necesitan medir el lienzo.
	useLayoutEffect(() => {
		const el = ref.current;
		if (!el || !hasApps) return;
		const ro = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setSize(prev =>
				Math.abs(prev.w - width) < 0.5 && Math.abs(prev.h - height) < 0.5
					? prev
					: { w: width, h: height },
			);
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, [hasApps]);

	const small = src.replace('/mockups/', '/mockups/800/');
	return (
		<div ref={ref} className='vd-photo'>
			<img
				src={small}
				srcSet={`${small} 800w, ${src} 1600w`}
				sizes='auto, (max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px'
				width={1600}
				height={1200}
				alt={alt}
				loading='lazy'
			/>
			{size.w > 0 &&
				apps.map((app, i) => <Applied key={i} app={app} size={size} />)}
		</div>
	);
}

/** Crea el componente de escena para un MockupItem. */
export function photo(src: string, alt: string, apps: Application[]) {
	const C = () => <PhotoScene src={src} alt={alt} apps={apps} />;
	C.displayName = `Photo(${alt})`;
	return C;
}
