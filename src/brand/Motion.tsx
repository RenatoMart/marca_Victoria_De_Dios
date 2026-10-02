import { useEffect, useRef, useState, type ReactNode } from 'react';
import anime from 'animejs';
import Mark, { MARK_MASK, PAINT } from './Mark';
import { CURVES, DURATIONS, prefersReducedMotion } from './motion';
import './Motion.css';

type Play = (
	root: HTMLElement,
) => anime.AnimeInstance | anime.AnimeTimelineInstance;

/** Firma: el laurel dorado crece, el monograma se enfoca y el nombre se despliega. */
const playFirma: Play = root => {
	const gold = root.querySelector('.vd-mo-firma__gold');
	const navy = root.querySelector('.vd-mo-firma__navy');
	const name = root.querySelector('.vd-mo-firma__name');
	anime.remove([gold, navy, name]);
	return anime
		.timeline({ easing: CURVES.seda.anime })
		.add({
			targets: gold,
			clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
			duration: 1100,
			easing: CURVES.ceremonia.anime,
		})
		.add(
			{
				targets: navy,
				opacity: [0, 1],
				filter: ['blur(8px)', 'blur(0px)'],
				translateY: [8, 0],
				duration: 700,
			},
			450,
		)
		.add(
			{
				targets: name,
				clipPath: ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)'],
				opacity: [0, 1],
				duration: 800,
			},
			950,
		);
};

/** Brillo foil: una franja de luz cruza el logo dorado. */
const playBrillo: Play = root => {
	const band = root.querySelector('.vd-mo-foil__band');
	anime.remove(band);
	return anime({
		targets: band,
		translateX: ['-120%', '320%'],
		opacity: [
			{ value: 1, duration: 120 },
			{ value: 1, duration: 900 },
			{ value: 0, duration: 180 },
		],
		duration: 1200,
		easing: CURVES.seda.anime,
	});
};

/** Sello de lacre: se presiona con un muelle firme. */
const playSello: Play = root => {
	const seal = root.querySelector('.vd-mo-seal__disc');
	const shadow = root.querySelector('.vd-mo-seal__shadow');
	anime.remove([seal, shadow]);
	return anime
		.timeline()
		.add({
			targets: seal,
			scale: [1.28, 1],
			opacity: [0, 1],
			easing: CURVES.lacre.anime,
		})
		.add(
			{
				targets: shadow,
				scale: [0.6, 1],
				opacity: [0, 1],
				duration: 420,
				easing: CURVES.seda.anime,
			},
			80,
		);
};

/** Despliegue: entrada escalonada con opacidad, desplazamiento y desenfoque. */
const playDespliegue: Play = root => {
	const cards = root.querySelectorAll('.vd-mo-cards span');
	anime.remove(cards);
	return anime({
		targets: cards,
		opacity: [0, 1],
		translateY: [16, 0],
		filter: ['blur(6px)', 'blur(0px)'],
		duration: DURATIONS.entrada,
		delay: anime.stagger(90),
		easing: CURVES.seda.anime,
	});
};

/** Curvas: barra que se llena con cada curva y duración. */
const playCurvas: Play = root => {
	const bars = root.querySelectorAll<HTMLElement>('.vd-mo-curve__fill');
	anime.remove(bars);
	const tl = anime.timeline();
	bars.forEach(bar => {
		tl.add(
			{
				targets: bar,
				scaleX: [0, 1],
				duration: Number(bar.dataset.duration),
				easing: bar.dataset.easing,
			},
			0,
		);
	});
	return tl;
};

interface DemoProps {
	title: string;
	text: string;
	spec: string;
	play: Play;
	className?: string;
	children: ReactNode;
}

function Demo({
	title,
	text,
	spec,
	play,
	className = '',
	children,
}: DemoProps) {
	const ref = useRef<HTMLElement>(null);
	const [reduced] = useState(prefersReducedMotion);

	const run = () => {
		if (ref.current && !reduced) play(ref.current);
	};

	// Se reproduce sola una vez, al entrar en pantalla.
	useEffect(() => {
		const el = ref.current;
		if (!el || reduced) return;
		el.classList.add('is-armed');
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				el.classList.remove('is-armed');
				play(el);
			},
			{ threshold: 0.45 },
		);
		io.observe(el);
		return () => {
			io.disconnect();
			anime.remove(el.querySelectorAll('*'));
		};
	}, [play, reduced]);

	return (
		<figure className={`vd-mo-demo ${className}`} ref={ref}>
			<div className='vd-mo-demo__stage'>{children}</div>
			<figcaption>
				<span>
					<strong>{title}</strong> {text}
				</span>
				<span className='vd-mo-demo__spec'>{spec}</span>
				{!reduced && (
					<button type='button' className='vd-mo-demo__play' onClick={run}>
						<svg width='10' height='12' viewBox='0 0 10 12' aria-hidden='true'>
							<path d='M1 1l8 5-8 5z' fill='currentColor' />
						</svg>
						Reproducir
					</button>
				)}
			</figcaption>
		</figure>
	);
}

