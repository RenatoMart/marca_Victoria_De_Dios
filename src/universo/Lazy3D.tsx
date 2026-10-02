import { Component, lazy, type ReactNode } from 'react';

/** El código 3D (three.js + R3F) se descarga solo cuando un escenario se acerca. */
const load = () => import('./three/Views');

/** Descarga el código 3D en segundo plano (sin montar nada) en cuanto se abre la página. */
export function prefetch3D() {
	const run = () => void load().catch(() => undefined);
	if ('requestIdleCallback' in window)
		window.requestIdleCallback(run, { timeout: 1500 });
	else setTimeout(run, 300);
}
export const HeroCanvas3D = lazy(() =>
	load().then(m => ({ default: m.HeroCanvas })),
);
export const CustomizeCanvas3D = lazy(() =>
	load().then(m => ({ default: m.CustomizeCanvas })),
);

/** Si WebGL o el módulo 3D fallan, la página sigue: se muestra la alternativa 2D. */
export class Guard3D extends Component<
	{ fallback: ReactNode; onError?: () => void; children: ReactNode },
	{ failed: boolean }
> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch() {
		this.props.onError?.();
	}
	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
}
