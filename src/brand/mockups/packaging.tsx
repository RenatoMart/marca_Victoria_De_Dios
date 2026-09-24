import Mark, { PAINT } from '../Mark';
import { Art, Place, Scene, Shade } from '../Scene';
import type { MockupItem } from '../types';

const BG_IVORY = 'radial-gradient(120% 90% at 50% 18%, #fffdf8 0%, #f3ede0 62%, #e6dcc5 100%)';
const BG_ONYX = 'radial-gradient(120% 90% at 50% 15%, #2b2b2d 0%, #1a1a1c 62%, #0c0c0d 100%)';
const BG_NAVY = 'radial-gradient(120% 90% at 50% 18%, #29344e 0%, #1a2338 62%, #0f1420 100%)';
const BG_KRAFT = 'radial-gradient(120% 90% at 50% 18%, #efe3cd 0%, #ddc9a2 62%, #c7ac7e 100%)';

/** Genera una pequeña estrella de 4 puntas (destello) centrada en cx,cy. */
function sparkle(cx: number, cy: number, s: number): string {
	const k = s * 0.26;
	return `M${cx},${cy - s} L${cx + k},${cy - k} L${cx + s},${cy} L${cx + k},${cy + k} L${cx},${cy + s} L${cx - k},${cy + k} L${cx - s},${cy} L${cx - k},${cy - k} Z`;
}

function KraftMailerBox() {
	return (
		<Scene>
			<Art>
				<defs>
					<linearGradient id='kb-front' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#c9a577' />
						<stop offset='1' stopColor='#b38d5f' />
					</linearGradient>
					<linearGradient id='kb-side' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#9e7a4f' />
						<stop offset='1' stopColor='#8c6b44' />
					</linearGradient>
					<filter id='kb-grain'>
						<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' />
						<feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.18 0' />
						<feComposite in2='SourceGraphic' operator='in' />
					</filter>
				</defs>
				<ellipse cx='205' cy='262' rx='170' ry='14' fill='rgba(0,0,0,0.22)' />
				{/* tapa */}
				<polygon points='70,82 300,82 330,62 100,62' fill='#d4b285' />
				{/* lateral */}
				<polygon points='300,82 330,62 330,232 300,258' fill='url(#kb-side)' />
				{/* frente */}
				<rect x='70' y='82' width='230' height='176' fill='url(#kb-front)' />
				<rect x='70' y='82' width='230' height='176' filter='url(#kb-grain)' />
				<line x1='70' y1='88' x2='300' y2='88' stroke='rgba(0,0,0,0.12)' />
			</Art>
			<Place x={130} y={105} w={110}>
				<Mark kind='isologo' mono={PAINT.kraftInk} finish='print' />
			</Place>
		</Scene>
	);
}

function ShoppingBagBlack() {
	return (
		<Scene bg={BG_IVORY}>
			<Art>
				<defs>
					<linearGradient id='bag-front' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#2c2c2e' />
						<stop offset='0.5' stopColor='#121213' />
						<stop offset='1' stopColor='#0a0a0b' />
					</linearGradient>
					<linearGradient id='bag-side' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#0c0c0d' />
						<stop offset='1' stopColor='#000000' />
					</linearGradient>
					<linearGradient id='bag-ribbon' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#050505' />
						<stop offset='0.5' stopColor='#2a2a2c' />
						<stop offset='1' stopColor='#050505' />
					</linearGradient>
					<filter id='bag-grain'>
						<feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7' />
						<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.035 0' />
						<feComposite in2='SourceGraphic' operator='in' />
					</filter>
				</defs>
				<ellipse cx='205' cy='262' rx='120' ry='13' fill='rgba(0,0,0,0.28)' />
				{/* asas de cinta */}
				<path d='M172,118 C172,86 178,64 205,64 C232,64 238,86 238,118' fill='none' stroke='url(#bag-ribbon)' strokeWidth='6' strokeLinecap='round' />
				{/* lateral */}
				<polygon points='262,112 288,98 288,228 262,250' fill='url(#bag-side)' />
				{/* tapa doblada */}
				<polygon points='140,112 262,112 288,98 166,98' fill='#1c1c1e' />
				{/* frente */}
				<rect x='140' y='112' width='122' height='140' fill='url(#bag-front)' />
				<rect x='140' y='112' width='122' height='140' filter='url(#bag-grain)' />
				<line x1='140' y1='120' x2='262' y2='120' stroke='rgba(255,255,255,0.06)' />
				{/* ojales dorados */}
				<circle cx='172' cy='119' r='2.6' fill={PAINT.gold} stroke='#4a3a1a' strokeWidth='0.5' />
				<circle cx='238' cy='119' r='2.6' fill={PAINT.gold} stroke='#4a3a1a' strokeWidth='0.5' />
			</Art>
			<Place x={158} y={150} w={86} transform='perspective(900px) rotateY(-5deg)'>
				<Mark kind='isologo' mono={PAINT.gold} finish='foil' />
			</Place>
		</Scene>
	);
}

