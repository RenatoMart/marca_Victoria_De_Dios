/** Lenguaje de movimiento de Victoria de Dios: lento, preciso, sin rebotes gratuitos. */
export const CURVES = {
	/** Entradas y despliegues: arranca rápido y se posa suave. */
	seda: {
		css: 'cubic-bezier(0.22, 1, 0.36, 1)',
		anime: 'cubicBezier(0.22, 1, 0.36, 1)',
	},
	/** Secuencias largas: firma del logo, apertura del sobre. */
	ceremonia: {
		css: 'cubic-bezier(0.65, 0, 0.35, 1)',
		anime: 'cubicBezier(0.65, 0, 0.35, 1)',
	},
	/** Sello: un muelle firme y críticamente amortiguado, como presionar lacre (sin rebote). */
	lacre: {
		css: 'cubic-bezier(0.25, 1, 0.5, 1)',
		anime: 'spring(1, 140, 24, 0)',
	},
	/** Cambios de estado en la interfaz: simétrico y corto. */
	estandar: {
		css: 'cubic-bezier(0.4, 0, 0.2, 1)',
		anime: 'cubicBezier(0.4, 0, 0.2, 1)',
	},
	/** Salidas: aceleran y se van; más discretas que las entradas. */
	salida: {
		css: 'cubic-bezier(0.4, 0, 1, 1)',
		anime: 'cubicBezier(0.4, 0, 1, 1)',
	},
} as const;

export const DURATIONS = {
	interfaz: 180,
	entrada: 480,
	ceremonia: 1200,
} as const;

/**
 * Tokens de movimiento: el único lugar donde se decide cómo se mueve la marca.
 * - instant/fast: interacciones frecuentes (hover, pestañas, prensa).
 * - normal/slow: entradas de contenido y cambios de estado con significado.
 * - cinematic: momentos de storytelling (revelado de marca, cámara).
 */
export const motion = {
	duration: { instant: 90, fast: 160, normal: 320, slow: 560, cinematic: 1100 },
	easing: {
		entrance: CURVES.seda,
		standard: CURVES.estandar,
		emphasized: CURVES.ceremonia,
		exit: CURVES.salida,
	},
	/** Recorridos en px: pequeños; la marca no "vuela". */
	distance: { xs: 4, sm: 8, md: 16, lg: 28 },
	blur: { sm: 4, md: 8 },
	scale: { press: 0.98, hover: 1.015, settle: 0.97 },
	stagger: { tight: 45, normal: 70 },
	/** Amortiguación (lambda) para cámara y objetos 3D: más alto = responde antes. */
	damp: { camera: 2.6, pointer: 3.2, object: 4.5 },
} as const;

/** Variables CSS derivadas de los tokens, para que el CSS no repita valores. */
export const motionCssVars = {
	'--m-fast': `${motion.duration.fast}ms`,
	'--m-normal': `${motion.duration.normal}ms`,
	'--m-slow': `${motion.duration.slow}ms`,
	'--m-ease-in': motion.easing.entrance.css,
	'--m-ease-std': motion.easing.standard.css,
	'--m-ease-out': motion.easing.exit.css,
	'--m-press': String(motion.scale.press),
	'--m-hover': String(motion.scale.hover),
} as Record<string, string>;

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;
