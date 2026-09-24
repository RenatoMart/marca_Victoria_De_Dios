import Mark, { PAINT } from '../Mark';
import { Art, Place, Scene } from '../Scene';
import type { MockupItem } from '../types';

function StructuredHandbag() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 12%, #333336 0%, #1c1c1e 65%, #0f0f10 100%)'>
			<Art>
				<defs>
					<linearGradient id='bag-leather' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#3a3a3d' />
						<stop offset='0.5' stopColor='#1e1e20' />
						<stop offset='1' stopColor='#0c0c0d' />
					</linearGradient>
					<linearGradient id='bag-side' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#141416' />
						<stop offset='1' stopColor='#050505' />
					</linearGradient>
					<linearGradient id='bag-plaque' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#f3dfa0' />
						<stop offset='0.45' stopColor='#ae8c46' />
						<stop offset='1' stopColor='#7a5f2c' />
					</linearGradient>
				</defs>
				<ellipse cx='202' cy='253' rx='108' ry='13' fill='rgba(0,0,0,0.35)' />
				{/* asas */}
				<path d='M162,120 C162,74 178,58 200,58 C222,58 238,74 238,120' fill='none' stroke='#0c0c0d' strokeWidth='9' strokeLinecap='round' />
				<path d='M162,120 C162,74 178,58 200,58 C222,58 238,74 238,120' fill='none' stroke='#3a3a3d' strokeWidth='2' strokeLinecap='round' opacity='0.6' />
				{/* lateral (volumen) */}
				<polygon points='262,122 278,132 278,236 262,244' fill='url(#bag-side)' />
				{/* cuerpo */}
				<rect x='128' y='120' width='134' height='124' rx='10' fill='url(#bag-leather)' />
				<rect x='128' y='120' width='134' height='124' rx='10' fill='none' stroke='rgba(255,255,255,0.06)' strokeDasharray='2 3' />
				<path d='M132,140 L258,140' stroke='rgba(255,255,255,0.08)' strokeDasharray='3 3' />
				<circle cx='200' cy='124' r='4.5' fill='url(#bag-plaque)' />
				{/* placa metalica dorada */}
				<rect x='176' y='162' width='48' height='32' rx='3' fill='url(#bag-plaque)' stroke='#5f4a20' strokeWidth='0.6' />
			</Art>
			<Place x={184} y={168} w={32}>
				<Mark kind='symbol' mono='#6b4f22' finish='engrave' />
			</Place>
		</Scene>
	);
}

function LeatherTote() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #f3ece0 0%, #e6dac8 70%, #d8c9b0 100%)'>
			<Art>
				<defs>
					<linearGradient id='totel-body' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#c68a52' />
						<stop offset='0.55' stopColor='#a86b38' />
						<stop offset='1' stopColor='#8f5a2d' />
					</linearGradient>
					<linearGradient id='totel-side' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#7c4c25' />
						<stop offset='1' stopColor='#6a4020' />
					</linearGradient>
				</defs>
				<ellipse cx='202' cy='254' rx='104' ry='12' fill='rgba(60,35,10,0.28)' />
				<path d='M158,126 C150,90 160,66 176,66' fill='none' stroke='#7c4c25' strokeWidth='7' strokeLinecap='round' />
				<path d='M244,126 C252,90 242,66 226,66' fill='none' stroke='#7c4c25' strokeWidth='7' strokeLinecap='round' />
				<polygon points='258,128 274,138 262,242 248,248' fill='url(#totel-side)' />
				<polygon points='146,128 258,128 248,248 156,248' fill='url(#totel-body)' />
				<polygon points='146,128 258,128 248,248 156,248' fill='none' stroke='rgba(0,0,0,0.15)' strokeDasharray='3 3' />
				<path d='M150,132 L254,132' stroke='rgba(255,255,255,0.25)' strokeWidth='1' />
			</Art>
			<Place x={168} y={155} w={70}>
				<Mark kind='isologo' mono='#7a5232' finish='deboss' />
			</Place>
		</Scene>
	);
}

