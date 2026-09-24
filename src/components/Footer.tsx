// src/components/Footer.tsx - Componente React puro
import '../styles/Footer.css';

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='footer'>
			<div className='footer-container'>
				<div className='footer-sections'>
					<div className='footer-section'>
						<h3 className='footer-title'>Contacto</h3>
						<p className='footer-text'>info@techstorepro.com</p>
						<p className='footer-text'>+1 (555) 123-4567</p>
					</div>
					<div className='footer-section'>
						<h3 className='footer-title'>Redes Sociales</h3>
						<div className='footer-social'>
							<a href='#' className='footer-link'>
								Facebook
							</a>
							<a href='#' className='footer-link'>
								Twitter
							</a>
							<a href='#' className='footer-link'>
								Instagram
							</a>
						</div>
					</div>
					<div className='footer-section'>
						<h3 className='footer-title'>Ubicación</h3>
						<p className='footer-text'>Silicon Valley, CA</p>
						<p className='footer-text'>1234 Tech Street</p>
					</div>
				</div>
				<div className='footer-bottom'>
					<p className='footer-copyright'>
						&copy; {currentYear} TechStore Pro. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
