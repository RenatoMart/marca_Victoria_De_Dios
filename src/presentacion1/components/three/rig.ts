/**
 * Estado compartido entre el DOM y los escenarios 3D. Es mutable a propósito: se lee dentro
 * del render loop (useFrame) sin pasar por React state, así que no provoca renders por fotograma.
 */
type MugStage = 'plain' | 'preview' | 'printed';
export type MugColor = 'marfil' | 'negro' | 'azul';
export type MugDesign = 'isologo' | 'monograma' | 'nombre';

const wakers = new Set<() => void>();
const mugListeners = new Set<() => void>();

export const rig = {
	/** Puntero normalizado −1…1 (solo ratón real). */
	px: 0,
	py: 0,
	reduced: false,
	/** Hero: 0 = arriba, 1 = totalmente cubierto por la cortina. */
	scroll: 0,
	/** Hero: true cuando termina el revelado de marca; la escena «enciende» con amortiguación. */
	entered: false,
	/** Personalizador. */
	hover: false,
	mug: {
		stage: 'plain' as MugStage,
		color: 'marfil' as MugColor,
		design: 'isologo' as MugDesign,
		text: '',
		printedAt: 0,
	},
	/** Despierta los canvas en modo demand (cada uno registra su invalidate). */
	wake() {
		wakers.forEach(w => w());
	},
	/** El DOM cambió las opciones del personalizador (color, diseño, texto, estado). */
	mugChanged() {
		mugListeners.forEach(l => l());
		wakers.forEach(w => w());
	},
	onMugChange(l: () => void) {
		mugListeners.add(l);
		return () => {
			mugListeners.delete(l);
		};
	},
	register(w: () => void) {
		wakers.add(w);
		return () => {
			wakers.delete(w);
		};
	},
};

let bound = false;
export function bindPointer() {
	if (bound) return;
	bound = true;
	window.addEventListener(
		'pointermove',
		e => {
			if (e.pointerType !== 'mouse' || rig.reduced) return;
			rig.px = (e.clientX / window.innerWidth) * 2 - 1;
			rig.py = (e.clientY / window.innerHeight) * 2 - 1;
			rig.wake();
		},
		{ passive: true },
	);
}