function GiftBoxNavy() {
	return (
		<Scene bg={BG_ONYX}>
			<Art>
				<defs>
					<linearGradient id='gbx-front' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#26314a' />
						<stop offset='1' stopColor='#161f32' />
					</linearGradient>
					<linearGradient id='gbx-side' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#141b2a' />
						<stop offset='1' stopColor='#0b0f19' />
					</linearGradient>
					<linearGradient id='gbx-lid' x1='0' y1='1' x2='0' y2='0'>
						<stop offset='0' stopColor='#2f3b57' />
						<stop offset='1' stopColor='#3c4a69' />
					</linearGradient>
				</defs>
				<ellipse cx='210' cy='262' rx='140' ry='14' fill='rgba(0,0,0,0.32)' />
				{/* tapa abierta, apoyada al fondo */}
				<polygon points='132,150 288,150 316,64 158,64' fill='url(#gbx-lid)' />
				<polygon points='288,150 316,64 316,80 288,166' fill='#222c44' />
				{/* interior visible, papel de seda asomando */}
				<path d='M126,152 C160,138 190,164 224,144 C252,128 268,150 284,140 L284,152 L126,166 Z' fill='#101318' />
				<path d={sparkle(160, 148, 4)} fill={PAINT.gold} opacity='0.8' />
				<path d={sparkle(210, 143, 3)} fill={PAINT.gold} opacity='0.6' />
				<path d={sparkle(250, 150, 3.5)} fill={PAINT.gold} opacity='0.7' />
				{/* caja base */}
				<polygon points='288,160 316,140 316,228 288,252' fill='url(#gbx-side)' />
				<rect x='128' y='160' width='160' height='92' fill='url(#gbx-front)' />
				<line x1='128' y1='166' x2='288' y2='166' stroke='rgba(255,255,255,0.05)' />
			</Art>
			<Place x={186} y={78} w={78} transform='perspective(500px) rotateX(58deg)'>
				<Mark kind='symbol' mono={PAINT.gold} finish='foil' />
			</Place>
		</Scene>
	);
}

function TissuePaper() {
	const grid = [
		{ x: 118, y: 92 }, { x: 200, y: 84 }, { x: 282, y: 96 },
		{ x: 128, y: 158 }, { x: 210, y: 152 }, { x: 288, y: 162 },
		{ x: 122, y: 222 }, { x: 202, y: 216 }, { x: 280, y: 224 },
	];
	const stars = [
		{ x: 160, y: 118, s: 4 }, { x: 246, y: 108, s: 3 }, { x: 92, y: 170, s: 3.4 },
		{ x: 172, y: 190, s: 3 }, { x: 258, y: 186, s: 4.2 }, { x: 320, y: 140, s: 3 },
		{ x: 150, y: 246, s: 3.6 }, { x: 240, y: 250, s: 3 },
	];
	return (
		<Scene bg={BG_NAVY}>
			<Art>
				<defs>
					<linearGradient id='tsp-sheet' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#1d1d20' />
						<stop offset='0.5' stopColor='#151517' />
						<stop offset='1' stopColor='#0d0d0f' />
					</linearGradient>
					<linearGradient id='tsp-sheen' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0.35' stopColor='rgba(255,255,255,0)' />
						<stop offset='0.5' stopColor='rgba(255,255,255,0.06)' />
						<stop offset='0.65' stopColor='rgba(255,255,255,0)' />
					</linearGradient>
					<filter id='tsp-grain'>
						<feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' seed='11' />
						<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.03 0' />
						<feComposite in2='SourceGraphic' operator='in' />
					</filter>
				</defs>
				<ellipse cx='200' cy='268' rx='170' ry='12' fill='rgba(0,0,0,0.3)' />
				<path
					d='M58,56 C140,44 260,46 344,58 C352,120 350,190 342,244 C260,258 140,256 60,244 C50,188 50,116 58,56 Z'
					fill='url(#tsp-sheet)'
				/>
				<path
					d='M58,56 C140,44 260,46 344,58 C352,120 350,190 342,244 C260,258 140,256 60,244 C50,188 50,116 58,56 Z'
					filter='url(#tsp-grain)'
				/>
				<path
					d='M58,56 C140,44 260,46 344,58 C352,120 350,190 342,244 C260,258 140,256 60,244 C50,188 50,116 58,56 Z'
					fill='url(#tsp-sheen)'
				/>
				{stars.map((st) => (
					<path key={`${st.x}-${st.y}`} d={sparkle(st.x, st.y, st.s)} fill={PAINT.gold} opacity='0.75' />
				))}
			</Art>
			{grid.map((g) => (
				<Place key={`${g.x}-${g.y}`} x={g.x - 17} y={g.y - 16} w={34}>
					<Mark kind='symbol' mono={PAINT.gold} finish='print' style={{ opacity: 0.9 }} />
				</Place>
			))}
		</Scene>
	);
}

