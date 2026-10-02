/**
 * Línea de tiempo del anuncio. Todo el video es una función pura de `t` (segundos):
 * se puede pausar, saltar a cualquier punto y exportar fotograma a fotograma.
 */
export const SCENES = [
	{ id: 'apertura', label: 'Apertura', start: 0, end: 5.5, bg: '#0e1320' },
	{ id: 'universo', label: 'Universo', start: 5.5, end: 11, bg: '#e6ddce' },
	{ id: 'hogar', label: 'Hogar', start: 11, end: 18, bg: '#f1ece3' },
	{ id: 'estilo', label: 'Estilo de vida', start: 18, end: 25, bg: '#ebe3d6' },
	{
		id: 'personalizados',
		label: 'Hazlo tuyo',
		start: 25,
		end: 34,
		bg: '#e6ddce',
	},
	{ id: 'regalo', label: 'Regalo', start: 34, end: 40, bg: '#f1ece3' },
	{ id: 'cierre', label: 'Cierre', start: 40, end: 48, bg: '#0e1320' },
] as const;

export type SceneId = (typeof SCENES)[number]['id'];
export const DURATION = SCENES[SCENES.length - 1].end;
/** Duración de cada mitad de la cortinilla entre escenas. */
export const WIPE = 0.42;

/** Reloj compartido entre el reproductor (DOM) y el render (WebGL), sin re-renders de React. */
export const film: {
	t: number;
	playing: boolean;
	/** Reloj maestro (segundos del video); lo fija el reproductor al dar play. */
	now: (() => number) | null;
	onEnd: (() => void) | null;
	/** Pide un fotograma estando en pausa (tras un salto). */
	invalidate: () => void;
} = {
	t: 0,
	playing: false,
	now: null,
	onEnd: null,
	invalidate: () => {},
};

export const sceneIndexAt = (t: number) => {
	for (let i = SCENES.length - 1; i >= 0; i--)
		if (t >= SCENES[i].start) return i;
	return 0;
};

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** Progreso normalizado de `t` entre a y b. */
export const seg = (t: number, a: number, b: number) =>
	clamp01((t - a) / (b - a));

/** Curva cúbica de Bézier (como en CSS), resuelta por Newton-Raphson. */
function bezier(x1: number, y1: number, x2: number, y2: number) {
	const cx = 3 * x1;
	const bx = 3 * (x2 - x1) - cx;
	const ax = 1 - cx - bx;
	const cy = 3 * y1;
	const by = 3 * (y2 - y1) - cy;
	const ay = 1 - cy - by;
	const sx = (u: number) => ((ax * u + bx) * u + cx) * u;
	const sy = (u: number) => ((ay * u + by) * u + cy) * u;
	const dx = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
	return (x: number) => {
		if (x <= 0) return 0;
		if (x >= 1) return 1;
		let u = x;
		for (let i = 0; i < 6; i++) {
			const d = dx(u);
			if (Math.abs(d) < 1e-6) break;
			u -= (sx(u) - x) / d;
		}
		return sy(clamp01(u));
	};
}

/** Las mismas curvas del lenguaje de movimiento de la marca (src/brand/motion.ts). */
export const ease = {
	seda: bezier(0.22, 1, 0.36, 1),
	ceremonia: bezier(0.65, 0, 0.35, 1),
	salida: bezier(0.4, 0, 1, 1),
	suave: bezier(0.45, 0, 0.55, 1),
};

/** Progreso con curva: atajo para `ease.x(seg(t, a, b))`. */
export const prog = (
	t: number,
	a: number,
	b: number,
	curve: (x: number) => number = ease.seda,
) => curve(seg(t, a, b));

export const fmtTime = (s: number) => {
	const m = Math.floor(s / 60);
	const r = Math.floor(s % 60);
	return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
};
