import Mark, { PAINT } from '../Mark';
import { Art, Place, Scene } from '../Scene';
import type { MockupItem } from '../types';

const BG_IVORY = 'radial-gradient(120% 90% at 50% 18%, #fffdf8 0%, #f3ede0 62%, #e6dcc5 100%)';
const BG_ONYX = 'radial-gradient(120% 90% at 50% 15%, #2b2b2d 0%, #1a1a1c 62%, #0c0c0d 100%)';
const BG_NAVY = 'radial-gradient(120% 90% at 50% 18%, #29344e 0%, #1a2338 62%, #0f1420 100%)';
const BG_KRAFT = 'radial-gradient(120% 90% at 50% 18%, #efe3cd 0%, #ddc9a2 62%, #c7ac7e 100%)';

const FONT_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
const FONT_CAPS = "'Cinzel', 'Trajan Pro', serif";

function BusinessCardPair() {
	return (
		<Scene bg={BG_ONYX}>
			<Art>
				<defs>
					<linearGradient id='bc-front' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#242426' />
						<stop offset='1' stopColor='#0c0c0d' />
					</linearGradient>
					<linearGradient id='bc-back' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#faf6ec' />
						<stop offset='1' stopColor='#eee6d4' />
					</linearGradient>
					<filter id='bc-shadow' x='-60%' y='-60%' width='220%' height='220%'>
						<feGaussianBlur stdDeviation='5' />
					</filter>
				</defs>
				{/* tarjeta trasera (ivory) */}
				<g transform='translate(238,182) rotate(7)'>
					<rect x='-76' y='-46' width='152' height='92' rx='7' fill='#000' opacity='0.35' filter='url(#bc-shadow)' />
					<rect x='-76' y='-46' width='152' height='92' rx='7' fill='url(#bc-back)' />
					<line x1='-58' y1='-14' x2='40' y2='-14' stroke={PAINT.navy} strokeWidth='0.6' opacity='0.55' />
					<line x1='-58' y1='-2' x2='30' y2='-2' stroke={PAINT.navy} strokeWidth='0.6' opacity='0.35' />
					<line x1='-58' y1='10' x2='46' y2='10' stroke={PAINT.navy} strokeWidth='0.6' opacity='0.35' />
					<text x='-58' y='30' fontFamily={FONT_CAPS} fontSize='6' letterSpacing='1' fill={PAINT.navy} opacity='0.6'>
						VICTORIADEDIOS.COM
					</text>
				</g>
				{/* tarjeta frontal (negra) */}
				<g transform='translate(168,152) rotate(-8)'>
					<rect x='-76' y='-46' width='152' height='92' rx='7' fill='#000' opacity='0.45' filter='url(#bc-shadow)' />
					<rect x='-76' y='-46' width='152' height='92' rx='7' fill='url(#bc-front)' />
					<line x1='-40' y1='18' x2='40' y2='18' stroke={PAINT.gold} strokeWidth='0.5' opacity='0.7' />
					<text x='0' y='30' textAnchor='middle' fontFamily={FONT_CAPS} fontSize='5.5' letterSpacing='1.6' fill={PAINT.goldLight} opacity='0.85'>
						LIFESTYLE &amp; HOME
					</text>
				</g>
			</Art>
			<Place x={92} y={106} w={54} rotate={-8}>
				<Mark kind='symbol' mono={PAINT.gold} finish='foil' />
			</Place>
			<Place x={280} y={148} w={26} rotate={7}>
				<Mark kind='symbol' mono='#d8cdb3' finish='deboss' />
			</Place>
		</Scene>
	);
}

function ThankYouCard() {
	return (
		<Scene bg={BG_NAVY}>
			<Art>
				<defs>
					<linearGradient id='ty-card' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#fffdf7' />
						<stop offset='1' stopColor='#f1e9d8' />
					</linearGradient>
					<linearGradient id='ty-env' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#e4d3ac' />
						<stop offset='1' stopColor='#d2bd8c' />
					</linearGradient>
				</defs>
				<ellipse cx='210' cy='266' rx='150' ry='13' fill='rgba(0,0,0,0.28)' />
				{/* sobre detrás */}
				<g transform='translate(258,176) rotate(9)'>
					<rect x='-78' y='-52' width='156' height='104' fill='url(#ty-env)' />
					<polygon points='-78,-52 78,-52 0,-4' fill='#c3ac7c' />
					<line x1='-78' y1='-52' x2='0' y2='-4' stroke='rgba(0,0,0,0.08)' />
					<line x1='78' y1='-52' x2='0' y2='-4' stroke='rgba(0,0,0,0.08)' />
				</g>
				{/* tarjeta al frente */}
				<g transform='translate(178,152) rotate(-5)'>
					<rect x='-70' y='-92' width='140' height='184' fill='url(#ty-card)' />
					<line x1='-70' y1='0' x2='70' y2='0' stroke='rgba(0,0,0,0.06)' />
					<text x='0' y='58' textAnchor='middle' fontFamily={FONT_DISPLAY} fontStyle='italic' fontSize='17' fill={PAINT.navy}>
						Gracias
					</text>
				</g>
			</Art>
			<Place x={148} y={94} w={60}>
				<Mark kind='symbol' mono={PAINT.navy} finish='print' />
			</Place>
			<Place x={244} y={148} w={26} rotate={9}>
				<Mark kind='symbol' mono={PAINT.gold} finish='print' style={{ opacity: 0.85 }} />
			</Place>
		</Scene>
	);
}

