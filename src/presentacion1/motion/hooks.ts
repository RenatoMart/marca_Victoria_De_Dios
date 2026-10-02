import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';

function mediaStore(query: string) {
	return {
		subscribe: (cb: () => void) => {
			const mq = window.matchMedia(query);
			mq.addEventListener('change', cb);
			return () => mq.removeEventListener('change', cb);
		},
		get: () => window.matchMedia(query).matches,
	};
}

const reduced = mediaStore('(prefers-reduced-motion: reduce)');
const fine = mediaStore('(hover: hover) and (pointer: fine)');
const wide = mediaStore('(min-width: 1024px)');

/** Preferencia de movimiento reducido, reactiva a cambios del sistema. */
export const useReduced = () =>
	useSyncExternalStore(reduced.subscribe, reduced.get, () => false);

/** Ratón real (escritorio). En táctil no hay parallax ni comportamientos de hover. */
export const useFinePointer = () =>
	useSyncExternalStore(fine.subscribe, fine.get, () => false);

export const useDesktop = () =>
	useSyncExternalStore(wide.subscribe, wide.get, () => false);

/** true mientras el elemento está cerca de la pantalla (monta/desmonta el 3D). */
export function useNearViewport(ref: RefObject<Element | null>, margin = '240px') {
	const [near, setNear] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
			rootMargin: margin,
		});
		io.observe(el);
		return () => io.disconnect();
	}, [ref, margin]);
	return near;
}
