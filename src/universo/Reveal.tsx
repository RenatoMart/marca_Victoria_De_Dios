import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import anime from 'animejs';
import { motion } from '../brand/motion';
import { useInViewOnce, useReducedMotion } from './hooks';

/**
 * Variantes de entrada del sistema (todas leen los tokens):
 * - rise: opacidad + 16 px + desenfoque leve. Para titulares y bloques destacados.
 * - settle: las piezas llegan desde una retícula desplazada y se acomodan (Hogar).
 * - editorial: recorte de izquierda a derecha y la foto se asienta en profundidad (Estilo de vida).
 * - lines: cada línea sube desde su máscara (titulares grandes).
 */
export type RevealVariant = 'rise' | 'settle' | 'editorial' | 'lines';

interface Props {
	variant?: RevealVariant;
	delay?: number;
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
	as?: 'div' | 'article' | 'header' | 'figure';
}

const { duration: D, easing: E, distance: X, blur: B, stagger: S } = motion;

function play(el: HTMLElement, variant: RevealVariant, delay: number) {
	switch (variant) {
		case 'rise':
			return anime({
				targets: el,
				opacity: [0, 1],
				translateY: [X.md, 0],
				filter: [`blur(${B.sm}px)`, 'blur(0px)'],
				duration: D.slow,
				delay,
				easing: E.entrance.anime,
				complete: () => el.style.removeProperty('filter'),
			});
		case 'settle': {
			const items = el.querySelectorAll('[data-settle]');
			return anime({
				targets: items,
				opacity: [0, 1],
				translateX: (_: Element, i: number) => [(i % 2 ? 1 : -1) * X.sm, 0],
				translateY: (_: Element, i: number) => [(i < 2 ? -1 : 1) * X.sm, 0],
				duration: D.slow,
				delay: anime.stagger(S.tight, { start: delay }),
				easing: E.entrance.anime,
			});
		}
		case 'editorial': {
			const tl = anime.timeline({ easing: E.emphasized.anime });
			tl.add(
				{
					targets: el.querySelector('[data-clip]'),
					clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
					duration: D.cinematic,
				},
				delay,
			).add(
				{
					targets: el.querySelector('[data-depth]'),
					translateX: ['6%', '0%'],
					scale: [1.06, 1],
					duration: D.cinematic + 300,
					easing: E.entrance.anime,
				},
				delay,
			);
			return tl;
		}
		case 'lines':
			return anime({
				targets: el.querySelectorAll('[data-line] > span'),
				translateY: ['105%', '0%'],
				duration: D.slow + 140,
				delay: anime.stagger(S.normal, { start: delay }),
				easing: E.entrance.anime,
			});
	}
}

export default function Reveal({
	variant = 'rise',
	delay = 0,
	className = '',
	style,
	children,
	as: Tag = 'div',
}: Props) {
	const ref = useRef<HTMLElement>(null);
	const reduced = useReducedMotion();
	const seen = useInViewOnce(ref, 0.3);

	useEffect(() => {
		const el = ref.current;
		if (!el || reduced || !seen) return;
		play(el, variant, delay);
		el.dataset.reveal = 'done';
		return () => anime.remove(el.querySelectorAll('*'));
	}, [seen, reduced, variant, delay]);

	return (
		<Tag
			ref={ref as never}
			className={className}
			style={style}
			data-reveal={reduced ? 'done' : 'pending'}
			data-variant={variant}
		>
			{children}
		</Tag>
	);
}

/** Titular en líneas con máscara (usar dentro de <Reveal variant='lines'>). */
export function Lines({
	lines,
	as: Tag = 'h2',
	className,
}: {
	lines: string[];
	as?: 'h2' | 'h3' | 'p';
	className?: string;
}) {
	return (
		<Tag className={className}>
			{lines.map(l => (
				<span key={l} data-line className='uv-line'>
					<span>{l}</span>
				</span>
			))}
		</Tag>
	);
}
