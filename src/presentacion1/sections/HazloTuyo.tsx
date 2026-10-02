import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Arrow, MotionReveal, MotionText } from '../components/motion';
import Stage3D from '../components/three/Stage3D';
import { MUG_TONES, NAME_MAX } from '../components/three/designs';
import { rig, type MugColor, type MugDesign } from '../components/three/rig';
import { duration, easing } from '../motion/tokens';
import { useNearViewport } from '../motion/hooks';

const DESIGNS: { id: MugDesign; label: string }[] = [
	{ id: 'isologo', label: 'Isologo' },
	{ id: 'monograma', label: 'Monograma' },
	{ id: 'nombre', label: 'Tu nombre' },
];

const STATUS = {
	plain: 'Taza lisa, lista para tu diseño.',
	preview: 'Vista previa. Pulsa «Estampar» para imprimirlo.',
	printed: 'Personalizada. Cambia algo y vuelve a estamparla.',
} as const;

/**
 * ESCENA 05 · PERSONALIZAR — «Hazlo tuyo».
 * Tres estados reales del objeto: lisa → vista previa → estampada (la impresión sube con un destello).
 * Es momento raro y emocional: aquí sí hay un gesto expresivo, pero la interacción es del usuario.
 */
export default function HazloTuyo() {
	const stageRef = useRef<HTMLDivElement>(null);
	const near = useNearViewport(stageRef, '700px');
	const [color, setColor] = useState<MugColor>('marfil');
	const [design, setDesign] = useState<MugDesign>('isologo');
	const [text, setText] = useState('');
	const [stage, setStage] = useState<'plain' | 'preview' | 'printed'>('plain');

	const push = (patch: Partial<typeof rig.mug>) => {
		Object.assign(rig.mug, patch);
		rig.mugChanged();
	};

	const touch = () => {
		if (stage === 'plain') {
			setStage('preview');
			push({ stage: 'preview' });
		}
	};

	const pickColor = (c: MugColor) => {
		setColor(c);
		push({ color: c });
	};
	const pickDesign = (d: MugDesign) => {
		setDesign(d);
		setStage(s => (s === 'plain' ? 'preview' : s));
		push({ design: d, stage: stage === 'plain' ? 'preview' : stage });
	};
	const onText = (v: string) => {
		const t = v.slice(0, NAME_MAX);
		setText(t);
		push({ text: t });
		touch();
	};

	const print = () => {
		setStage('printed');
		push({ stage: 'printed', printedAt: performance.now() });
	};
	const reset = () => {
		setStage('plain');
		push({ stage: 'plain' });
	};

	return (
		<section id='hazlo-tuyo' className='hazlo on-dark' aria-labelledby='hazlo-title'>
			<div className='wrap hazlo__grid'>
				<div className='hazlo__copy'>
					<p className='eyebrow'>04 · Personalizar</p>
					<MotionText id='hazlo-title' className='display section-title' lines={['Hazlo', <em key='t'>tuyo.</em>]} />
					<MotionReveal as='p' className='lead' delay={0.1}>
						Elige la base, elige el diseño y mira cómo un objeto neutro se vuelve personal.
					</MotionReveal>
				</div>

				<MotionReveal className='controls' delay={0.16}>
						<fieldset className='field'>
							<legend>1 · Base</legend>
							<div className='swatches'>
								{(Object.keys(MUG_TONES) as MugColor[]).map(c => (
									<button
										key={c}
										className='swatch'
										style={{ ['--c' as string]: MUG_TONES[c].body }}
										aria-pressed={color === c}
										aria-label={MUG_TONES[c].label}
										onClick={() => pickColor(c)}
									>
										<span>{MUG_TONES[c].label}</span>
									</button>
								))}
							</div>
						</fieldset>

						<fieldset className='field'>
							<legend>2 · Diseño</legend>
							<div className='segments'>
								{DESIGNS.map(d => (
									<button key={d.id} className='chip chip--dark' aria-pressed={design === d.id} onClick={() => pickDesign(d.id)}>
										{d.label}
									</button>
								))}
							</div>
							<AnimatePresence initial={false}>
								{design === 'nombre' && (
									<motion.label
										className='name-input'
										initial={{ opacity: 0, y: -6 }}
										animate={{ opacity: 1, y: 0, transition: { duration: duration.normal, ease: easing.entrance } }}
										exit={{ opacity: 0, transition: { duration: duration.fast, ease: easing.exit } }}
									>
										<span className='sr-only'>Nombre para la taza</span>
										<input
											value={text}
											onChange={e => onText(e.target.value)}
											maxLength={NAME_MAX}
											placeholder='Escribe un nombre'
											autoComplete='off'
											spellCheck={false}
										/>
										<small>
											{text.length}/{NAME_MAX}
										</small>
									</motion.label>
								)}
							</AnimatePresence>
						</fieldset>

						<div className='hazlo__actions'>
							<button className='btn btn--gold' onClick={print}>
								{stage === 'printed' ? 'Estampar de nuevo' : 'Estampar'} <Arrow />
							</button>
							<button className='u-link' onClick={reset} disabled={stage === 'plain'}>
								Quitar diseño
							</button>
						</div>
						<p className='status' role='status'>
							{STATUS[stage]}
						</p>
				</MotionReveal>

				<div
					className='hazlo__stage'
					ref={stageRef}
					onPointerEnter={e => {
						if (e.pointerType === 'mouse') {
							rig.hover = true;
							rig.wake();
						}
					}}
					onPointerLeave={() => {
						rig.hover = false;
						rig.wake();
					}}
				>
					<Stage3D
						kind='mug'
						active={near}
						poster={
							<div className='mug-poster'>
								<img src='/presentacion1/photos/hog-taza-blanca.jpg' alt='Taza esmaltada personalizada con el isologo' />
								<p>La vista 3D no está disponible en este dispositivo.</p>
							</div>
						}
					/>
				</div>
			</div>
		</section>
	);
}