function CanvasTote() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #e9e5da 0%, #d9d3c4 70%, #c8c0ac 100%)'>
			<Art>
				<defs>
					<linearGradient id='totec-body' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#f2ecdd' />
						<stop offset='1' stopColor='#e0d8c4' />
					</linearGradient>
					<filter id='totec-grain'>
						<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' />
						<feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0 0.22  0 0 0 0.10 0' />
						<feComposite in2='SourceGraphic' operator='in' />
					</filter>
				</defs>
				<ellipse cx='200' cy='252' rx='100' ry='12' fill='rgba(0,0,0,0.18)' />
				<path d='M162,124 L162,84' fill='none' stroke='#d9d0ba' strokeWidth='6' strokeLinecap='round' />
				<path d='M238,124 L238,84' fill='none' stroke='#d9d0ba' strokeWidth='6' strokeLinecap='round' />
				<path d='M162,84 C162,66 238,66 238,84' fill='none' stroke='#d9d0ba' strokeWidth='6' />
				<rect x='150' y='124' width='100' height='120' fill='url(#totec-body)' />
				<rect x='150' y='124' width='100' height='120' filter='url(#totec-grain)' />
				<rect x='150' y='124' width='100' height='120' fill='none' stroke='rgba(0,0,0,0.1)' />
				<path d='M154,130 L246,130' stroke='rgba(0,0,0,0.12)' strokeDasharray='2 3' />
			</Art>
			<Place x={168} y={152} w={64}>
				<Mark kind='isologo' primary={PAINT.navy} accent={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

function CardholderWallet() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 20%, #efeae1 0%, #ddd6ca 70%, #cfc7b9 100%)'>
			<Art>
				<defs>
					<linearGradient id='wallet-body' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#2c374e' />
						<stop offset='0.55' stopColor='#1f2a3e' />
						<stop offset='1' stopColor='#141b2a' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='216' rx='96' ry='11' fill='rgba(0,0,0,0.22)' />
				<rect x='114' y='140' width='172' height='68' rx='8' fill='url(#wallet-body)' />
				<rect x='114' y='140' width='172' height='68' rx='8' fill='none' stroke='rgba(255,255,255,0.08)' strokeDasharray='2 3' />
				<path d='M126,152 L216,152' stroke='rgba(255,255,255,0.18)' strokeWidth='1' />
				<path d='M126,160 L206,160' stroke='rgba(255,255,255,0.12)' strokeWidth='1' />
			</Art>
			<Place x={220} y={158} w={40}>
				<Mark kind='symbol' mono={PAINT.foil} finish='foil' />
			</Place>
		</Scene>
	);
}

function IvoryClutch() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #ece6d8 0%, #dcd4c1 70%, #cbc1a9 100%)'>
			<Art>
				<defs>
					<linearGradient id='clutch-body' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#faf6ec' />
						<stop offset='1' stopColor='#e9e0cc' />
					</linearGradient>
					<linearGradient id='clutch-flap' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#f3ecdd' />
						<stop offset='1' stopColor='#ddd2b8' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='222' rx='92' ry='11' fill='rgba(0,0,0,0.18)' />
				<path d='M150,150 C130,168 130,196 150,214' fill='none' stroke='#ae8c46' strokeWidth='2' strokeDasharray='4 3' />
				<rect x='140' y='168' width='120' height='58' rx='10' fill='url(#clutch-body)' />
				<polygon points='140,168 200,140 260,168' fill='url(#clutch-flap)' />
				<polygon points='140,168 200,140 260,168' fill='none' stroke='rgba(0,0,0,0.08)' />
				<circle cx='200' cy='168' r='6' fill='#ae8c46' stroke='#7a5f2c' strokeWidth='0.6' />
			</Art>
			<Place x={188} y={158} w={24}>
				<Mark kind='symbol' mono='#6b4f22' finish='engrave' />
			</Place>
		</Scene>
	);
}

function LeatherKeychain() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #2a2a2c 0%, #171718 70%, #0a0a0b 100%)'>
			<Art>
				<defs>
					<linearGradient id='charm-metal' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#f1f2f4' />
						<stop offset='0.5' stopColor='#aeb2b8' />
						<stop offset='1' stopColor='#7d8086' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='250' rx='60' ry='9' fill='rgba(0,0,0,0.4)' />
				<circle cx='200' cy='80' r='14' fill='none' stroke='url(#charm-metal)' strokeWidth='5' />
				<path d='M196,92 L196,150 Q196,160 206,160 L206,150 L204,150 L204,92 Z' fill='#3a2417' />
				<path d='M196,150 Q196,160 206,160' fill='none' stroke='#5a3a24' strokeWidth='1' />
				<circle cx='200' cy='196' r='46' fill='url(#charm-metal)' stroke='#5c5f64' strokeWidth='1.5' />
				<circle cx='200' cy='196' r='40' fill='none' stroke='rgba(255,255,255,0.4)' strokeWidth='1' />
			</Art>
			<Place x={176} y={172} w={48}>
				<Mark kind='symbol' mono='#3d3f43' finish='engrave' />
			</Place>
		</Scene>
	);
}

