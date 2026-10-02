import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import { blur, distance, duration, easing, stagger } from '../../motion/tokens';
import { useReduced } from '../../motion/hooks';

/** `once: false`: cada vez que el bloque vuelve a entrar en pantalla, su animación se reproduce de nuevo. */
export const VIEWPORT = { once: false, margin: '0px 0px -12% 0px' } as const;

/* ---------------------------------------------------------------------------
 * MotionReveal — el reveal «estándar» de la marca. Úsalo solo en lo importante
 * (bloques principales, no en cada párrafo): opacidad + 20px + un velo de blur.
 * ------------------------------------------------------------------------- */
const revealVariants: Variants = {
	hidden: { opacity: 0, y: distance.md, filter: `blur(${blur.sm}px)` },
	shown: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

type RevealTag = 'div' | 'section' | 'p' | 'li' | 'header' | 'article';

export function MotionReveal({
	as = 'div',
	delay = 0,
	children,
	...rest
}: {
	as?: RevealTag;
	delay?: number;
	children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>) {
	const Tag = motion[as] as typeof motion.div;
	return (
		<Tag
			variants={revealVariants}
			initial='hidden'
			whileInView='shown'
			viewport={VIEWPORT}
			transition={{ duration: duration.slow, ease: easing.entrance, delay }}
			{...rest}
		>
			{children}
		</Tag>
	);
}

/* ---------------------------------------------------------------------------
 * MotionText — titulares por líneas con máscara. Cada línea asciende desde un borde
 * invisible; es el único patrón de entrada tipográfico de la marca.
 * ------------------------------------------------------------------------- */
const lineVariants: Variants = {
	hidden: { y: '108%' },
	shown: { y: '0%' },
};

export function MotionText({
	lines,
	as: Tag = 'h2',
	className = '',
	delay = 0,
	trigger = 'view',
	play = true,
	id,
}: {
	lines: ReactNode[];
	as?: 'h1' | 'h2' | 'h3' | 'p';
	className?: string;
	delay?: number;
	/** `view`: al entrar en pantalla. `mount`: al montar (hero, cuando `play` pasa a true). */
	trigger?: 'view' | 'mount';
	play?: boolean;
	id?: string;
}) {
	const M = motion[Tag];
	const common =
		trigger === 'view'
			? { initial: 'hidden', whileInView: 'shown', viewport: VIEWPORT }
			: { initial: 'hidden', animate: play ? 'shown' : 'hidden' };
	return (
		<M
			id={id}
			className={className}
			{...common}
			transition={{ staggerChildren: stagger.normal, delayChildren: delay }}
		>
			{lines.map((l, i) => (
				<span className='line' key={i}>
					<motion.span
						variants={lineVariants}
						transition={{ duration: duration.slow, ease: easing.entrance }}
					>
						{l}
					</motion.span>
				</span>
			))}
		</M>
	);
}

/* ---------------------------------------------------------------------------
 * MotionImage — imagen principal: se descubre con un recorte (clip-path) y asienta
 * su escala. Con `parallax` la imagen interior se desplaza con el scroll (profundidad).
 * ------------------------------------------------------------------------- */
const clips = {
	up: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
	left: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
	/** Recorte editorial en diagonal para «Estilo de vida». */
	diagonal: [
		'polygon(0% 0%, 0% 0%, -18% 100%, 0% 100%)',
		'polygon(0% 0%, 100% 0%, 100% 100%, -0% 100%)',
	],
} as const;

export function MotionImage({
	src,
	alt,
	reveal = 'up',
	parallax = 0,
	className = '',
	position = 'center',
	delay = 0,
	slow = false,
	sizes,
}: {
	src: string;
	alt: string;
	reveal?: keyof typeof clips;
	/** Recorrido del parallax en % de la altura (0 = sin parallax). */
	parallax?: number;
	className?: string;
	position?: string;
	delay?: number;
	slow?: boolean;
	sizes?: string;
}) {
	const ref = useRef<HTMLElement>(null);
	const reduced = useReduced();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
	const y = useTransform(scrollYProgress, [0, 1], [`${parallax}%`, `${-parallax}%`]);
	const [from, to] = clips[reveal];
	const rest = parallax && !reduced ? 1 + (parallax * 2) / 100 : 1;
	return (
		<motion.figure
			ref={ref}
			className={`m-image ${className}`}
			initial={{ clipPath: from }}
			whileInView={{ clipPath: to }}
			viewport={VIEWPORT}
			transition={{
				duration: slow ? duration.cinematic : duration.slow,
				ease: slow ? easing.emphasized : easing.entrance,
				delay,
			}}
		>
			<motion.img
				src={src}
				alt={alt}
				sizes={sizes}
				loading='lazy'
				decoding='async'
				style={{
					objectPosition: position,
					y: reduced || !parallax ? 0 : y,
				}}
				initial={{ scale: reduced ? rest : rest + 0.1 }}
				whileInView={{ scale: rest }}
				viewport={VIEWPORT}
				transition={{ duration: duration.cinematic, ease: easing.entrance, delay }}
			/>
		</motion.figure>
	);
}

/* ---------------------------------------------------------------------------
 * ScrollProgress — hilo de oro de lectura. Lineal (sin spring): sigue al dedo.
 * ------------------------------------------------------------------------- */
export function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	return <motion.div className='progress' style={{ scaleX: scrollYProgress }} aria-hidden />;
}

export function Arrow({ size = 16 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox='0 0 24 24' aria-hidden='true'>
			<path
				d='M5 12h14M13 6l6 6-6 6'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
