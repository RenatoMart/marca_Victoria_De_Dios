import Mark, { PAINT } from '../Mark';
import { Art, Place, Scene, Shade } from '../Scene';
import type { MockupItem } from '../types';

function MugPair() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #efeae1 0%, #ddd6ca 70%, #cfc7b9 100%)'>
			<Art>
				<defs>
					<linearGradient id='mug-white-body' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#e9e9e9' />
						<stop offset='0.45' stopColor='#ffffff' />
						<stop offset='0.6' stopColor='#f4f4f4' />
						<stop offset='1' stopColor='#d8d8d8' />
					</linearGradient>
					<linearGradient id='mug-black-body' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#1c1c1e' />
						<stop offset='0.45' stopColor='#3a3a3c' />
						<stop offset='0.6' stopColor='#242426' />
						<stop offset='1' stopColor='#0e0e0f' />
					</linearGradient>
				</defs>
				<ellipse cx='140' cy='252' rx='58' ry='9' fill='rgba(0,0,0,0.18)' />
				<ellipse cx='276' cy='252' rx='58' ry='9' fill='rgba(0,0,0,0.22)' />
				{/* taza blanca brillante */}
				<path d='M100,140 L100,224 Q100,238 140,238 Q180,238 180,224 L180,140 Z' fill='url(#mug-white-body)' />
				<ellipse cx='140' cy='140' rx='40' ry='9' fill='#f6f6f6' stroke='#d2d2d2' strokeWidth='1' />
				<path d='M180,158 C204,158 204,204 180,204' fill='none' stroke='#d6d6d6' strokeWidth='7' />
				{/* taza negra mate */}
				<path d='M236,140 L236,224 Q236,238 276,238 Q316,238 316,224 L316,140 Z' fill='url(#mug-black-body)' />
				<ellipse cx='276' cy='140' rx='40' ry='9' fill='#2a2a2c' stroke='#0a0a0a' strokeWidth='1' />
				<path d='M316,158 C340,158 340,204 316,204' fill='none' stroke='#161618' strokeWidth='7' />
			</Art>
			<Place x={116} y={162} w={48} transform='scaleX(0.9)'>
				<Mark kind='isologo' primary={PAINT.navy} accent={PAINT.gold} finish='print' />
			</Place>
			<Shade x={100} y={148} w={80} h={82} background='linear-gradient(90deg, rgba(0,0,0,0.16), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.22))' />
			<Place x={252} y={166} w={40} transform='scaleX(0.9)'>
				<Mark kind='symbol' mono={PAINT.gold} finish='print' />
			</Place>
			<Shade x={236} y={148} w={80} h={82} background='linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35))' />
		</Scene>
	);
}

function BottleSteel() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 10%, #26262a 0%, #17171a 65%, #0a0a0b 100%)'>
			<Art>
				<defs>
					<linearGradient id='bottle-body' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#141b2a' />
						<stop offset='0.35' stopColor='#2c3a56' />
						<stop offset='0.55' stopColor='#1f2a3e' />
						<stop offset='1' stopColor='#0d1220' />
					</linearGradient>
					<linearGradient id='bottle-cap' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#8d9096' />
						<stop offset='0.5' stopColor='#eef0f3' />
						<stop offset='1' stopColor='#6f7278' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='264' rx='46' ry='9' fill='rgba(0,0,0,0.45)' />
				<rect x='168' y='96' width='64' height='150' rx='14' fill='url(#bottle-body)' />
				<rect x='176' y='78' width='48' height='22' rx='6' fill='url(#bottle-cap)' />
				<rect x='184' y='66' width='32' height='16' rx='5' fill='url(#bottle-cap)' />
				<ellipse cx='200' cy='96' rx='32' ry='6' fill='#0d1220' opacity='0.5' />
			</Art>
			<Place x={172} y={150} w={56} transform='scaleX(0.9)'>
				<Mark kind='symbol' mono={PAINT.silver} finish='engrave' />
			</Place>
			<Shade x={168} y={104} w={64} h={136} background='linear-gradient(90deg, rgba(0,0,0,0.30), rgba(0,0,0,0) 28%, rgba(255,255,255,0.06) 45%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.38))' />
		</Scene>
	);
}