const CURVE_ROWS = [
	{
		name: 'Seda',
		use: 'Entradas y despliegues',
		css: CURVES.seda.css,
		easing: CURVES.seda.anime,
		ms: DURATIONS.entrada,
	},
	{
		name: 'Ceremonia',
		use: 'Portada y firma del logo',
		css: CURVES.ceremonia.css,
		easing: CURVES.ceremonia.anime,
		ms: DURATIONS.ceremonia,
	},
	{
		name: 'Interfaz',
		use: 'Pestañas, enlaces y hover',
		css: CURVES.seda.css,
		easing: CURVES.seda.anime,
		ms: DURATIONS.interfaz,
	},
];

export default function Motion() {
	const foilMask = `url(${MARK_MASK.symbol})`;
	const [reduced] = useState(prefersReducedMotion);

	return (
		<section id='movimiento' className='vd-section'>
			<header className='vd-head'>
				<h2>Movimiento</h2>
				<p>
					La marca se mueve como un objeto de lujo: despacio, con precisión y
					una sola vez. Nada gira, nada rebota y nada se repite en bucle.
				</p>
			</header>

			<Demo
				className='vd-mo-demo--hero'
				title='Firma.'
				text='La entrada del logo: el laurel crece desde la base, el monograma se enfoca y el nombre se despliega desde el centro.'
				spec='Ceremonia · 1,8 s · una vez por página'
				play={playFirma}
			>
				<div className='vd-mo-firma'>
					<div className='vd-mo-firma__symbol'>
						<span className='vd-mo-firma__gold'>
							<Mark
								kind='symbol'
								primary='transparent'
								accent={PAINT.gold}
								width='100%'
							/>
						</span>
						<span className='vd-mo-firma__navy'>
							<Mark
								kind='symbol'
								primary={PAINT.navy}
								accent='transparent'
								width='100%'
							/>
						</span>
					</div>
					<span className='vd-mo-firma__name'>
						<Mark kind='wordmark' mono={PAINT.navy} width='100%' />
					</span>
				</div>
			</Demo>

			<div className='vd-mo-grid'>
				<Demo
					title='Brillo foil.'
					text='Una franja de luz cruza el dorado, como al girar una bolsa estampada.'
					spec='Seda · 1,2 s'
					play={playBrillo}
				>
					<div
						className='vd-mo-foil'
						style={{ WebkitMaskImage: foilMask, maskImage: foilMask }}
					>
						<span className='vd-mo-foil__band' />
					</div>
				</Demo>

				<Demo
					title='Sello de lacre.'
					text='Se presiona con un muelle firme. Solo para cierres y confirmaciones.'
					spec='Lacre · muelle sin rebote visible'
					play={playSello}
				>
					<div className='vd-mo-seal'>
						<span className='vd-mo-seal__shadow' />
						<span className='vd-mo-seal__disc'>
							<Mark kind='symbol' mono='#0d1320' finish='deboss' width='62%' />
						</span>
					</div>
				</Demo>

				<Demo
					title='Despliegue.'
					text='Las piezas aparecen escalonadas: opacidad, 16 px de recorrido y desenfoque.'
					spec='Seda · 480 ms · 90 ms entre piezas'
					play={playDespliegue}
				>
					<div className='vd-mo-cards'>
						<span
							style={{
								backgroundImage: 'url(/mockups/800/emp-caja-regalo-negra.jpg)',
							}}
						/>
						<span
							style={{
								backgroundImage: 'url(/mockups/800/hog-taza-blanca.jpg)',
							}}
						/>
						<span
							style={{
								backgroundImage: 'url(/mockups/800/ropa-gorra-blanca.jpg)',
							}}
						/>
					</div>
				</Demo>
			</div>

			<Demo
				className='vd-mo-demo--curves'
				title='Curvas y duraciones.'
				text='Tres tiempos para toda la marca. Las pestañas y los filtros cambian al instante.'
				spec='transform y opacity únicamente'
				play={playCurvas}
			>
				<table className='vd-mo-curves'>
					<tbody>
						{CURVE_ROWS.map(c => (
							<tr key={c.name}>
								<th scope='row'>
									{c.name}
									<small>{c.use}</small>
								</th>
								<td className='vd-mo-curve'>
									<span className='vd-mo-curve__track'>
										<span
											className='vd-mo-curve__fill'
											data-easing={c.easing}
											data-duration={c.ms}
											style={reduced ? { transform: 'none' } : undefined}
										/>
									</span>
								</td>
								<td className='vd-mo-curve__ms'>{c.ms} ms</td>
								<td className='vd-mo-curve__css'>
									<code>{c.css}</code>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Demo>
		</section>
	);
}