function TravelPouch() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #eef0ee 0%, #dfe2de 70%, #cfd2cc 100%)'>
			<Art>
				<defs>
					<linearGradient id='pouch-body' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#2a3550' />
						<stop offset='0.6' stopColor='#1f2a3e' />
						<stop offset='1' stopColor='#141b2a' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='242' rx='96' ry='11' fill='rgba(0,0,0,0.2)' />
				<rect x='128' y='128' width='144' height='104' rx='24' fill='url(#pouch-body)' />
				<path d='M132,140 L268,140' stroke='#c9c9c9' strokeWidth='2' strokeDasharray='1 3' />
				<circle cx='250' cy='140' r='4' fill='#c9c9c9' />
				<path d='M250,140 L258,148' stroke='#c9c9c9' strokeWidth='2' strokeLinecap='round' />
			</Art>
			<Place x={168} y={172} w={64}>
				<Mark kind='wordmark' mono={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

const scarfPattern = [
	{ x: 140, y: 90 },
	{ x: 190, y: 90 },
	{ x: 240, y: 90 },
	{ x: 140, y: 140 },
	{ x: 240, y: 140 },
	{ x: 140, y: 190 },
	{ x: 190, y: 190 },
	{ x: 240, y: 190 },
];

function SilkScarf() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 20%, #f6f2e8 0%, #e9e2d0 70%, #dcd3ba 100%)'>
			<Art>
				<defs>
					<linearGradient id='scarf-silk' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#fffdf7' />
						<stop offset='0.5' stopColor='#f3ecda' />
						<stop offset='1' stopColor='#e6dbbd' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='258' rx='120' ry='10' fill='rgba(0,0,0,0.12)' />
				<rect x='110' y='70' width='180' height='180' fill='url(#scarf-silk)' transform='rotate(-2 200 160)' />
				<rect x='110' y='70' width='180' height='180' fill='none' stroke={PAINT.navy} strokeWidth='3' transform='rotate(-2 200 160)' />
				<rect x='120' y='80' width='160' height='160' fill='none' stroke={PAINT.gold} strokeWidth='1' transform='rotate(-2 200 160)' />
			</Art>
			{scarfPattern.map((p) => (
				<Place key={`${p.x}-${p.y}`} x={p.x} y={p.y} w={18} rotate={-2} style={{ opacity: 0.5 }}>
					<Mark kind='symbol' mono={PAINT.navy} finish='print' />
				</Place>
			))}
			<Place x={178} y={140} w={44} rotate={-2}>
				<Mark kind='symbol' primary={PAINT.navy} accent={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

export const accessories: MockupItem[] = [
	{
		id: 'bag-structured',
		title: 'Cartera estructurada de mano',
		category: 'accesorios',
		technique: 'Grabado láser sobre placa metálica',
		material: 'Piel negra, herraje dorado',
		note: 'La placa se graba aparte y se remacha; evita imprimir directo sobre piel negra.',
		Scene: StructuredHandbag,
	},
	{
		id: 'tote-leather',
		title: 'Tote bag de piel cognac',
		category: 'accesorios',
		technique: 'Deboss en caliente (sin tinta)',
		material: 'Piel plena flor color cognac',
		note: 'El relieve hundido resalta solo con la luz rasante del cuero curtido en tanino.',
		Scene: LeatherTote,
	},
	{
		id: 'tote-canvas',
		title: 'Tote bag de lona natural',
		category: 'accesorios',
		technique: 'Serigrafía 2 tintas',
		material: 'Lona de algodón 12 oz',
		note: 'Versión de bajo costo para regalos corporativos o eventos.',
		Scene: CanvasTote,
	},
	{
		id: 'wallet-cardholder',
		title: 'Tarjetero de piel navy',
		category: 'accesorios',
		technique: 'Hot stamping dorado',
		material: 'Piel navy, forro interior en tono contraste',
		note: 'Formato compacto ideal para regalo corporativo de fin de año.',
		Scene: CardholderWallet,
	},
	{
		id: 'clutch-ivory',
		title: 'Clutch marfil con cadena',
		category: 'accesorios',
		technique: 'Grabado láser en disco metálico',
		material: 'Piel marfil, herraje dorado cepillado',
		note: 'El disco de herraje se produce por separado en metalería, no en el taller de piel.',
		Scene: IvoryClutch,
	},
	{
		id: 'keychain-medallion',
		title: 'Llavero medalla grabada',
		category: 'accesorios',
		technique: 'Grabado láser sobre metal',
		material: 'Latón niquelado y correa de cuero',
		note: 'Producto de entrada de precio, ideal para exhibir junto a caja registradora.',
		Scene: LeatherKeychain,
	},
	{
		id: 'travel-pouch',
		title: 'Neceser / estuche de viaje',
		category: 'accesorios',
		technique: 'Serigrafía dorada',
		material: 'Nylon recubierto navy',
		note: 'El wordmark completo funciona mejor que el símbolo en piezas alargadas como esta.',
		Scene: TravelPouch,
	},
	{
		id: 'silk-scarf',
		title: 'Foulard de seda con monograma',
		category: 'accesorios',
		technique: 'Impresión digital textil',
		material: 'Seda twill 90×90 cm',
		note: 'El patrón repetido pequeño se reserva para banda perimetral; el centro queda limpio.',
		Scene: SilkScarf,
	},
];
