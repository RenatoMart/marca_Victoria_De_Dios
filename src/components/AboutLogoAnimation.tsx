// src/components/AboutLogoAnimation.tsx
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import '../styles/AboutLogoAnimation.css';

function AboutLogoAnimation() {
	const containerRef = useRef<HTMLDivElement>(null);
	const lettersRef = useRef<HTMLSpanElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		// ensure refs array is fresh
		lettersRef.current = lettersRef.current.slice(
			0,
			containerRef.current.querySelectorAll('.about-logo-letter').length,
		);

		// Entrance animation (no rotate, no translateX)
		anime({
			targets: lettersRef.current,
			translateY: [100, 0],
			opacity: [0, 1],
			scale: [0.3, 1],
			delay: anime.stagger(80, { start: 300 }),
			duration: 1200,
			easing: 'easeOutElastic(1, .8)',
		});

		// Continuous vertical bounce only
		anime({
			targets: lettersRef.current,
			translateY: [
				{ value: -20, duration: 600 },
				{ value: 0, duration: 600 },
			],
			delay: anime.stagger(100, { start: 2000 }),
			loop: true,
			easing: 'easeInOutQuad',
		});

		// Subtle color change
		anime({
			targets: lettersRef.current,
			color: [{ value: '#2c3e50' }, { value: '#34495e' }, { value: '#2c3e50' }],
			duration: 4000,
			delay: anime.stagger(150, { start: 2000 }),
			loop: true,
			easing: 'linear',
		});
	}, []);

	const text1 = 'SOBRE';
	const text2 = 'NOSOTROS';

	return (
		<div ref={containerRef} className='about-logo-animation-container'>
			<div className='about-logo-wrapper'>
				<div className='about-logo-line'>
					{text1.split('').map((letter, index) => (
						<span
							key={`line1-${index}`}
							ref={el => {
								if (el) lettersRef.current[index] = el;
							}}
							className='about-logo-letter'
						>
							{letter}
						</span>
					))}
				</div>
				<div className='about-logo-line'>
					{text2.split('').map((letter, index) => (
						<span
							key={`line2-${index}`}
							ref={el => {
								if (el) lettersRef.current[text1.length + index] = el;
							}}
							className='about-logo-letter'
						>
							{letter}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

export default AboutLogoAnimation;
