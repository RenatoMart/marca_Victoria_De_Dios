import type { CSSProperties } from 'react';
import './Mark.css';

export type MarkKind = 'symbol' | 'isologo' | 'wordmark';

/**
 * Acabado físico del logo sobre el producto.
 * flat: tinta plana · foil: estampado en caliente · emboss/deboss: relieve alto/bajo
 * embroidery: bordado · print: impresión absorbida por el soporte (multiply)
 * engrave: grabado láser · woven: etiqueta tejida
 */
export type Finish =
	| 'flat'
	| 'foil'
	| 'emboss'
	| 'deboss'
	| 'embroidery'
	| 'print'
	| 'engrave'
	| 'woven';

/** Pinturas listas para usar en `primary`, `accent` o `mono` (cualquier valor CSS de background vale). */
export const PAINT = {
	navy: 'var(--vd-navy)',
	gold: 'var(--vd-gold)',
	goldLight: 'var(--vd-gold-light)',
	ivory: 'var(--vd-ivory)',
	white: '#ffffff',
	black: '#111111',
	kraftInk: '#2a2018',
	foil: 'var(--vd-foil)',
	silver: 'var(--vd-silver)',
	threadGold:
		'repeating-linear-gradient(62deg, #d9b766 0 1.1px, #9a7733 1.1px 2.2px, #c7a14f 2.2px 3.3px)',
	threadWhite:
		'repeating-linear-gradient(62deg, #ffffff 0 1.1px, #cfd3da 1.1px 2.2px, #eef0f3 2.2px 3.3px)',
	threadNavy:
		'repeating-linear-gradient(62deg, #34425f 0 1.1px, #141b2a 1.1px 2.2px, #26324b 2.2px 3.3px)',
} as const;

const ASSETS: Record<MarkKind, { ratio: number; all: string; navy: string; gold: string }> = {
	symbol: {
		ratio: 1000 / 965,
		all: '/brand/symbol-mask.png',
		navy: '/brand/symbol-mask-navy.png',
		gold: '/brand/symbol-mask-gold.png',
	},
	isologo: {
		ratio: 1000 / 922,
		all: '/brand/isologo-mask.png',
		navy: '/brand/isologo-mask-navy.png',
		gold: '/brand/isologo-mask-gold.png',
	},
	wordmark: {
		ratio: 964 / 169,
		all: '/brand/wordmark-mask.png',
		navy: '/brand/wordmark-mask.png',
		gold: '/brand/wordmark-mask.png',
	},
};

export interface MarkProps {
	kind?: MarkKind;
	/** Pintura de las partes azul marino del original. */
	primary?: string;
	/** Pintura de las partes doradas del original. */
	accent?: string;
	/** Una sola pintura para todo el logo (anula primary/accent). */
	mono?: string;
	finish?: Finish;
	/** Ancho CSS; por defecto ocupa el 100% del contenedor. */
	width?: string | number;
	className?: string;
	style?: CSSProperties;
	label?: string;
}

function maskStyle(url: string, paint: string): CSSProperties {
	return {
		background: paint,
		WebkitMaskImage: `url(${url})`,
		maskImage: `url(${url})`,
	};
}

/** Logo real de Victoria de Dios, recoloreable mediante máscaras. */
export default function Mark({
	kind = 'symbol',
	primary = PAINT.navy,
	accent = PAINT.gold,
	mono,
	finish = 'flat',
	width = '100%',
	className = '',
	style,
	label = 'Victoria de Dios',
}: MarkProps) {
	const a = ASSETS[kind];
	const single = mono ?? (kind === 'wordmark' ? primary : undefined);
	return (
		<span
			role='img'
			aria-label={label}
			className={`vd-mark vd-mark--${finish} ${className}`}
			style={{ width, aspectRatio: a.ratio, ...style }}
		>
			{single ? (
				<span className='vd-mark__layer' style={maskStyle(a.all, single)} />
			) : (
				<>
					<span className='vd-mark__layer' style={maskStyle(a.navy, primary)} />
					<span className='vd-mark__layer' style={maskStyle(a.gold, accent)} />
				</>
			)}
		</span>
	);
}
