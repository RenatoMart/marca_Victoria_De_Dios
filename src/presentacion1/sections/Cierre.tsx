import { Arrow, MotionImage, MotionReveal, MotionText } from '../components/motion';
import { BRAND } from '../content/brand';

/** ESCENA 06 · COMPRAR. Cierre: la caja abierta es la promesa de lo que sigue. */
export default function Cierre() {
	return (
		<section id='contacto' className='cierre on-dark' aria-labelledby='cierre-title'>
			<div className='cierre__media'>
				<MotionImage src='/presentacion1/photos/unboxing-empaque.jpg' alt='Caja de envío kraft abierta con papel de seda y tarjeta' reveal='up' parallax={6} slow />
				<div className='cierre__shade' aria-hidden />
			</div>
			<div className='wrap cierre__content'>
				<p className='eyebrow'>05 · Llévalo a casa</p>
				<MotionText id='cierre-title' className='display cierre__title' lines={['Elige.', 'Personaliza.', <em key='r'>Regala.</em>]} />
				<MotionReveal as='p' className='lead' delay={0.1}>
					Cuéntanos qué tienes en mente y lo convertimos en algo con tu firma.
				</MotionReveal>
				<MotionReveal delay={0.18} className='cierre__cta'>
					<a className='btn btn--gold' href={BRAND.contactHref}>
						{BRAND.contactLabel} <Arrow />
					</a>
					<a className='u-link' href='#coleccion'>
						Volver a la colección
					</a>
				</MotionReveal>
			</div>

			<footer className='footer'>
				<div className='wrap footer__row'>
					<span className='footer__word' role='img' aria-label='Victoria de Dios' />
					<p>© {new Date().getFullYear()} Victoria de Dios · Lifestyle &amp; Home</p>
					<a className='u-link' href='#top'>
						Volver arriba
					</a>
				</div>
			</footer>
		</section>
	);
}
