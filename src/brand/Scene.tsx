import type { CSSProperties, ReactNode } from 'react';
import './Scene.css';

/** Sistema de coordenadas de toda escena: 400 × 300 (4:3). */
export const VW = 400;
export const VH = 300;

interface SceneProps {
	/** Fondo de la escena (cualquier background CSS). */
	bg?: string;
	children: ReactNode;
	className?: string;
}

/**
 * Lienzo de una maqueta. Dibuja el producto con <svg viewBox="0 0 400 300"> y
 * coloca el logo encima con <Place> usando las mismas coordenadas.
 */
export function Scene({ bg = 'var(--vd-scene-bg)', children, className = '' }: SceneProps) {
	return (
		<div className={`vd-scene ${className}`} style={{ background: bg }}>
			{children}
		</div>
	);
}

interface PlaceProps {
	/** Esquina superior izquierda en coordenadas de escena (0–400, 0–300). */
	x: number;
	y: number;
	/** Ancho en coordenadas de escena. */
	w: number;
	/** Alto opcional (si no, lo define el contenido). */
	h?: number;
	rotate?: number;
	/** Transformación extra (perspectiva, skew…) aplicada tras la rotación. */
	transform?: string;
	style?: CSSProperties;
	className?: string;
	children: ReactNode;
}

/** Posiciona contenido HTML (normalmente <Mark>) sobre la escena. */
export function Place({ x, y, w, h, rotate = 0, transform = '', style, className = '', children }: PlaceProps) {
	return (
		<div
			className={`vd-place ${className}`}
			style={{
				left: `${(x / VW) * 100}%`,
				top: `${(y / VH) * 100}%`,
				width: `${(w / VW) * 100}%`,
				height: h === undefined ? undefined : `${(h / VH) * 100}%`,
				transform: `rotate(${rotate}deg) ${transform}`,
				...style,
			}}
		>
			{children}
		</div>
	);
}

/** SVG a pantalla completa dentro de la escena, con el viewBox estándar. */
export function Art({ children, className = '' }: { children: ReactNode; className?: string }) {
	return (
		<svg className={`vd-art ${className}`} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio='xMidYMid meet' aria-hidden='true'>
			{children}
		</svg>
	);
}

/**
 * Sombreado de superficie curva (multiply) limitado a una caja de la escena.
 * Se coloca después del logo para que la sombra lo envuelva.
 */
export function Shade({ x, y, w, h, background }: { x: number; y: number; w: number; h: number; background: string }) {
	return (
		<div
			className='vd-shade'
			style={{
				left: `${(x / VW) * 100}%`,
				top: `${(y / VH) * 100}%`,
				width: `${(w / VW) * 100}%`,
				height: `${(h / VH) * 100}%`,
				background,
			}}
		/>
	);
}
