import { Fragment } from 'react';
import { motion } from 'motion/react';
import { MotionText, VIEWPORT } from '../components/motion';
import { duration, easing } from '../motion/tokens';

/** ESCENA 03 · DESCUBRIR. La idea de marca en una frase; un único titular con reveal por líneas. */
export default function Manifesto() {
	return (
		<section className='manifesto on-light' aria-labelledby='manifesto-title'>
			<div className='wrap manifesto__grid'>
				<p className='eyebrow'>01 · Descubrir</p>
				<div>
					<MotionText
						id='manifesto-title'
						className='display manifesto__title'
						lines={[
							'No vendemos solo objetos.',
							<Fragment key='a'>
								Vendemos formas de <em>vivir</em>,
							</Fragment>,
							<Fragment key='b'>
								<em>vestir</em>, <em>regalar</em> y
							</Fragment>,
							<em key='p'>personalizar.</em>,
						]}
					/>
					<motion.span
						className='manifesto__rule'
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={VIEWPORT}
						transition={{ duration: duration.cinematic, ease: easing.emphasized, delay: 0.5 }}
						aria-hidden
					/>
				</div>
			</div>
		</section>
	);
}