function SealLacre() {
	return (
		<Scene bg={BG_KRAFT}>
			<Art>
				<defs>
					<linearGradient id='seal-env' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#d9bd8f' />
						<stop offset='1' stopColor='#c3a274' />
					</linearGradient>
					<radialGradient id='seal-wax' cx='0.35' cy='0.3' r='0.8'>
						<stop offset='0' stopColor='#2c3956' />
						<stop offset='0.55' stopColor='#1f2a3e' />
						<stop offset='1' stopColor='#121a29' />
					</radialGradient>
					<filter id='seal-shadow' x='-40%' y='-40%' width='180%' height='180%'>
						<feGaussianBlur stdDeviation='4' />
					</filter>
				</defs>
				<ellipse cx='200' cy='244' rx='170' ry='14' fill='rgba(0,0,0,0.16)' />
				<rect x='55' y='130' width='290' height='120' fill='url(#seal-env)' />
				<polygon points='55,130 345,130 200,206' fill='#b2905f' />
				<line x1='55' y1='130' x2='200' y2='206' stroke='rgba(0,0,0,0.08)' />
				<line x1='345' y1='130' x2='200' y2='206' stroke='rgba(0,0,0,0.08)' />
				<ellipse cx='200' cy='196' rx='34' ry='34' fill='#000' opacity='0.22' filter='url(#seal-shadow)' />
				<circle cx='200' cy='188' r='33' fill='url(#seal-wax)' />
				<circle cx='197' cy='184' r='9' fill='rgba(255,255,255,0.14)' />
				<circle cx='210' cy='168' r='4' fill='#2a374f' />
				<circle cx='222' cy='196' r='3' fill='#2a374f' />
				<circle cx='178' cy='206' r='3.4' fill='#2a374f' />
			</Art>
			<Place x={178} y={166} w={44}>
				<Mark kind='symbol' mono='#111a2a' finish='deboss' />
			</Place>
		</Scene>
	);
}

function SatinRibbon() {
	const angle = -18;
	const wm = [
		{ t: -92, w: 66 },
		{ t: 0, w: 66 },
		{ t: 92, w: 66 },
	].map(({ t, w }) => {
		const rad = (angle * Math.PI) / 180;
		const cx = 200 + Math.cos(rad) * t;
		const cy = 150 + Math.sin(rad) * t;
		return { x: cx - w / 2, y: cy - (w / 5.7) / 2, w };
	});
	return (
		<Scene bg={BG_ONYX}>
			<Art>
				<defs>
					<linearGradient id='rib-satin' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#0a0a0b' />
						<stop offset='0.32' stopColor='#2c2c2e' />
						<stop offset='0.5' stopColor='#3d3d40' />
						<stop offset='0.68' stopColor='#1c1c1e' />
						<stop offset='1' stopColor='#050505' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='200' rx='150' ry='16' fill='rgba(0,0,0,0.25)' />
				<g transform='translate(200,150) rotate(-18)'>
					<rect x='-230' y='-24' width='460' height='48' fill='url(#rib-satin)' />
					<line x1='-230' y1='-10' x2='230' y2='-10' stroke='rgba(255,255,255,0.06)' />
					<line x1='-230' y1='10' x2='230' y2='10' stroke='rgba(0,0,0,0.3)' />
				</g>
			</Art>
			{wm.map((p) => (
				<Place key={`${p.x}-${p.y}`} x={p.x} y={p.y} w={p.w} rotate={angle}>
					<Mark kind='wordmark' mono={PAINT.gold} finish='foil' />
				</Place>
			))}
		</Scene>
	);
}

