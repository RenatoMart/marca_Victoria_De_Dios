// src/utils/anime-runner.js

// ⬅️ Importamos la ruta directa para evitar problemas de resolución en Vite/TS
import anime from 'animejs/lib/anime.es.js';

export const runEntranceAnimation = (
	targetRef?: HTMLElement | null,
	delay = 0,
) => {
	if (!targetRef) return;
	anime({
		targets: targetRef,
		translateY: [50, 0],
		opacity: [0, 1],
		duration: 800,
		delay,
		easing: 'easeOutExpo',
	});
};

export const runLoopAnimation = (targetRef?: HTMLElement | null) => {
	if (!targetRef) return;
	anime({
		targets: targetRef,
		rotate: [0, 10, 0],
		duration: 1500,
		easing: 'easeInOutQuad',
		loop: true,
	});
};

export const runHoverAnimation = (
	targetRef: HTMLElement | null,
	isEntering: boolean,
) => {
	if (!targetRef) return;
	anime({
		targets: targetRef,
		scale: isEntering ? 1.05 : 1,
		boxShadow: isEntering
			? '0 8px 24px rgba(0,0,0,0.15)'
			: '0 2px 12px rgba(0,0,0,0.08)',
		duration: 300,
		easing: 'easeOutQuad',
	});
};
