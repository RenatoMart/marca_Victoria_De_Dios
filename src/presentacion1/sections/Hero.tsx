import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { Arrow, MotionText } from '../components/motion';
import Stage3D from '../components/three/Stage3D';
import { rig } from '../components/three/rig';
import { duration, easing } from '../motion/tokens';
import { useReduced } from '../motion/hooks';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * ESCENA 02 · Hero.
 *  SUBJECT  el sello de la marca (soporte marfil, tinta azul, foil dorado en relieve).
 *  CAMERA   teleobjetivo (FOV 24°): dolly-in al revelar, micro-parallax del puntero, dolly-out al salir.
 *  MOTION   se mueve la cámara y la luz, no el objeto. Sin rotación continua.
 *  DEPTH    soporte → tinta → foil (tres planos a milímetros) y un contraluz frío detrás.
 *  LIGHT    softbox cálido a la izquierda + brillo puntual que recorre el foil con el scroll.
 *  TRANSITION  el hero queda fijo, retrocede (escala, brillo, dolly) y la cortina sube sobre él.
 *  PURPOSE  mostrar la marca como un objeto físico y cuidado antes de explicar nada.
 */
export default function Hero({ revealed }: { revealed: boolean }) {
	const reduced = useReduced();
	const [gone, setGone] = useState(false);
	const { scrollY } = useScroll();
	const p = useTransform(scrollY, v => clamp01(v / (window.innerHeight * 0.92)));

	useMotionValueEvent(p, 'change', v => {
		rig.scroll = v;
		rig.wake();
		setGone(v >= 0.995);
	});

	const y = useTransform(p, [0, 1], [0, reduced ? 0 : -56]);
	const scale = useTransform(p, [0, 1], [1, reduced ? 1 : 0.94]);
	const fade = useTransform(p, [0, 0.55, 1], [1, 0.45, 0]);
	const dim = useTransform(p, [0, 1], [0, 0.55]);

	// Al volver arriba (tras haberse ido el hero) el texto vuelve a entrar.
	const show = revealed && !gone;
	const enter = (delay: number) => ({
		initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
		animate: show
			? { opacity: 1, y: 0, filter: 'blur(0px)' }
			: { opacity: 0, y: 14, filter: 'blur(4px)' },
		transition: { duration: duration.slow, ease: easing.entrance, delay },
	});

	return (
		<section id='top' className='hero on-dark' aria-labelledby='hero-title' style={{ visibility: gone ? 'hidden' : 'visible' }}>
			<div className='hero__bg' aria-hidden />

			{/* 1 · elemento visual principal */}
			<motion.div
				className='hero__stage'
				style={{ y, scale }}
				initial={{ opacity: 0 }}
				animate={{ opacity: revealed ? 1 : 0 }}
				transition={{ duration: duration.cinematic, ease: easing.entrance }}
			>
				<Stage3D
					kind='seal'
					active={!gone}
					onReady={() => {
						rig.wake();
					}}
					poster={
						<div className='seal-poster'>
							<img src='/brand/isologo-color.png' alt='Isologo de Victoria de Dios' />
						</div>
					}
				/>
			</motion.div>

			<motion.div className='hero__content wrap' style={{ y, opacity: fade }}>
				<motion.p className='eyebrow' {...enter(0.1)}>
					Lifestyle &amp; Home
				</motion.p>
				{/* 2 · titular */}
				<MotionText
					as='h1'
					id='hero-title'
					trigger='mount'
					play={show}
					delay={0.14}
					className='display hero__title'
					lines={['Un universo para', <em key='a'>vivir, vestir</em>, 'y regalar.']}
				/>
				{/* 3 · texto de apoyo */}
				<motion.p className='lead' {...enter(0.42)}>
					Hogar, estilo de vida y objetos personalizados, elegidos con cuidado y hechos para que cada detalle sea tuyo.
				</motion.p>
				{/* 4 · llamada a la acción */}
				<motion.div className='hero__cta' {...enter(0.52)}>
					<a className='btn btn--gold' href='#explora'>
						Explorar el universo <Arrow />
					</a>
					<a className='u-link' href='#hazlo-tuyo'>
						Personaliza el tuyo
					</a>
				</motion.div>
			</motion.div>

			<motion.div className='hero__dim' style={{ opacity: dim }} aria-hidden />
		</section>
	);
}
