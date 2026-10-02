/**
 * Calidad de render según el dispositivo. En táctiles o equipos modestos se quitan los
 * costes que menos se notan en pantalla pequeña (resolución de sombras, render bajo demanda).
 */
const coarse =
	typeof window !== 'undefined' &&
	window.matchMedia('(pointer: coarse)').matches;
const narrow = typeof window !== 'undefined' && window.innerWidth < 900;
const fewCores =
	typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4;

export const LOW_END = coarse || narrow || fewCores;

export const QUALITY = {
	/** Siempre activo: los bordes escalonados se notan más en pantallas pequeñas de alta densidad. */
	antialias: true,
	shadowRes: LOW_END ? 256 : 512,
	/** Hasta 2× en móvil (el navegador recorta al ratio real del dispositivo): nítido sin pasarse en pantallas 3×. */
	dpr: (LOW_END ? [1, 2] : [1, 1.75]) as [number, number],
};
