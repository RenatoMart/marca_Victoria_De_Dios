/**
 * LENGUAJE DE MOVIMIENTO · Victoria de Dios
 * Único lugar donde se decide cómo se mueve la marca. CSS, Motion y Three leen de aquí.
 *
 * Carácter: seda y precisión. Arranque decidido, aterrizaje suave, sin rebotes.
 * Las interacciones frecuentes (hover, menú, filtros) son rápidas; el storytelling
 * (revelado de marca, cámara del hero) puede respirar.
 */
export type Bezier = readonly [number, number, number, number];

export const easing = {
	/** Entradas de contenido: sale rápido y se posa. */
	entrance: [0.22, 1, 0.36, 1],
	/** Cambios de estado en la interfaz: simétrico y corto. */
	standard: [0.4, 0, 0.2, 1],
	/** Momentos de marca y cámara: aceleración y frenado marcados. */
	emphasized: [0.65, 0, 0.35, 1],
	/** Salidas: aceleran y se van; más discretas que las entradas. */
	exit: [0.4, 0, 1, 1],
} as const satisfies Record<string, Bezier>;

export const duration = {
	/** Presión de botones: percepción de respuesta inmediata. */
	instant: 0.09,
	/** Hover, foco, subrayados, cierre de menú. */
	fast: 0.18,
	/** Apertura de menú, filtros, cambios de estado con significado. */
	normal: 0.36,
	/** Reveals de titulares e imágenes principales. */
	slow: 0.7,
	/** Revelado de marca, cortina, transiciones de sección. */
	cinematic: 1.15,
} as const;

/** Recorridos en px. La marca no «vuela»: se desplaza poco. */
export const distance = { xs: 4, sm: 10, md: 20, lg: 36 } as const;
export const blur = { sm: 4, md: 8 } as const;
export const scale = { press: 0.98, hover: 1.035, settle: 0.96 } as const;
export const stagger = { tight: 0.05, normal: 0.09 } as const;

/** Amortiguación exponencial (lambda) para cámara y objetos 3D: más alto = responde antes. */
export const damp = { camera: 2.6, pointer: 3.2, object: 4.5, light: 3.4 } as const;

export const css = (b: Bezier) => `cubic-bezier(${b.join(',')})`;

/** Publica los tokens como variables CSS para que las hojas de estilo no repitan valores. */
export function applyCssVars(root: HTMLElement = document.documentElement) {
	const set = (k: string, v: string) => root.style.setProperty(k, v);
	for (const [k, v] of Object.entries(easing)) set(`--ease-${k}`, css(v));
	for (const [k, v] of Object.entries(duration)) set(`--dur-${k}`, `${v}s`);
	for (const [k, v] of Object.entries(distance)) set(`--dist-${k}`, `${v}px`);
	for (const [k, v] of Object.entries(blur)) set(`--blur-${k}`, `${v}px`);
}
