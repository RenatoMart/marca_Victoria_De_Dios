// src/components/Presentation.tsx - Componente de presentación animada tipo diapositivas
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import '../styles/Presentation.css';

interface PresentationProps {
	title: string;
	paragraphs: string[];
}

function Presentation({ title, paragraphs }: PresentationProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const paragraphRefs = useRef<HTMLParagraphElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		// Animación del título
		anime({
			targets: titleRef.current,
			translateX: [-100, 0],
			opacity: [0, 1],
			duration: 800,
			easing: 'easeOutQuad',
		});

		// Animación de párrafos como diapositivas
		anime({
			targets: paragraphRefs.current,
			translateX: [200, 0],
			opacity: [0, 1],
			delay: anime.stagger(500, { start: 1000 }),
			duration: 600,
			easing: 'easeOutQuad',
		});
	}, []);

	return (
		<div ref={containerRef} className='presentation-container'>
			<h2 ref={titleRef} className='presentation-title'>
				{title}
			</h2>
			{paragraphs.map((paragraph, index) => (
				<p
					key={index}
					ref={el => {
						if (el) paragraphRefs.current[index] = el;
					}}
					className='presentation-text'
				>
					{paragraph}
				</p>
			))}
		</div>
	);
}

export default Presentation;
