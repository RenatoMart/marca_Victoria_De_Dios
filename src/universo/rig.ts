/**
 * Puente entre la capa 2D (DOM) y la 3D (WebGL) sin re-renders de React:
 * el DOM escribe aquí y el bucle de render lo lee en cada fotograma.
 */
export type CustomState = 'neutral' | 'design' | 'personal';

export const rig = {
	/** Puntero normalizado (-1..1) sobre la sección; 0 en táctil. */
	px: 0,
	py: 0,
	/** Progreso de salida del hero (0 = en pantalla, 1 = ya pasó). */
	heroProgress: 0,
	/** La marca ya se reveló: la cámara hace su entrada. */
	heroEntered: false,
	/** Estado de la taza en «Hazlo tuyo». */
	custom: 'neutral' as CustomState,
	/** Momento (s) en que cambió el estado, para encadenar fases. */
	customChangedAt: 0,
	/** El puntero está sobre el escenario del producto. */
	productHover: false,
	reduced: false,
	/** Cada canvas montado registra aquí su función para pedir un fotograma. */
	invalidators: new Set<() => void>(),
	/** Pide un fotograma a los canvas montados (render bajo demanda). */
	invalidate() {
		rig.invalidators.forEach(f => f());
	},
};

export function setCustom(state: CustomState) {
	rig.custom = state;
	rig.customChangedAt = performance.now() / 1000;
	rig.invalidate();
}