function GlassTumbler() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #f6f3ec 0%, #e7e1d2 70%, #d8d0ba 100%)'>
			<Art>
				<defs>
					<linearGradient id='tumbler-body' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='rgba(180,200,210,0.35)' />
						<stop offset='0.4' stopColor='rgba(255,255,255,0.75)' />
						<stop offset='0.6' stopColor='rgba(210,224,230,0.4)' />
						<stop offset='1' stopColor='rgba(150,170,180,0.4)' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='256' rx='48' ry='9' fill='rgba(0,0,0,0.16)' />
				<path d='M164,110 L172,236 Q172,246 200,246 Q228,246 228,236 L236,110 Z' fill='url(#tumbler-body)' stroke='rgba(255,255,255,0.5)' strokeWidth='1' />
				<ellipse cx='200' cy='110' rx='36' ry='8' fill='#1f2a3e' />
				<rect x='196' y='70' width='6' height='44' rx='3' fill='#e2e2e2' transform='rotate(8 200 92)' />
			</Art>
			<Place x={176} y={150} w={48} transform='scaleX(0.9)' style={{ opacity: 0.92 }}>
				<Mark kind='isologo' primary={PAINT.navy} accent={PAINT.gold} finish='print' />
			</Place>
			<Shade x={168} y={118} w={64} h={120} background='linear-gradient(90deg, rgba(0,0,0,0.12), rgba(255,255,255,0.1) 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.18))' />
		</Scene>
	);
}

function Thermos() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 12%, #edeae3 0%, #dcd6c8 70%, #cac2ac 100%)'>
			<Art>
				<defs>
					<linearGradient id='thermo-body' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#12192a' />
						<stop offset='0.35' stopColor='#2e3c58' />
						<stop offset='0.55' stopColor='#1f2a3e' />
						<stop offset='1' stopColor='#0a0e18' />
					</linearGradient>
					<linearGradient id='thermo-metal' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#8d9096' />
						<stop offset='0.5' stopColor='#eef0f3' />
						<stop offset='1' stopColor='#6f7278' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='266' rx='42' ry='8' fill='rgba(0,0,0,0.3)' />
				<rect x='176' y='62' width='48' height='20' rx='6' fill='url(#thermo-metal)' />
				<rect x='166' y='82' width='68' height='166' rx='10' fill='url(#thermo-body)' />
				<rect x='166' y='230' width='68' height='18' fill='url(#thermo-metal)' />
			</Art>
			<Place x={172} y={130} w={56} transform='scaleX(0.9)'>
				<Mark kind='symbol' mono={PAINT.gold} finish='print' />
			</Place>
			<Shade x={166} y={84} w={68} h={146} background='linear-gradient(90deg, rgba(0,0,0,0.30), rgba(0,0,0,0) 28%, rgba(255,255,255,0.06) 45%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.38))' />
		</Scene>
	);
}

function ScentedCandle() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 18%, #f5efe2 0%, #e9dfc9 65%, #d8caa8 100%)'>
			<Art>
				<defs>
					<linearGradient id='candle-glass' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='rgba(255,255,255,0.2)' />
						<stop offset='0.4' stopColor='rgba(255,255,255,0.55)' />
						<stop offset='0.6' stopColor='rgba(255,255,255,0.25)' />
						<stop offset='1' stopColor='rgba(200,190,160,0.3)' />
					</linearGradient>
					<linearGradient id='candle-wax' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#f3e9cf' />
						<stop offset='1' stopColor='#e8d9b3' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='252' rx='54' ry='9' fill='rgba(0,0,0,0.16)' />
				<rect x='150' y='128' width='100' height='118' rx='8' fill='url(#candle-glass)' stroke='rgba(255,255,255,0.4)' />
				<ellipse cx='200' cy='130' rx='48' ry='8' fill='url(#candle-wax)' />
				<rect x='198' y='108' width='4' height='24' fill='#5a4a30' />
				<path d='M200,106 q4,-8 0,-14 q-4,6 0,14' fill='#e8a23a' opacity='0.8' />
				<rect x='158' y='150' width='84' height='58' rx='2' fill={PAINT.ivory} opacity='0.95' />
			</Art>
			<Place x={176} y={162} w={48}>
				<Mark kind='isologo' primary={PAINT.navy} accent={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

function ThrowCushion() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 20%, #efe7d8 0%, #ddd0b4 70%, #c9b892 100%)'>
			<Art>
				<defs>
					<linearGradient id='cushion-fabric' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#e7ddc8' />
						<stop offset='0.5' stopColor='#d6c7a4' />
						<stop offset='1' stopColor='#c3b189' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='250' rx='110' ry='14' fill='rgba(0,0,0,0.15)' />
				<path d='M110,120 Q100,180 118,232 Q160,250 200,246 Q240,250 282,232 Q300,180 290,120 Q250,104 200,108 Q150,104 110,120 Z' fill='url(#cushion-fabric)' />
				<path d='M110,120 Q100,180 118,232 Q160,250 200,246 Q240,250 282,232 Q300,180 290,120' fill='none' stroke='rgba(0,0,0,0.08)' />
				<path d='M140,130 Q150,180 140,228' stroke='rgba(0,0,0,0.06)' fill='none' />
				<path d='M260,130 Q250,180 260,228' stroke='rgba(0,0,0,0.06)' fill='none' />
			</Art>
			<Place x={168} y={150} w={64}>
				<Mark kind='symbol' mono={PAINT.threadGold} finish='embroidery' />
			</Place>
		</Scene>
	);
}

