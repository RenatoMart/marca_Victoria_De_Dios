// src/components/LogoAnimation.tsx - Logo animado simple con AnimeJS
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import '../styles/LogoAnimation.css';

function LogoAnimation() {
	const containerRef = useRef<HTMLDivElement>(null);
	const lettersRef = useRef<HTMLSpanElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		// Animación de entrada de las letras
		anime({
			targets: lettersRef.current,
			translateY: [50, 0],
			opacity: [0, 1],
			scale: [0.8, 1],
			delay: anime.stagger(100, { start: 200 }),
			duration: 1000,
			easing: 'easeOutExpo',
		});

		// Animación de pulso muy sutil
		anime({
			targets: lettersRef.current,
			scale: [1, 1.05, 1],
			duration: 3000,
			delay: anime.stagger(150),
			loop: true,
			easing: 'easeInOutSine',
		});

		// Cambio sutil de tono gris
		anime({
			targets: lettersRef.current,
			color: [{ value: '#2c3e50' }, { value: '#34495e' }, { value: '#2c3e50' }],
			duration: 6000,
			delay: anime.stagger(300),
			loop: true,
			easing: 'linear',
		});
	}, []);

	const text = 'STORE';

	return (
		<div ref={containerRef} className='logo-animation-container'>
			<div className='logo-text'>
				{text.split('').map((letter, index) => (
					<span
						key={index}
						ref={el => {
							if (el) lettersRef.current[index] = el;
						}}
						className='logo-letter'
					>
						{letter}
					</span>
				))}
			</div>
		</div>
	);
}

export default LogoAnimation;
