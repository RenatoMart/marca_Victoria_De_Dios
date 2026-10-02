import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { hasWebGL } from './webgl';

const load = () => import('./Views');

/** Descarga el código 3D en segundo plano en cuanto se abre la página. */
export function prefetch3D() {
	const run = () => void load().catch(() => undefined);
	if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 1500 });
	else setTimeout(run, 300);
}
const SealCanvas = lazy(() => load().then(m => ({ default: m.SealCanvas })));
const MugCanvas = lazy(() => load().then(m => ({ default: m.MugCanvas })));

/** Si WebGL o el módulo 3D fallan, la página sigue: se muestra la alternativa 2D. */
class Guard extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch() {
		this.props.onFail();
	}
	render() {
		return this.state.failed ? null : this.props.children;
	}
}

/**
 * Escenario 3D con degradación elegante: WebGL completo → 2D (póster).
 * - Solo monta el canvas mientras `active` es true (un único canvas vivo a la vez).
 * - El póster aparece si no hay WebGL, si el 3D falla o si tarda más de `patience` ms.
 * - Cuando el 3D está dibujado, `onReady` avisa para que el DOM coordine la entrada.
 */
export default function Stage3D({
	kind,
	active,
	poster,
	onReady,
	patience = 7000,
}: {
	kind: 'seal' | 'mug';
	active: boolean;
	poster: ReactNode;
	onReady?: (ready: boolean) => void;
	patience?: number;
}) {
	const webgl = hasWebGL();
	const [ready, setReady] = useState(false);
	const [failed, setFailed] = useState(false);
	const [late, setLate] = useState(false);

	const markReady = useCallback(() => setReady(true), []);
	const markFailed = useCallback(() => setFailed(true), []);

	useEffect(() => {
		if (!active) {
			setReady(false);
			setLate(false);
			return;
		}
		const id = window.setTimeout(() => setLate(true), patience);
		return () => window.clearTimeout(id);
	}, [active, patience]);

	useEffect(() => {
		onReady?.(ready);
	}, [ready, onReady]);

	const showPoster = !webgl || failed || (late && !ready);
	return (
		<div className='stage3d'>
			<div className='stage3d__poster' data-show={showPoster}>
				{poster}
			</div>
			{webgl && !failed && active && (
				<div className='stage3d__canvas' data-ready={ready}>
					<Guard onFail={markFailed}>
						<Suspense fallback={null}>
							{kind === 'seal' ? <SealCanvas onReady={markReady} /> : <MugCanvas onReady={markReady} />}
						</Suspense>
					</Guard>
				</div>
			)}
		</div>
	);
}
