import {
	useEffect,
	useState,
	useSyncExternalStore,
	type RefObject,
} from 'react';

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

/** Preferencia de movimiento reducido, reactiva a cambios del sistema. */
export const useReducedMotion = () =>
	useSyncExternalStore(reduced.subscribe, reduced.get, () => false);

/** Ratón real (escritorio). En táctil no hay parallax ni comportamientos de hover. */
export const useFinePointer = () =>
	useSyncExternalStore(fine.subscribe, fine.get, () => false);

/** true la primera vez que el elemento entra en pantalla (y se queda en true). */
export function useInViewOnce(
	ref: RefObject<Element | null>,
	threshold = 0.35,
) {
	const [seen, setSeen] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el || seen) return;
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					setSeen(true);
					io.disconnect();
				}
			},
			{ threshold },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [ref, seen, threshold]);
	return seen;
}

/** true mientras el elemento está cerca de la pantalla (para montar/desmontar el 3D). */
export function useNearViewport(
	ref: RefObject<Element | null>,
	margin = '300px',
) {
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
