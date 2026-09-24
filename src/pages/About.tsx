// src/pages/About.tsx - Página Sobre Nosotros con animación AnimeJS
import AboutLogoAnimation from '../components/AboutLogoAnimation';
import Presentation from '../components/Presentation';
import '../styles/About.css';

function About() {
	return (
		<div className='about-container'>
			<div className='about-hero'>
				<AboutLogoAnimation />
			</div>

			<div className='about-content'>
				<Presentation
					title='Nuestra Historia'
					paragraphs={[
						'TechStore Pro nació con la visión de democratizar el acceso a la tecnología de última generación. Desde nuestros inicios, nos hemos comprometido a ofrecer productos de la más alta calidad a precios competitivos, siempre con un servicio al cliente excepcional.',
						'Nuestro equipo está compuesto por entusiastas de la tecnología que entienden las necesidades de nuestros clientes. Ya sea que busques un laptop para gaming, un smartphone de última generación o accesorios premium, en TechStore Pro encontrarás exactamente lo que necesitas.',
						'Nos enorgullece mantener un catálogo actualizado con las últimas innovaciones del mercado, trabajando directamente con los principales fabricantes para garantizar autenticidad y garantías extendidas en todos nuestros productos.',
					]}
				/>

				<div className='about-features'>
					<div className='feature-card'>
						<span className='feature-icon'>⚡</span>
						<h3 className='feature-title'>Envío Rápido</h3>
						<p className='feature-description'>
							Entrega en 24-48 horas en la mayoría de las zonas. Tu tecnología
							cuando la necesitas.
						</p>
					</div>

					<div className='feature-card'>
						<span className='feature-icon'>🛡️</span>
						<h3 className='feature-title'>Garantía Extendida</h3>
						<p className='feature-description'>
							Todos nuestros productos incluyen garantía del fabricante más
							nuestra garantía de satisfacción.
						</p>
					</div>

					<div className='feature-card'>
						<span className='feature-icon'>💬</span>
						<h3 className='feature-title'>Soporte 24/7</h3>
						<p className='feature-description'>
							Nuestro equipo está disponible en todo momento para resolver tus
							dudas y asistirte.
						</p>
					</div>

					<div className='feature-card'>
						<span className='feature-icon'>💳</span>
						<h3 className='feature-title'>Pago Seguro</h3>
						<p className='feature-description'>
							Procesamos tus pagos con los más altos estándares de seguridad y
							encriptación.
						</p>
					</div>
				</div>

				<div className='about-team'>
					<h2 className='team-title'>Nuestro Equipo</h2>
					<div className='team-grid'>
						<div className='team-member'>
							<div className='member-avatar'>A</div>
							<h3 className='member-name'>Ana García</h3>
							<p className='member-role'>CEO y Fundadora</p>
						</div>

						<div className='team-member'>
							<div className='member-avatar'>C</div>
							<h3 className='member-name'>Carlos Ruiz</h3>
							<p className='member-role'>Director de Tecnología</p>
						</div>

						<div className='team-member'>
							<div className='member-avatar'>M</div>
							<h3 className='member-name'>María López</h3>
							<p className='member-role'>Gerente de Ventas</p>
						</div>

						<div className='team-member'>
							<div className='member-avatar'>J</div>
							<h3 className='member-name'>Juan Torres</h3>
							<p className='member-role'>Atención al Cliente</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