function DustPouch() {
	return (
		<Scene>
			<Art>
				<defs>
					<linearGradient id='pch-body' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#f4efe1' />
						<stop offset='1' stopColor='#e4dcc4' />
					</linearGradient>
					<filter id='pch-grain'>
						<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='9' />
						<feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.05 0' />
						<feComposite in2='SourceGraphic' operator='in' />
					</filter>
				</defs>
				<ellipse cx='200' cy='256' rx='72' ry='11' fill='rgba(0,0,0,0.18)' />
				<path
					d='M150,168 C148,140 158,124 170,116 C168,124 178,130 200,130 C222,130 232,124 230,116 C242,124 252,140 250,168 C252,204 240,246 200,250 C160,246 148,204 150,168 Z'
					fill='url(#pch-body)'
				/>
				<path
					d='M150,168 C148,140 158,124 170,116 C168,124 178,130 200,130 C222,130 232,124 230,116 C242,124 252,140 250,168 C252,204 240,246 200,250 C160,246 148,204 150,168 Z'
					filter='url(#pch-grain)'
				/>
				<path d='M172,150 C168,180 168,214 178,240' fill='none' stroke='rgba(0,0,0,0.06)' strokeWidth='2' />
				<path d='M228,150 C232,180 232,214 222,240' fill='none' stroke='rgba(0,0,0,0.06)' strokeWidth='2' />
				{/* cordón */}
				<path d='M170,118 C182,108 218,108 230,118' fill='none' stroke='#1f2a3e' strokeWidth='2.4' strokeLinecap='round' />
				<path d='M222,114 C232,120 240,134 242,168' fill='none' stroke='#1f2a3e' strokeWidth='2.2' strokeLinecap='round' />
				<path d='M226,116 C240,124 250,142 252,176' fill='none' stroke='#1f2a3e' strokeWidth='2.2' strokeLinecap='round' />
				<circle cx='242' cy='170' r='2.8' fill='#1f2a3e' />
				<circle cx='252' cy='178' r='2.8' fill='#1f2a3e' />
			</Art>
			<Place x={172} y={166} w={56}>
				<Mark kind='symbol' mono={PAINT.navy} finish='print' />
			</Place>
		</Scene>
	);
}

function CandleTube() {
	return (
		<Scene>
			<Art>
				<defs>
					<linearGradient id='tube-body' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#141b2a' />
						<stop offset='0.32' stopColor='#2c3a58' />
						<stop offset='0.55' stopColor='#1f2a3e' />
						<stop offset='1' stopColor='#0e131e' />
					</linearGradient>
					<linearGradient id='tube-cap' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#0f141f' />
						<stop offset='0.5' stopColor='#3a4763' />
						<stop offset='1' stopColor='#0a0e16' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='258' rx='58' ry='11' fill='rgba(0,0,0,0.24)' />
				<ellipse cx='200' cy='250' rx='36' ry='9' fill='#0a0e16' />
				<rect x='164' y='118' width='72' height='132' fill='url(#tube-body)' />
				<ellipse cx='200' cy='118' rx='36' ry='9' fill='url(#tube-cap)' />
				<rect x='164' y='118' width='72' height='10' fill={PAINT.gold} opacity='0.9' />
				<ellipse cx='200' cy='118' rx='36' ry='9' fill='none' stroke='rgba(255,255,255,0.15)' />
			</Art>
			<Place x={168} y={158} w={64}>
				<Mark kind='isologo' mono={PAINT.gold} finish='foil' />
			</Place>
			<Shade x={164} y={128} w={72} h={122} background='linear-gradient(90deg, rgba(0,0,0,0.30), rgba(0,0,0,0) 28%, rgba(255,255,255,0.06) 45%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.38))' />
		</Scene>
	);
}

