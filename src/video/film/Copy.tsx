import { Caption, MarkImage, type Line } from './Caption';
import type { SceneId } from '../timeline';

/* Tipografía del anuncio: Cormorant Garamond para la voz de marca, Jost para los datos. */
const INK = '#1f2a3e';
const SOFT = '#5e6472';
const GOLD = '#d8bd7e';
const IVORY = 'rgba(245, 240, 230, 0.72)';

const display = (text: string, size = 84, color = INK): Line => ({
	text,
	weight: '400',
	family: '"Cormorant Garamond"',
	size,
	color,
});
const body = (text: string, size = 30, color = SOFT): Line => ({
	text,
	weight: '300',
	family: '"Jost"',
	size,
	color,
	gap: 6,
});
const caps = (text: string, size = 22, color = SOFT): Line => ({
	text,
	weight: '500',
	family: '"Jost"',
	size,
	color,
	tracking: 0.24,
	upper: true,
});

// Las líneas se definen una vez (constantes) para que las texturas no se regeneren.
const UNIVERSO = [
	display('Un universo para vivir,', 78),
	display('vestir y regalar.', 78),
];
const HOGAR = [
	display('Hogar', 112),
	body('Detalles útiles y bonitos'),
	body('para cada rincón.'),
];
const ESTILO = [
	display('Estilo de vida', 112),
	body('Para dama, caballero y niños.'),
];
const HAZLO = [
	display('Hazlo tuyo', 112),
	body('Tazas, tomatodos y regalos con tu diseño.'),
];
const PASO_1 = [caps('01 · Tu diseño')];
const PASO_2 = [caps('02 · Calor y presión')];
const PASO_3 = [caps('03 · Para siempre')];
const REGALO = [
	display('Con cuidado', 112),
	body('Cada pedido llega como un regalo.'),
	caps('Envíos a todo el Perú', 22, INK),
];
const LEMA = [display('Vive, viste, regala.', 54, GOLD)];
const WEB = [caps('victoriadedios.vercel.app', 20, IVORY)];

/** Textos de cada escena (los tiempos son absolutos, en segundos del video). */
export function SceneCopy({ id }: { id: SceneId }) {
	switch (id) {
		case 'apertura':
			return (
				<MarkImage
					src='/brand/wordmark-mask.png'
					color={GOLD}
					width={600}
					ratio={964 / 169}
					x={960}
					y={790}
					in={2.2}
					out={5.0}
					revealDur={1.3}
				/>
			);
		case 'universo':
			return <Caption lines={UNIVERSO} x={150} y={800} in={6.5} out={10.4} />;
		case 'hogar':
			return <Caption lines={HOGAR} x={150} y={400} in={12.6} out={17.4} />;
		case 'estilo':
			return <Caption lines={ESTILO} x={150} y={96} in={19.6} out={24.4} />;
		case 'personalizados':
			return (
				<>
					<Caption lines={HAZLO} x={150} y={360} in={25.6} out={33.4} />
					<Caption
						lines={PASO_1}
						x={154}
						y={600}
						in={26.5}
						out={28.9}
						revealDur={0.7}
					/>
					<Caption
						lines={PASO_2}
						x={154}
						y={600}
						in={29.4}
						out={30.9}
						revealDur={0.7}
					/>
					<Caption
						lines={PASO_3}
						x={154}
						y={600}
						in={31.3}
						out={33.4}
						revealDur={0.7}
					/>
				</>
			);
		case 'regalo':
			return <Caption lines={REGALO} x={150} y={96} in={35.0} out={39.5} />;
		case 'cierre':
			return (
				<>
					<MarkImage
						src='/brand/wordmark-mask.png'
						color={GOLD}
						width={640}
						ratio={964 / 169}
						x={960}
						y={770}
						in={41.5}
						revealDur={1.4}
					/>
					<Caption lines={LEMA} x={960} y={900} align='center' in={42.7} />
					<Caption lines={WEB} x={960} y={986} align='center' in={43.6} />
				</>
			);
	}
}