function HangTag() {
	return (
		<Scene bg={BG_IVORY}>
			<Art>
				<defs>
					<linearGradient id='tag-face' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#232325' />
						<stop offset='1' stopColor='#0c0c0d' />
					</linearGradient>
					<filter id='tag-shadow' x='-60%' y='-60%' width='220%' height='220%'>
						<feGaussianBlur stdDeviation='4' />
					</filter>
				</defs>
				<g transform='translate(200,168) rotate(-7)'>
					<ellipse cx='6' cy='104' rx='58' ry='10' fill='rgba(0,0,0,0.16)' />
					{/* cordón */}
					<path d='M-2,-70 C-2,-96 10,-118 34,-128' fill='none' stroke='#c4b28a' strokeWidth='2.2' strokeLinecap='round' />
					<path d='M34,-128 C50,-134 58,-128 58,-118' fill='none' stroke='#c4b28a' strokeWidth='2.2' strokeLinecap='round' />
					<rect x='-32' y='-58' width='64' height='96' rx='10' fill='#000' opacity='0.3' filter='url(#tag-shadow)' />
					<rect x='-32' y='-58' width='64' height='96' rx='10' fill='url(#tag-face)' />
					<circle cx='0' cy='-42' r='5' fill='none' stroke='#c4b28a' strokeWidth='2.4' />
					<circle cx='0' cy='-42' r='2' fill='#0a0a0a' />
					<line x1='-20' y1='24' x2='20' y2='24' stroke={PAINT.gold} strokeWidth='0.5' opacity='0.6' />
					<text x='0' y='34' textAnchor='middle' fontFamily={FONT_CAPS} fontSize='4.6' letterSpacing='1.2' fill={PAINT.goldLight} opacity='0.8'>
						HECHO A MANO
					</text>
				</g>
			</Art>
			<Place x={172} y={120} w={56} rotate={-7}>
				<Mark kind='symbol' mono={PAINT.gold} finish='foil' />
			</Place>
		</Scene>
	);
}

function LetterheadEnvelope() {
	const lines = [0, 1, 2, 3, 4];
	return (
		<Scene bg={BG_KRAFT}>
			<Art>
				<defs>
					<linearGradient id='lh-sheet' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#fffdf8' />
						<stop offset='1' stopColor='#f2ebda' />
					</linearGradient>
					<linearGradient id='lh-env' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#e9dcb9' />
						<stop offset='1' stopColor='#d7c294' />
					</linearGradient>
				</defs>
				<ellipse cx='210' cy='272' rx='160' ry='12' fill='rgba(0,0,0,0.18)' />
				<g transform='translate(268,214) rotate(10)'>
					<rect x='-78' y='-48' width='156' height='96' fill='url(#lh-env)' />
					<polygon points='-78,-48 78,-48 0,2' fill='#c9b482' />
				</g>
				<g transform='translate(180,150) rotate(-3)'>
					<rect x='-92' y='-118' width='184' height='236' fill='url(#lh-sheet)' />
					<line x1='-92' y1='-52' x2='92' y2='-52' stroke={PAINT.navy} strokeWidth='0.6' opacity='0.4' />
					{lines.map((i) => (
						<rect key={i} x={-92} y={-30 + i * 14} width={i === lines.length - 1 ? 90 : 170} height='2.4' fill='#c9c2b0' />
					))}
				</g>
			</Art>
			<Place x={148} y={44} w={64}>
				<Mark kind='isologo' mono={PAINT.navy} finish='print' />
			</Place>
			<Place x={252} y={196} w={24} rotate={10}>
				<Mark kind='symbol' mono={PAINT.navy} finish='print' style={{ opacity: 0.8 }} />
			</Place>
		</Scene>
	);
}

