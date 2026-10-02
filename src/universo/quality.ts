/**
 * Calidad de render según el dispositivo. En táctiles o equipos modestos se quitan los
 * costes que menos se notan en pantalla pequeña (antialiasing, resolución de sombras).
 */
const coarse =
	typeof window !== 'undefined' &&
	window.matchMedia('(pointer: coarse)').matches;
const narrow = typeof window !== 'undefined' && window.innerWidth < 900;
const fewCores =
	typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4;

export const LOW_END = coarse || narrow || fewCores;

export const QUALITY = {
	antialias: !LOW_END,
	shadowRes: LOW_END ? 256 : 512,
	dpr: (LOW_END ? [1, 1] : [1, 1.75]) as [number, number],
};
