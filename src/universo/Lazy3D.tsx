import { Component, lazy, type ReactNode } from 'react';

/** El código 3D (three.js + R3F) se descarga solo cuando un escenario se acerca. */
const load = () => import('./three/Views');
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