function StickerSheet() {
	const cells = [
		{ x: 128, y: 104 }, { x: 200, y: 100 }, { x: 272, y: 106 },
		{ x: 126, y: 168 }, { x: 200, y: 166 }, { x: 274, y: 170 },
		{ x: 128, y: 232 }, { x: 200, y: 230 },
	];
	return (
		<Scene>
			<Art>
				<defs>
					<radialGradient id='stk-navy' cx='0.35' cy='0.3' r='0.85'>
						<stop offset='0' stopColor='#2c3956' />
						<stop offset='1' stopColor='#151d2e' />
					</radialGradient>
				</defs>
				<ellipse cx='202' cy='266' rx='168' ry='12' fill='rgba(0,0,0,0.14)' />
				<rect x='42' y='58' width='320' height='212' rx='6' fill='#fbf8f2' />
				{cells.map((c) => (
					<circle key={`${c.x}-${c.y}`} cx={c.x} cy={c.y} r='27' fill='none' stroke='#c9c2b0' strokeDasharray='2 2' />
				))}
				{cells.slice(0, 7).map((c, i) => (
					<circle key={`${c.x}-${c.y}`} cx={c.x} cy={c.y} r='24' fill={i % 2 === 0 ? 'url(#stk-navy)' : '#ffffff'} stroke='#d8d0bb' />
				))}
				{/* etiqueta despegada, esquina inferior derecha */}
				<g transform='translate(292,240) rotate(14)'>
					<circle cx='4' cy='4' r='26' fill='rgba(0,0,0,0.16)' />
					<circle cx='0' cy='0' r='24' fill='url(#stk-navy)' stroke='#d8d0bb' />
				</g>
				<circle cx='274' cy='232' r='24' fill='none' stroke='#d8d0bb' strokeDasharray='2 2' />
			</Art>
			{cells.slice(0, 7).map((c, i) => (
				<Place key={`${c.x}-${c.y}`} x={c.x - 15} y={c.y - 14} w={30}>
					<Mark kind='symbol' mono={i % 2 === 0 ? PAINT.gold : PAINT.navy} finish='print' />
				</Place>
			))}
			<Place x={278} y={226} w={30} rotate={14}>
				<Mark kind='symbol' mono={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

function OrderCardNotebook() {
	return (
		<Scene bg={BG_IVORY}>
			<Art>
				<defs>
					<linearGradient id='ord-front' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#26314a' />
						<stop offset='1' stopColor='#141b2a' />
					</linearGradient>
					<linearGradient id='ord-spine' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#0c111c' />
						<stop offset='1' stopColor='#1a2334' />
					</linearGradient>
					<linearGradient id='ord-pen' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#0c0c0d' />
						<stop offset='0.5' stopColor='#2c2c2e' />
						<stop offset='1' stopColor='#0c0c0d' />
					</linearGradient>
				</defs>
				<ellipse cx='202' cy='260' rx='108' ry='12' fill='rgba(0,0,0,0.18)' />
				<polygon points='266,84 292,72 292,238 266,252' fill='url(#ord-spine)' />
				<rect x='136' y='90' width='130' height='162' fill='url(#ord-front)' />
				{/* banda elástica */}
				<rect x='196' y='90' width='10' height='162' fill={PAINT.gold} opacity='0.85' />
				<ellipse cx='279' cy='166' rx='6' ry='9' fill={PAINT.gold} opacity='0.85' />
				{/* pluma */}
				<rect x='250' y='96' width='6' height='72' rx='3' fill='url(#ord-pen)' transform='rotate(8 253 132)' />
			</Art>
			<Place x={158} y={128} w={68}>
				<Mark kind='symbol' mono={PAINT.gold} finish='foil' />
			</Place>
		</Scene>
	);
}

export const stationery: MockupItem[] = [
	{
		id: 'business-card-pair',
		title: 'Tarjetas de presentación',
		category: 'papeleria',
		technique: 'Hot stamping dorado + relieve seco',
		material: 'Algodón 600g, negro e ivory',
		note: 'Frente negro con foil dorado; reverso ivory con monograma en relieve.',
		Scene: BusinessCardPair,
	},
	{
		id: 'thank-you-card',
		title: 'Tarjeta de agradecimiento',
		category: 'papeleria',
		technique: 'Impresión offset + termografía',
		material: 'Cartulina ivory 300g con sobre kraft',
		note: 'Se incluye en cada pedido como detalle personal de la marca.',
		Scene: ThankYouCard,
	},
	{
		id: 'hang-tag',
		title: 'Etiqueta colgante',
		category: 'papeleria',
		technique: 'Hot stamping dorado',
		material: 'Cartulina negra 400g con cordón',
		note: 'Se usa en prendas y accesorios; el cordón puede ir en hilo dorado o negro.',
		Scene: HangTag,
	},
	{
		id: 'letterhead-envelope',
		title: 'Hoja membretada y sobre',
		category: 'papeleria',
		technique: 'Impresión offset 1 tinta',
		material: 'Papel ivory 120g, sobre a juego',
		note: 'Para correspondencia formal y comunicados de la marca.',
		Scene: LetterheadEnvelope,
	},
	{
		id: 'sticker-sheet',
		title: 'Plancha de stickers',
		category: 'papeleria',
		technique: 'Impresión digital + troquelado',
		material: 'Vinilo/papel autoadhesivo',
		note: 'Sellado de cajas y detalle promocional de bajo costo.',
		Scene: StickerSheet,
	},
	{
		id: 'order-card-notebook',
		title: 'Libreta con cierre elástico',
		category: 'papeleria',
		technique: 'Hot stamping dorado',
		material: 'Tapa dura forrada, azul marino',
		note: 'Regalo corporativo o libreta de pedidos en tienda.',
		Scene: OrderCardNotebook,
	},
];
