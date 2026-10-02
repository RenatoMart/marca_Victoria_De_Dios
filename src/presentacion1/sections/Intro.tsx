import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { duration, easing } from '../motion/tokens';
import { useReduced } from '../motion/hooks';

const KEY = 'vd-intro-seen';
const seen = () => {
	try {
		return sessionStorage.getItem(KEY) === '1';
	} catch {
		return false;
	}
};

/**
 * ESCENA 01 · Revelado de marca.
 * El isologo se «descubre» (recorte ascendente + un destello de foil que cruza una sola vez),
 * después el telón sube y deja ver el hero. No es un preloader: no espera ningún recurso
 * artificialmente; dura ~2 s, solo una vez por sesión, y se omite con movimiento reducido.
 */
export default function Intro({ onReveal }: { onReveal: () => void }) {
	const reduced = useReduced();
	const [phase, setPhase] = useState<'brand' | 'lift' | 'done'>(() =>
		reduced || seen() ? 'done' : 'brand',
	);

	useEffect(() => {
		if (phase === 'done') {
			onReveal();
			return;
		}
		document.body.classList.add('is-locked');
		const lift = window.setTimeout(() => {
			setPhase('lift');
			onReveal();
		}, 1550);
		const done = window.setTimeout(() => {
			setPhase('done');
			document.body.classList.remove('is-locked');
			try {
				sessionStorage.setItem(KEY, '1');
			} catch {
				/* sin almacenamiento: se repetirá, no pasa nada */
			}
		}, 1550 + duration.cinematic * 1000 + 80);
		return () => {
			window.clearTimeout(lift);
			window.clearTimeout(done);
			document.body.classList.remove('is-locked');
		};
		// onReveal es estable (setState); la secuencia solo debe armarse una vez.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (phase === 'done') return null;

	return (
		<motion.div
			className='intro'
			aria-hidden='true'
			initial={{ y: '0%' }}
			animate={{ y: phase === 'lift' ? '-100%' : '0%' }}
			transition={{ duration: duration.cinematic, ease: easing.emphasized }}
		>
			<div className='intro__inner'>
				<motion.div
					className='intro__mark'
					initial={{ clipPath: 'inset(100% 0% 0% 0%)', y: 18 }}
					animate={{ clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
					transition={{ duration: 0.95, ease: easing.entrance, delay: 0.1 }}
				>
					<span className='intro__foil' />
				</motion.div>
				<motion.div
					className='intro__word'
					initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
					animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
					transition={{ duration: 0.8, ease: easing.entrance, delay: 0.55 }}
				/>
				<motion.p
					className='intro__tag'
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: duration.slow, ease: easing.entrance, delay: 0.9 }}
				>
					Lifestyle &amp; Home
				</motion.p>
			</div>
		</motion.div>
	);
}