function KraftBagTwisted() {
	return (
		<Scene bg={BG_KRAFT}>
			<Art>
				<defs>
					<linearGradient id='kbt-front' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#cda878' />
						<stop offset='1' stopColor='#b48f60' />
					</linearGradient>
					<linearGradient id='kbt-side' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#9c7a4f' />
						<stop offset='1' stopColor='#886840' />
					</linearGradient>
					<pattern id='kbt-twist' width='6' height='6' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'>
						<rect width='6' height='6' fill='#a9825a' />
						<rect width='3' height='6' fill='#8a683f' />
					</pattern>
					<filter id='kbt-grain'>
						<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='3' />
						<feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 0.15 0' />
						<feComposite in2='SourceGraphic' operator='in' />
					</filter>
				</defs>
				<ellipse cx='202' cy='262' rx='112' ry='13' fill='rgba(0,0,0,0.2)' />
				<path d='M164,124 C164,94 170,74 197,74' fill='none' stroke='url(#kbt-twist)' strokeWidth='6' strokeLinecap='round' />
				<path d='M232,124 C232,94 226,74 199,74' fill='none' stroke='url(#kbt-twist)' strokeWidth='6' strokeLinecap='round' />
				<polygon points='258,118 282,104 282,232 258,252' fill='url(#kbt-side)' />
				<polygon points='140,118 258,118 282,104 164,104' fill='#c19a6b' />
				<rect x='140' y='118' width='118' height='134' fill='url(#kbt-front)' />
				<rect x='140' y='118' width='118' height='134' filter='url(#kbt-grain)' />
				<circle cx='164' cy='125' r='2.4' fill='#5c4426' />
				<circle cx='232' cy='125' r='2.4' fill='#5c4426' />
			</Art>
			<Place x={158} y={154} w={82}>
				<Mark kind='isologo' mono={PAINT.kraftInk} finish='print' />
			</Place>
		</Scene>
	);
}

export const packaging: MockupItem[] = [
	{
		id: 'kraft-mailer',
		title: 'Caja de envío kraft',
		category: 'empaques',
		technique: 'Impresión flexográfica 1 tinta',
		material: 'Cartón kraft corrugado E-flute',
		note: 'Caja estándar para e-commerce; una sola tinta abarata la producción.',
		Scene: KraftMailerBox,
	},
	{
		id: 'shopping-bag-black',
		title: 'Bolsa de compras negra',
		category: 'empaques',
		technique: 'Hot stamping dorado',
		material: 'Papel mate negro con asas de cinta',
		note: 'Bolsa insignia de tienda; el foil dorado sobre negro mate es la firma visual de la marca.',
		Scene: ShoppingBagBlack,
	},
	{
		id: 'gift-box-navy',
		title: 'Caja rígida con imán',
		category: 'empaques',
		technique: 'Hot stamping dorado + relieve',
		material: 'Cartón rígido forrado, azul marino',
		note: 'Ideal para regalo; el interior con papel de seda dorado eleva el unboxing.',
		Scene: GiftBoxNavy,
	},
	{
		id: 'tissue-paper',
		title: 'Papel de seda con patrón',
		category: 'empaques',
		technique: 'Impresión offset 1 tinta dorada',
		material: 'Papel de seda negro',
		note: 'Patrón repetido de símbolo y estrellas de 4 puntas; envuelve producto dentro de cualquier empaque.',
		Scene: TissuePaper,
	},
	{
		id: 'seal-lacre',
		title: 'Lacre de cera',
		category: 'empaques',
		technique: 'Sello de cera impreso a mano',
		material: 'Cera azul marino sobre sobre kraft',
		note: 'Cierre ceremonial para cajas y sobres de edición limitada.',
		Scene: SealLacre,
	},
	{
		id: 'satin-ribbon',
		title: 'Cinta de raso con logotipo',
		category: 'empaques',
		technique: 'Estampado térmico dorado continuo',
		material: 'Raso de poliéster negro, 25 mm',
		note: 'Wordmark repetido a lo largo de la cinta; se usa para amarrar cajas y bolsas.',
		Scene: SatinRibbon,
	},
	{
		id: 'dust-pouch',
		title: 'Bolsa saco para joyería',
		category: 'empaques',
		technique: 'Serigrafía 1 tinta',
		material: 'Algodón crudo con cordón',
		note: 'Protege piezas pequeñas y accesorios dentro del empaque principal.',
		Scene: DustPouch,
	},
	{
		id: 'candle-tube',
		title: 'Tubo cilíndrico para vela/perfume',
		category: 'empaques',
		technique: 'Hot stamping dorado',
		material: 'Cartón enrollado azul marino',
		note: 'Formato cilíndrico premium para velas, perfumes o difusores.',
		Scene: CandleTube,
	},
	{
		id: 'kraft-bag-twisted',
		title: 'Bolsa kraft con asas trenzadas',
		category: 'empaques',
		technique: 'Impresión flexográfica 1 tinta',
		material: 'Papel kraft con asas de cordón trenzado',
		note: 'Opción económica y sostenible para tienda física.',
		Scene: KraftBagTwisted,
	},
];