const towelStripes = [0, 1, 2, 3, 4, 5, 6];

function BathTowel() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #eef2f1 0%, #dde4e1 70%, #cbd4cf 100%)'>
			<Art>
				<defs>
					<linearGradient id='towel-fabric' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#fbfbf9' />
						<stop offset='1' stopColor='#e9e7e0' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='256' rx='118' ry='10' fill='rgba(0,0,0,0.12)' />
				<rect x='90' y='150' width='220' height='90' rx='6' fill='url(#towel-fabric)' />
				{towelStripes.map((i) => (
					<line key={i} x1={90} y1={158 + i * 12} x2={310} y2={158 + i * 12} stroke='rgba(0,0,0,0.05)' />
				))}
				<rect x='90' y='128' width='220' height='22' rx='4' fill='#dfe6e2' />
			</Art>
			<Place x={160} y={168} w={40}>
				<Mark kind='symbol' mono={PAINT.threadNavy} finish='embroidery' />
			</Place>
			<Place x={132} y={202} w={136}>
				<Mark kind='wordmark' mono={PAINT.threadNavy} finish='embroidery' />
			</Place>
		</Scene>
	);
}

function MarbleCoasters() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #2a2a2c 0%, #17171a 70%, #0a0a0b 100%)'>
			<Art>
				<defs>
					<radialGradient id='coaster-marble' cx='0.35' cy='0.3' r='0.8'>
						<stop offset='0' stopColor='#faf9f6' />
						<stop offset='0.6' stopColor='#e4e1da' />
						<stop offset='1' stopColor='#cac6bb' />
					</radialGradient>
					<filter id='coaster-vein'>
						<feTurbulence type='fractalNoise' baseFrequency='0.02 0.09' numOctaves='2' seed='11' result='n' />
						<feColorMatrix in='n' values='0 0 0 0 0.55  0 0 0 0 0.53  0 0 0 0 0.48  0 0 0 0.5 0' />
						<feComposite in2='SourceGraphic' operator='in' />
					</filter>
				</defs>
				<ellipse cx='200' cy='232' rx='84' ry='38' fill='rgba(0,0,0,0.45)' />
				<ellipse cx='196' cy='210' rx='78' ry='34' fill='url(#coaster-marble)' />
				<ellipse cx='196' cy='210' rx='78' ry='34' filter='url(#coaster-vein)' opacity='0.5' />
				<ellipse cx='202' cy='170' rx='78' ry='34' fill='url(#coaster-marble)' />
				<ellipse cx='202' cy='170' rx='78' ry='34' filter='url(#coaster-vein)' opacity='0.5' />
				<ellipse cx='202' cy='170' rx='78' ry='34' fill='none' stroke='rgba(0,0,0,0.08)' />
			</Art>
			<Place x={172} y={150} w={60}>
				<Mark kind='symbol' mono={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

const diffuserReeds = [-8, -3, 2, 7];

function DiffuserBottle() {
	return (
		<Scene bg='radial-gradient(120% 90% at 50% 15%, #f4efe4 0%, #e7dfcb 70%, #d6cbac 100%)'>
			<Art>
				<defs>
					<linearGradient id='diffuser-glass' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='rgba(170,190,180,0.35)' />
						<stop offset='0.4' stopColor='rgba(255,255,255,0.7)' />
						<stop offset='0.6' stopColor='rgba(200,215,205,0.35)' />
						<stop offset='1' stopColor='rgba(130,150,140,0.4)' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='258' rx='42' ry='8' fill='rgba(0,0,0,0.16)' />
				<path d='M172,150 L172,236 Q172,246 200,246 Q228,246 228,236 L228,150 Z' fill='url(#diffuser-glass)' stroke='rgba(255,255,255,0.4)' />
				<path d='M182,150 L182,110 Q182,100 200,100 Q218,100 218,110 L218,150 Z' fill='url(#diffuser-glass)' opacity='0.9' />
				<rect x='190' y='86' width='20' height='18' rx='3' fill='#7a5f2c' />
				{diffuserReeds.map((r, i) => (
					<line
						key={r}
						x1={200}
						y1={92}
						x2={200 + r * 6}
						y2={40 + i * 2}
						stroke='#c9b98a'
						strokeWidth='1.5'
						transform={`rotate(${r} 200 92)`}
					/>
				))}
			</Art>
			<Place x={176} y={168} w={48} style={{ opacity: 0.9 }}>
				<Mark kind='isologo' primary={PAINT.navy} accent={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

export const home: MockupItem[] = [
	{
		id: 'mug-pair',
		title: 'Tazas cerámicas blanca y negra',
		category: 'hogar',
		technique: 'Sublimación e impresión cerámica',
		material: 'Cerámica esmaltada, 350 ml',
		note: 'La versión mate negra usa solo el símbolo dorado para mayor contraste.',
		Scene: MugPair,
	},
	{
		id: 'bottle-steel',
		title: 'Tomatodo de acero inoxidable',
		category: 'hogar',
		technique: 'Grabado láser',
		material: 'Acero inoxidable, pintura en polvo navy',
		note: 'El grabado atraviesa la pintura en polvo y expone el metal plateado debajo.',
		Scene: BottleSteel,
	},
	{
		id: 'tumbler-glass',
		title: 'Vaso térmico con tapa y bombilla',
		category: 'hogar',
		technique: 'Serigrafía UV',
		material: 'Vidrio borosilicato',
		note: 'La tinta debe curar con UV para resistir el lavado frecuente en vidrio.',
		Scene: GlassTumbler,
	},
	{
		id: 'thermos',
		title: 'Termo de viaje',
		category: 'hogar',
		technique: 'Impresión por tampografía dorada',
		material: 'Acero inoxidable doble pared, navy',
		note: 'Formato alto y angosto: preferir el símbolo solo, no el isologo completo.',
		Scene: Thermos,
	},
	{
		id: 'scented-candle',
		title: 'Vela aromática en frasco de vidrio',
		category: 'hogar',
		technique: 'Etiqueta impresa autoadhesiva',
		material: 'Vidrio, cera de soya, etiqueta ivory',
		note: 'La etiqueta se imprime plana y se aplica después del envasado de la cera.',
		Scene: ScentedCandle,
	},
	{
		id: 'throw-cushion',
		title: 'Cojín decorativo bordado',
		category: 'hogar',
		technique: 'Bordado en hilo dorado',
		material: 'Lino grueso color arena',
		note: 'Bordar solo el símbolo evita puntadas demasiado finas en tejidos gruesos.',
		Scene: ThrowCushion,
	},
	{
		id: 'bath-towel',
		title: 'Toalla de baño bordada',
		category: 'hogar',
		technique: 'Bordado en hilo navy',
		material: 'Algodón egipcio 600 g/m²',
		note: 'Símbolo y wordmark combinados para línea de amenities de hotelería.',
		Scene: BathTowel,
	},
	{
		id: 'marble-coasters',
		title: 'Set de posavasos de mármol',
		category: 'hogar',
		technique: 'Impresión dorada + sellado',
		material: 'Mármol travertino natural',
		note: 'Cada pieza es única por la veta natural; el símbolo dorado queda centrado y pequeño.',
		Scene: MarbleCoasters,
	},
	{
		id: 'diffuser-bottle',
		title: 'Difusor de aromas con varillas',
		category: 'hogar',
		technique: 'Etiqueta impresa translúcida',
		material: 'Vidrio soplado, varillas de ratán',
		note: 'La etiqueta semitransparente deja ver el líquido; usar tintas opacas para el logo.',
		Scene: DiffuserBottle,
	},
];
