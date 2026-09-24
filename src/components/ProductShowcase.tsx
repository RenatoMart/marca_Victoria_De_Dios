// src/components/ProductShowcase.tsx - Componente con AnimeJS
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import '../styles/ProductShowcase.css';

function ProductShowcase() {
	const showcaseRef = useRef<HTMLDivElement>(null);
	const circlesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Animación de entrada del showcase
		if (showcaseRef.current) {
			anime({
				targets: showcaseRef.current,
				opacity: [0, 1],
				translateY: [50, 0],
				duration: 1200,
				easing: 'easeOutExpo',
			});
		}

		// Animación de círculos flotantes
		if (circlesRef.current) {
			const circles = circlesRef.current.querySelectorAll('.circle');

			anime({
				targets: circles,
				translateY: [
					{ value: -30, duration: 2000 },
					{ value: 0, duration: 2000 },
				],
				translateX: [
					{ value: 20, duration: 2000 },
					{ value: -20, duration: 2000 },
					{ value: 0, duration: 2000 },
				],
				opacity: [
					{ value: 0.8, duration: 2000 },
					{ value: 0.3, duration: 2000 },
				],
				delay: anime.stagger(200),
				loop: true,
				easing: 'easeInOutSine',
			});
		}
	}, []);

	return (
		<div ref={showcaseRef} className='product-showcase'>
			<div ref={circlesRef} className='floating-circles'>
				<div className='circle circle-1'></div>
				<div className='circle circle-2'></div>
				<div className='circle circle-3'></div>
				<div className='circle circle-4'></div>
			</div>
			<div className='showcase-content'>
				<h2 className='showcase-title'>🎉 Ofertas Especiales</h2>
				<p className='showcase-description'>
					Descuentos increíbles en productos seleccionados
				</p>
			</div>
		</div>
	);
}

export default ProductShowcase;
