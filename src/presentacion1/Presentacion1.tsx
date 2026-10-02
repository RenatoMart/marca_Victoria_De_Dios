import { useCallback, useEffect, useState } from 'react';
import { MotionConfig, useMotionValueEvent, useScroll } from 'motion/react';
import { ScrollProgress } from './components/motion';
import { bindPointer, rig } from './components/three/rig';
import { useReduced } from './motion/hooks';
import Cierre from './sections/Cierre';
import Coleccion from './sections/Coleccion';
import Explora from './sections/Explora';
import HazloTuyo from './sections/HazloTuyo';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Manifesto from './sections/Manifesto';
import Nav from './sections/Nav';

export default function App() {
	const reduced = useReduced();
	const [revealed, setRevealed] = useState(false);
	const [light, setLight] = useState(false);
	const { scrollY } = useScroll();

	// El telón sube (o se omite): empieza la coreografía del hero y «se encienden las luces» del 3D.
	const reveal = useCallback(() => {
		setRevealed(true);
		rig.entered = true;
		rig.wake();
	}, []);

	useEffect(() => {
		rig.reduced = reduced;
		bindPointer();
		rig.wake();
	}, [reduced]);

	// La navegación cambia a tinta azul cuando la cortina clara ya cubre el hero.
	useMotionValueEvent(scrollY, 'change', v => setLight(v > window.innerHeight * 0.9));

	return (
		<MotionConfig reducedMotion='user'>
			<a className='skip' href='#explora'>
				Saltar al contenido
			</a>
			<ScrollProgress />
			<Intro onReveal={reveal} />
			<Nav light={light} />
			<Hero revealed={revealed} />
			<main className='curtain'>
				<Manifesto />
				<Explora />
				<Coleccion />
				<HazloTuyo />
				<Cierre />
			</main>
		</MotionConfig>
	);
}
