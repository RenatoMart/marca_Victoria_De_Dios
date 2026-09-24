// src/components/Header.tsx - Componente React puro
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
	const location = useLocation();

	return (
		<header className='header'>
			<div className='header-logo'>
				<span className='header-icon'>■</span>
				<h1 className='header-title'>TechStore Pro</h1>
			</div>
			<nav className='header-nav'>
				<Link
					to='/'
					className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
				>
					Inicio
				</Link>
				<Link
					to='/about'
					className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
				>
					Acerca de
				</Link>
			</nav>
		</header>
	);
}

export default Header;
