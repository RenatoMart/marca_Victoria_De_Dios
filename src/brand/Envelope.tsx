import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Mark, { PAINT } from './Mark';
import './Envelope.css';

/** Duración virtual de la línea de tiempo: el scroll la recorre de 0 a TOTAL. */
const TOTAL = 1000;

/**
 * Portada: un sobre cerrado con el símbolo como sello de lacre.
 * Al desplazarse, el sello se levanta, la solapa se abre y sube la tarjeta del manual.
 */
export default function Envelope() {
	const root = useRef<HTMLElement>(null);

	useEffect(() => {
		const el = root.current;
		if (!el) return;
		const q = (s: string) => el.querySelector<HTMLElement>(s);
		const flap = q('.vd-env__flap');
		if (!flap) return;

		const reduce = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		const tl = anime.timeline({
			autoplay: false,
			easing: 'linear',
			duration: TOTAL,
		});
		tl.add({ targets: q('.vd-env__cue'), opacity: [1, 0], duration: 80 }, 0)
			.add(
				{
					targets: q('.vd-env__seal'),
					scale: [1, 1.18],
					opacity: [1, 0],
					duration: 170,
					easing: 'easeInQuad',
				},
				0,
			)
			.add(
				{
					targets: flap,
					rotateX: [0, 180],
					duration: 440,
					easing: 'easeInOutSine',
				},
				40,
			)
			.add(
				{
					targets: q('.vd-env__face--front .vd-env__shade'),
					opacity: [0, 1],
					duration: 220,
					easing: 'easeInSine',
				},
				40,
			)
			.add(
				{
					targets: q('.vd-env__face--back .vd-env__shade'),
					opacity: [1, 0],
					duration: 220,
					easing: 'easeOutSine',
				},
				260,
			)
			.add(
				{
					targets: q('.vd-env__letter'),
					translateY: ['0%', '-60%'],
					duration: 470,
					easing: 'easeOutCubic',
				},
				420,
			)
			.add(
				{
					targets: q('.vd-env__body'),
					translateY: ['0%', '26%'],
					duration: 520,
					easing: 'easeInOutSine',
				},
				40,
			);

		// La solapa pasa detrás de la tarjeta cuando supera los 90°.
		const layer = (t: number) => {
			flap.style.zIndex = t > 280 ? '1' : '4';
		};

		if (reduce) {
			el.classList.add('is-static');
			tl.seek(TOTAL);
			layer(TOTAL);
			return;
		}

		// Desarrollo: /?env=0.5 fija la apertura en un punto para revisarla.
		const fixed = import.meta.env.DEV
			? new URLSearchParams(location.search).get('env')
			: null;
		if (fixed !== null) {
			tl.seek(Number(fixed) * TOTAL);
			layer(Number(fixed) * TOTAL);
			return;
		}

		// Sello "estampado" al cargar (sobre un contenedor distinto al que mueve el scroll).
		anime({
			targets: q('.vd-env__seal-press'),
			scale: [1.35, 1],
			opacity: [0, 1],
			duration: 900,
			delay: 350,
			easing: 'easeOutElastic(1, .7)',
		});

		let frame = 0;
		const update = () => {
			frame = 0;
			const rect = el.getBoundingClientRect();
			const range = el.offsetHeight - window.innerHeight;
			const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 1;
			const t = p * TOTAL;
			tl.seek(t);
			layer(t);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (frame) cancelAnimationFrame(frame);
			anime.remove(el.querySelectorAll('*'));
		};
	}, []);

	return (
		<header id='top' className='vd-env' ref={root}>
			<div className='vd-env__stage'>
				<div className='vd-env__body'>
					<div className='vd-env__back' />
					<div className='vd-env__letter'>
						<Mark
							kind='isologo'
							width='min(42%, 230px)'
							label='Victoria de Dios, Lifestyle & Home'
						/>
						<h1>Manual de aplicaciones de marca</h1>
					</div>
					<div className='vd-env__pocket' />
					<div className='vd-env__flap'>
						<span className='vd-env__face vd-env__face--front'>
							<span className='vd-env__shade' />
						</span>
						<span className='vd-env__face vd-env__face--back'>
							<span className='vd-env__shade' />
						</span>
						<span className='vd-env__seal'>
							<span className='vd-env__seal-press'>
								<Mark
									kind='symbol'
									mono={PAINT.foil}
									finish='foil'
									width='100%'
								/>
							</span>
						</span>
					</div>
				</div>
				<a className='vd-env__cue' href='#escenas'>
					Desliza para abrir
				</a>
			</div>
		</header>
	);
}
