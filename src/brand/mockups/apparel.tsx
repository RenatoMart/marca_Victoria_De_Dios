import Mark, { PAINT } from '../Mark';
import { Art, Place, Scene } from '../Scene';
import type { MockupItem } from '../types';

const BG_ONYX = 'radial-gradient(120% 90% at 50% 20%, #26262a 0%, #17171a 60%, #0c0c0d 100%)';
const BG_NAVY = 'radial-gradient(120% 90% at 50% 20%, #2a3650 0%, #1f2a3e 60%, #141b2a 100%)';
const BG_IVORY = 'radial-gradient(120% 90% at 50% 20%, #fffdf8 0%, #f2ecdf 60%, #e3d9c3 100%)';

function PoloMannequin() {
	return (
		<Scene>
			<Art>
				<defs>
					<linearGradient id='polo-fabric' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#33425f' />
						<stop offset='0.55' stopColor='#202c45' />
						<stop offset='1' stopColor='#141b2a' />
					</linearGradient>
					<linearGradient id='polo-wood' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#7a5738' />
						<stop offset='1' stopColor='#4c3420' />
					</linearGradient>
					<radialGradient id='polo-neck' cx='0.35' cy='0.3' r='0.8'>
						<stop offset='0' stopColor='#efe6d6' />
						<stop offset='1' stopColor='#cdbfa6' />
					</radialGradient>
				</defs>
				<ellipse cx='200' cy='273' rx='60' ry='9' fill='rgba(0,0,0,0.25)' />
				<ellipse cx='200' cy='266' rx='46' ry='9' fill='url(#polo-wood)' />
				<rect x='195' y='214' width='10' height='54' fill='url(#polo-wood)' />
				<path
					d='M148,66 C140,90 136,140 142,190 C145,206 150,214 160,216 L240,216 C250,214 255,206 258,190 C264,140 260,90 252,66 C238,54 210,48 200,48 C190,48 162,54 148,66 Z'
					fill='url(#polo-fabric)'
				/>
				<path
					d='M148,66 C132,70 120,84 118,104 C117,114 122,120 132,118 C142,112 150,96 152,80 Z'
					fill='url(#polo-fabric)'
				/>
				<path
					d='M252,66 C268,70 280,84 282,104 C283,114 278,120 268,118 C258,112 250,96 248,80 Z'
					fill='url(#polo-fabric)'
				/>
				<ellipse cx='200' cy='46' rx='17' ry='11' fill='url(#polo-neck)' />
				<path d='M180,50 L200,66 L184,72 Z' fill='#0f1622' />
				<path d='M220,50 L200,66 L216,72 Z' fill='#141c2c' />
				<rect x='197' y='66' width='6' height='30' fill='#0f1622' />
				<circle cx='200' cy='76' r='1.6' fill='#0c1220' />
				<circle cx='200' cy='88' r='1.6' fill='#0c1220' />
				<rect x='118' y='100' width='16' height='8' rx='2' fill='#0f1622' />
				<rect x='266' y='100' width='16' height='8' rx='2' fill='#0f1622' />
			</Art>
			<Place x={177} y={80} w={26} rotate={-2}>
				<Mark kind='symbol' mono={PAINT.threadGold} finish='embroidery' />
			</Place>
			<div className='vd-shade' style={{ background: 'linear-gradient(100deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.28) 100%)' }} />
		</Scene>
	);
}

function HoodieMannequin() {
	return (
		<Scene bg={BG_ONYX}>
			<Art>
				<defs>
					<linearGradient id='hoodie-fabric' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#2e2e32' />
						<stop offset='0.55' stopColor='#1c1c1f' />
						<stop offset='1' stopColor='#101012' />
					</linearGradient>
					<linearGradient id='hoodie-wood' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#7a5738' />
						<stop offset='1' stopColor='#4c3420' />
					</linearGradient>
					<radialGradient id='hoodie-neck' cx='0.35' cy='0.3' r='0.8'>
						<stop offset='0' stopColor='#efe6d6' />
						<stop offset='1' stopColor='#cdbfa6' />
					</radialGradient>
				</defs>
				<ellipse cx='200' cy='275' rx='64' ry='9' fill='rgba(0,0,0,0.4)' />
				<ellipse cx='200' cy='268' rx='48' ry='9' fill='url(#hoodie-wood)' />
				<rect x='195' y='216' width='10' height='54' fill='url(#hoodie-wood)' />
				<path
					d='M140,70 C130,96 126,150 134,196 C138,210 145,218 158,220 L242,220 C255,218 262,210 266,196 C274,150 270,96 260,70 C244,56 214,50 200,50 C186,50 156,56 140,70 Z'
					fill='url(#hoodie-fabric)'
				/>
				<path
					d='M140,70 C124,76 112,92 110,112 C109,122 114,128 124,126 C134,120 144,102 146,84 Z'
					fill='url(#hoodie-fabric)'
				/>
				<path
					d='M260,70 C276,76 288,92 290,112 C291,122 286,128 276,126 C266,120 256,102 254,84 Z'
					fill='url(#hoodie-fabric)'
				/>
				<path d='M170,56 C170,42 230,42 230,56 C230,68 214,74 200,74 C186,74 170,68 170,56 Z' fill='#141416' />
				<ellipse cx='200' cy='48' rx='16' ry='10' fill='url(#hoodie-neck)' />
				<path d='M188,68 C186,92 184,112 182,130' stroke='#0c0c0e' strokeWidth='2' fill='none' />
				<circle cx='182' cy='132' r='2.4' fill='#c9c9c9' />
				<path d='M212,68 C214,92 216,112 218,130' stroke='#0c0c0e' strokeWidth='2' fill='none' />
				<circle cx='218' cy='132' r='2.4' fill='#c9c9c9' />
				<path
					d='M170,168 C170,162 176,158 184,158 L216,158 C224,158 230,162 230,168 L230,196 C230,204 220,208 200,208 C180,208 170,204 170,196 Z'
					fill='#0e0e10'
					opacity='0.9'
				/>
				<line x1='160' y1='214' x2='240' y2='214' stroke='rgba(0,0,0,0.4)' strokeWidth='1.5' />
				<line x1='160' y1='218' x2='240' y2='218' stroke='rgba(0,0,0,0.4)' strokeWidth='1.5' />
			</Art>
			<Place x={155} y={98} w={90}>
				<Mark kind='isologo' mono={PAINT.ivory} finish='print' />
			</Place>
			<div className='vd-shade' style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 100%)' }} />
		</Scene>
	);
}

function CamisetaFlatLay() {
	return (
		<Scene bg={BG_IVORY}>
			<Art>
				<defs>
					<linearGradient id='tee-fabric' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#ffffff' />
						<stop offset='0.6' stopColor='#f2f0e9' />
						<stop offset='1' stopColor='#e4e1d8' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='252' rx='140' ry='16' fill='rgba(0,0,0,0.10)' />
				<path
					d='M182,70 C170,66 165,66 160,72 L120,86 C110,90 108,98 112,106 L124,128 C128,134 134,134 140,130 L158,118 L158,225 C158,236 168,242 200,242 C232,242 242,236 242,225 L242,118 L260,130 C266,134 272,134 276,128 L288,106 C292,98 290,90 280,86 L240,72 C235,66 230,66 218,70 C214,76 206,80 200,80 C194,80 186,76 182,70 Z'
					fill='url(#tee-fabric)'
					stroke='rgba(0,0,0,0.08)'
					strokeWidth='1'
				/>
				<path d='M126,100 L146,120' stroke='rgba(0,0,0,0.06)' strokeWidth='3' />
				<path d='M274,100 L254,120' stroke='rgba(0,0,0,0.06)' strokeWidth='3' />
				<line x1='200' y1='90' x2='200' y2='232' stroke='rgba(0,0,0,0.05)' strokeWidth='3' />
				<ellipse cx='200' cy='78' rx='16' ry='7' fill='none' stroke='rgba(0,0,0,0.16)' strokeWidth='2' />
			</Art>
			<Place x={185} y={110} w={30}>
				<Mark kind='symbol' primary={PAINT.navy} accent={PAINT.gold} finish='print' />
			</Place>
		</Scene>
	);
}

function CamisaBolsillo() {
	return (
		<Scene bg={BG_NAVY}>
			<Art>
				<defs>
					<linearGradient id='shirt-fabric' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#4a5b7c' />
						<stop offset='0.55' stopColor='#34425f' />
						<stop offset='1' stopColor='#232d43' />
					</linearGradient>
					<linearGradient id='shirt-wood' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#7a5738' />
						<stop offset='1' stopColor='#4c3420' />
					</linearGradient>
					<radialGradient id='shirt-neck' cx='0.35' cy='0.3' r='0.8'>
						<stop offset='0' stopColor='#efe6d6' />
						<stop offset='1' stopColor='#cdbfa6' />
					</radialGradient>
				</defs>
				<ellipse cx='200' cy='273' rx='60' ry='9' fill='rgba(0,0,0,0.3)' />
				<ellipse cx='200' cy='266' rx='46' ry='9' fill='url(#shirt-wood)' />
				<rect x='195' y='214' width='10' height='54' fill='url(#shirt-wood)' />
				<path
					d='M148,66 C140,90 136,140 142,190 C145,206 150,214 160,216 L240,216 C250,214 255,206 258,190 C264,140 260,90 252,66 C238,54 210,48 200,48 C190,48 162,54 148,66 Z'
					fill='url(#shirt-fabric)'
				/>
				<path
					d='M148,66 C132,70 120,84 118,104 C117,114 122,120 132,118 C142,112 150,96 152,80 Z'
					fill='url(#shirt-fabric)'
				/>
				<path
					d='M252,66 C268,70 280,84 282,104 C283,114 278,120 268,118 C258,112 250,96 248,80 Z'
					fill='url(#shirt-fabric)'
				/>
				<ellipse cx='200' cy='46' rx='17' ry='11' fill='url(#shirt-neck)' />
				<path d='M174,50 L200,80 L182,86 L172,58 Z' fill='#1c2740' />
				<path d='M226,50 L200,80 L218,86 L228,58 Z' fill='#212c48' />
				<rect x='197' y='72' width='6' height='120' fill='#1a2438' />
				<circle cx='200' cy='84' r='1.6' fill='#141c2c' />
				<circle cx='200' cy='104' r='1.6' fill='#141c2c' />
				<circle cx='200' cy='124' r='1.6' fill='#141c2c' />
				<circle cx='200' cy='144' r='1.6' fill='#141c2c' />
				<rect x='163' y='98' width='26' height='30' rx='2' fill='#2c3854' stroke='#1a2438' strokeWidth='1.5' />
				<path d='M163,104 L189,104' stroke='#1a2438' strokeWidth='1.5' />
				<circle cx='176' cy='102' r='1.3' fill='#0f1622' />
			</Art>
			<Place x={169} y={106} w={14} rotate={-2}>
				<Mark kind='symbol' mono={PAINT.threadNavy} finish='embroidery' />
			</Place>
			<div className='vd-shade' style={{ background: 'linear-gradient(100deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.25) 100%)' }} />
		</Scene>
	);
}

function GorraBordado3D() {
	return (
		<Scene bg={BG_IVORY}>
			<Art>
				<defs>
					<linearGradient id='cap-crown' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#33425f' />
						<stop offset='0.5' stopColor='#202c45' />
						<stop offset='1' stopColor='#141b2a' />
					</linearGradient>
					<linearGradient id='cap-brim' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#202c45' />
						<stop offset='1' stopColor='#0f1622' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='188' rx='95' ry='16' fill='rgba(0,0,0,0.14)' />
				<ellipse cx='200' cy='160' rx='82' ry='16' fill='url(#cap-brim)' />
				<path
					d='M138,148 C130,100 158,54 200,50 C242,54 270,100 262,148 C262,158 250,154 240,152 L160,152 C150,154 138,158 138,148 Z'
					fill='url(#cap-crown)'
				/>
				<path d='M200,50 L200,150' stroke='rgba(0,0,0,0.18)' strokeWidth='1.5' />
				<path d='M162,64 C150,92 146,122 154,148' stroke='rgba(0,0,0,0.14)' strokeWidth='1.5' fill='none' />
				<path d='M238,64 C250,92 254,122 246,148' stroke='rgba(0,0,0,0.14)' strokeWidth='1.5' fill='none' />
				<circle cx='200' cy='52' r='4' fill='#0f1622' />
				<circle cx='168' cy='92' r='2.4' fill='#0d1420' />
				<circle cx='232' cy='92' r='2.4' fill='#0d1420' />
			</Art>
			<Place x={173} y={80} w={38} rotate={-3} transform='skewX(-4deg)'>
				<Mark kind='symbol' mono={PAINT.threadGold} finish='embroidery' />
			</Place>
		</Scene>
	);
}

function BucketHatParche() {
	return (
		<Scene bg={BG_NAVY}>
			<Art>
				<defs>
					<linearGradient id='bucket-crown' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#fffdf8' />
						<stop offset='1' stopColor='#e9e0cb' />
					</linearGradient>
					<linearGradient id='bucket-brim' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#f2ecdf' />
						<stop offset='1' stopColor='#d8cdb2' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='196' rx='128' ry='18' fill='rgba(0,0,0,0.22)' />
				<ellipse cx='200' cy='172' rx='118' ry='24' fill='url(#bucket-brim)' />
				<path
					d='M132,158 C132,110 162,70 200,70 C238,70 268,110 268,158 Z'
					fill='url(#bucket-crown)'
					stroke='rgba(0,0,0,0.08)'
					strokeWidth='1'
				/>
				<ellipse cx='200' cy='172' rx='118' ry='24' fill='none' stroke='rgba(0,0,0,0.12)' strokeWidth='1.5' strokeDasharray='2 3' />
				<ellipse cx='200' cy='168' rx='96' ry='19' fill='none' stroke='rgba(0,0,0,0.08)' strokeWidth='1.2' strokeDasharray='2 3' />
				<rect x='176' y='96' width='48' height='32' rx='3' fill='#1f2a3e' stroke={PAINT.gold} strokeWidth='1.5' />
				<rect x='179' y='99' width='42' height='26' rx='2' fill='none' stroke='rgba(255,255,255,0.15)' strokeWidth='0.8' />
			</Art>
			<Place x={186} y={101} w={22}>
				<Mark kind='symbol' mono={PAINT.gold} finish='woven' />
			</Place>
		</Scene>
	);
}

function EtiquetaTejidaCuello() {
	return (
		<Scene bg={BG_ONYX}>
			<Art>
				<defs>
					<linearGradient id='label-fabric' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#2a3650' />
						<stop offset='1' stopColor='#131a28' />
					</linearGradient>
				</defs>
				<rect x='0' y='0' width='400' height='300' fill='url(#label-fabric)' />
				<path
					d='M0,88 C120,58 280,58 400,88 L400,124 C280,98 120,98 0,124 Z'
					fill='rgba(0,0,0,0.3)'
				/>
				<path
					d='M20,152 C140,142 260,142 380,152'
					stroke='rgba(255,255,255,0.3)'
					strokeWidth='1'
					strokeDasharray='3 3'
					fill='none'
				/>
				<rect x='150' y='146' width='100' height='4' fill='#0b0f18' opacity='0.6' />
				<rect x='148' y='150' width='104' height='48' rx='2' fill='#111111' />
				<rect x='148' y='150' width='104' height='8' fill='#050505' opacity='0.5' />
				<rect x='148' y='150' width='104' height='48' rx='2' fill='none' stroke='rgba(174,140,70,0.6)' strokeWidth='1' strokeDasharray='2 2' />
			</Art>
			<Place x={162} y={165} w={76}>
				<Mark kind='wordmark' mono={PAINT.gold} finish='woven' />
			</Place>
		</Scene>
	);
}

function EtiquetaSatinTalla() {
	return (
		<Scene bg={BG_IVORY}>
			<Art>
				<defs>
					<linearGradient id='care-garment' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#2a3650' />
						<stop offset='1' stopColor='#1c2740' />
					</linearGradient>
					<linearGradient id='care-satin' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#ffffff' />
						<stop offset='0.35' stopColor='#efe8d8' />
						<stop offset='0.6' stopColor='#d9cfb8' />
						<stop offset='1' stopColor='#efe8d8' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='250' rx='60' ry='10' fill='rgba(0,0,0,0.08)' />
				<rect x='150' y='40' width='100' height='18' rx='2' fill='url(#care-garment)' />
				<line x1='152' y1='52' x2='248' y2='52' stroke='rgba(255,255,255,0.25)' strokeWidth='1' strokeDasharray='2 2' />
				<path
					d='M186,58 C182,110 182,160 188,205 C190,215 210,215 212,205 C218,160 218,110 214,58 Z'
					fill='url(#care-satin)'
					stroke='rgba(0,0,0,0.06)'
					strokeWidth='1'
				/>
				<path d='M186,58 C190,64 210,64 214,58 L214,66 C210,70 190,70 186,66 Z' fill='rgba(0,0,0,0.14)' />
				<line x1='192' y1='128' x2='208' y2='128' stroke='#5d6475' strokeWidth='1.2' />
				<line x1='190' y1='134' x2='210' y2='134' stroke='#5d6475' strokeWidth='1.2' />
				<line x1='193' y1='140' x2='207' y2='140' stroke='#5d6475' strokeWidth='1.2' />
			</Art>
			<Place x={190} y={76} w={20}>
				<Mark kind='symbol' mono={PAINT.navy} finish='print' />
			</Place>
		</Scene>
	);
}

function ColganteHangTag() {
	return (
		<Scene>
			<Art>
				<defs>
					<linearGradient id='tag-fabric' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='0' stopColor='#3a4864' />
						<stop offset='1' stopColor='#232f47' />
					</linearGradient>
					<linearGradient id='tag-silver' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#eef0f3' />
						<stop offset='0.5' stopColor='#9a9ea4' />
						<stop offset='1' stopColor='#eef0f3' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='240' rx='70' ry='10' fill='rgba(0,0,0,0.14)' />
				<rect x='120' y='30' width='160' height='26' rx='3' fill='url(#tag-fabric)' />
				<line x1='124' y1='44' x2='276' y2='44' stroke='rgba(255,255,255,0.18)' strokeWidth='1' strokeDasharray='2 2' />
				<path d='M188,48 C182,54 182,62 188,66' stroke='url(#tag-silver)' strokeWidth='2.4' fill='none' />
				<path d='M212,48 C218,54 218,62 212,66' stroke='url(#tag-silver)' strokeWidth='2.4' fill='none' />
				<circle cx='200' cy='58' r='3' fill='url(#tag-silver)' />
				<path d='M198,60 C194,80 192,90 200,102' stroke='#cbb98a' strokeWidth='1.4' fill='none' />
				<path d='M202,60 C206,80 208,90 200,102' stroke='#cbb98a' strokeWidth='1.4' fill='none' />
				<rect x='158' y='93' width='90' height='134' rx='6' fill='#000000' opacity='0.5' />
				<rect x='155' y='90' width='90' height='134' rx='6' fill='#111111' />
				<rect x='155' y='90' width='90' height='134' rx='6' fill='none' stroke='rgba(255,255,255,0.08)' strokeWidth='1' />
				<circle cx='200' cy='104' r='5' fill='#1a1a1a' stroke='url(#tag-silver)' strokeWidth='1.5' />
			</Art>
			<Place x={175} y={135} w={50}>
				<Mark kind='symbol' mono={PAINT.foil} finish='foil' />
			</Place>
		</Scene>
	);
}

function ParcheBordadoEscudo() {
	return (
		<Scene bg={BG_ONYX}>
			<Art>
				<defs>
					<radialGradient id='patch-twill' cx='0.35' cy='0.3' r='0.85'>
						<stop offset='0' stopColor='#d8bd7e' />
						<stop offset='0.55' stopColor='#ae8c46' />
						<stop offset='1' stopColor='#8a6a34' />
					</radialGradient>
				</defs>
				<line x1='0' y1='40' x2='400' y2='40' stroke='rgba(255,255,255,0.02)' />
				<ellipse cx='200' cy='226' rx='95' ry='14' fill='rgba(0,0,0,0.4)' />
				<circle cx='200' cy='150' r='90' fill='rgba(0,0,0,0.25)' />
				<circle cx='200' cy='148' r='86' fill='url(#patch-twill)' stroke='#6f5726' strokeWidth='6' strokeDasharray='2 2.4' />
				<circle cx='200' cy='148' r='89' fill='none' stroke='rgba(255,255,255,0.25)' strokeWidth='1.2' />
				<circle cx='200' cy='148' r='70' fill='none' stroke={PAINT.navy} strokeWidth='3' />
			</Art>
			<Place x={155} y={103} w={90}>
				<Mark kind='symbol' primary={PAINT.threadNavy} accent={PAINT.threadGold} finish='embroidery' />
			</Place>
		</Scene>
	);
}

function BlazerPerchaPin() {
	return (
		<Scene bg={BG_NAVY}>
			<Art>
				<defs>
					<linearGradient id='pin-fabric' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#26324b' />
						<stop offset='0.55' stopColor='#1a2438' />
						<stop offset='1' stopColor='#10182a' />
					</linearGradient>
					<linearGradient id='pin-wood' x1='0' y1='0' x2='1' y2='0'>
						<stop offset='0' stopColor='#6b4a30' />
						<stop offset='1' stopColor='#4a3220' />
					</linearGradient>
					<linearGradient id='pin-silver' x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0' stopColor='#eef0f3' />
						<stop offset='0.5' stopColor='#9098a2' />
						<stop offset='1' stopColor='#eef0f3' />
					</linearGradient>
				</defs>
				<ellipse cx='200' cy='262' rx='110' ry='10' fill='rgba(0,0,0,0.3)' />
				{/* gancho y percha */}
				<path d='M200,34 L200,22 C200,12 212,12 212,20' stroke='#b9bec6' strokeWidth='2.2' fill='none' strokeLinecap='round' />
				<path d='M118,64 Q200,26 282,64' stroke='url(#pin-wood)' strokeWidth='6' fill='none' strokeLinecap='round' />
				{/* mangas */}
				<path d='M122,64 L102,84 L92,238 L114,242 L126,120 Z' fill='#141c2e' />
				<path d='M278,64 L298,84 L308,238 L286,242 L274,120 Z' fill='#141c2e' />
				{/* cuerpo */}
				<path d='M122,64 Q200,50 278,64 L290,250 L110,250 Z' fill='url(#pin-fabric)' />
				{/* camisa en el escote */}
				<polygon points='178,58 222,58 200,150' fill='#ece7dc' />
				<polygon points='188,58 212,58 200,74' fill='#d9d3c6' />
				{/* solapas */}
				<path d='M178,58 L200,152 L186,152 L154,104 L166,86 Z' fill='#2b3854' stroke='rgba(0,0,0,0.35)' strokeWidth='0.8' />
				<path d='M222,58 L200,152 L214,152 L246,104 L234,86 Z' fill='#2b3854' stroke='rgba(0,0,0,0.35)' strokeWidth='0.8' />
				{/* cierre, botones, bolsillos */}
				<line x1='200' y1='152' x2='200' y2='250' stroke='rgba(0,0,0,0.45)' strokeWidth='1.2' />
				<circle cx='205' cy='178' r='3.2' fill='#0c1220' stroke='rgba(255,255,255,0.15)' strokeWidth='0.6' />
				<circle cx='205' cy='210' r='3.2' fill='#0c1220' stroke='rgba(255,255,255,0.15)' strokeWidth='0.6' />
				<line x1='128' y1='206' x2='170' y2='204' stroke='rgba(0,0,0,0.5)' strokeWidth='2' />
				<line x1='230' y1='204' x2='272' y2='206' stroke='rgba(0,0,0,0.5)' strokeWidth='2' />
				<line x1='232' y1='120' x2='258' y2='118' stroke='rgba(0,0,0,0.45)' strokeWidth='1.6' />
				{/* pin */}
				<circle cx='172' cy='110' r='10' fill='url(#pin-silver)' stroke='#5a5f66' strokeWidth='0.6' />
			</Art>
			<Place x={164} y={102} w={16}>
				<Mark kind='symbol' mono='#3d434b' finish='engrave' />
			</Place>
		</Scene>
	);
}

export const apparel: MockupItem[] = [
	{
		id: 'polo-mannequin',
		title: 'Polo piqué en maniquí de sastre',
		category: 'ropa',
		technique: 'Bordado 3D hilo dorado',
		material: 'Piqué de algodón navy',
		note: 'Símbolo bordado de 2.2 cm sobre el pecho izquierdo; densidad de puntada media para piqué.',
		Scene: PoloMannequin,
	},
	{
		id: 'hoodie-mannequin',
		title: 'Hoodie con isologo estampado',
		category: 'ropa',
		technique: 'Serigrafía a 2 tintas',
		material: 'Felpa de algodón perchada negra',
		note: 'Isologo de 14 cm centrado en el pecho; tinta plastisol mate para no marcar sobre la felpa.',
		Scene: HoodieMannequin,
	},
	{
		id: 'camiseta-flat-lay',
		title: 'Camiseta básica en flat lay',
		category: 'ropa',
		technique: 'Serigrafía navy + dorado',
		material: 'Punto jersey de algodón blanco',
		note: 'Símbolo de 6 cm centrado a 8 cm del cuello; dos tintas en registro fino.',
		Scene: CamisetaFlatLay,
	},
	{
		id: 'camisa-bolsillo',
		title: 'Camisa de vestir con bolsillo bordado',
		category: 'ropa',
		technique: 'Bordado tono sobre tono',
		material: 'Popelina de algodón azul grisáceo',
		note: 'Símbolo de 3 cm sobre el bolsillo; hilo del mismo tono que la tela para un efecto discreto.',
		Scene: CamisaBolsillo,
	},
	{
		id: 'gorra-bordado-3d',
		title: 'Gorra béisbol con bordado 3D',
		category: 'ropa',
		technique: 'Bordado 3D relleno alto',
		material: 'Gorra estructurada de algodón navy',
		note: 'Símbolo de 5 cm en el panel frontal; relleno de espuma para efecto tridimensional.',
		Scene: GorraBordado3D,
	},
	{
		id: 'bucket-hat-parche',
		title: 'Bucket hat con parche tejido',
		category: 'ropa',
		technique: 'Parche tejido cosido',
		material: 'Twill de algodón crudo/ivory',
		note: 'Parche de 4×3 cm cosido en el panel frontal; borde termosellado.',
		Scene: BucketHatParche,
	},
	{
		id: 'etiqueta-tejida-cuello',
		title: 'Etiqueta tejida de cuello (detalle)',
		category: 'ropa',
		technique: 'Tejido jacquard',
		material: 'Cinta tejida negra',
		note: 'Etiqueta de 3×1.5 cm cosida en la costura de cuello; hilo dorado metalizado.',
		Scene: EtiquetaTejidaCuello,
	},
	{
		id: 'etiqueta-satin-talla',
		title: 'Etiqueta satinada de composición',
		category: 'ropa',
		technique: 'Impresión termotransferible',
		material: 'Cinta de satén ivory',
		note: 'Etiqueta colgante de 2×8 cm en la costura lateral; tinta navy resistente al lavado.',
		Scene: EtiquetaSatinTalla,
	},
	{
		id: 'colgante-hang-tag',
		title: 'Hang tag con foil dorado',
		category: 'ropa',
		technique: 'Hot stamping dorado',
		material: 'Cartulina negra de 600 g',
		note: 'Tarjeta de 4×6 cm con cordón de algodón e imperdible; foil dorado de una sola pasada.',
		Scene: ColganteHangTag,
	},
	{
		id: 'parche-bordado-escudo',
		title: 'Parche bordado con borde merrow',
		category: 'ropa',
		technique: 'Bordado con borde merrow',
		material: 'Twill dorado con hilo navy y dorado',
		note: 'Parche de 6 cm de diámetro; borde merrow en hilo dorado para acabado premium.',
		Scene: ParcheBordadoEscudo,
	},
	{
		id: 'blazer-percha-pin',
		title: 'Blazer en percha con pin metálico',
		category: 'ropa',
		technique: 'Grabado láser sobre metal',
		material: 'Pin de aleación bañada en plata',
		note: 'Pin de solapa de 1.5 cm; grabado láser de precisión sobre acabado plateado.',
		Scene: BlazerPerchaPin,
	},
];
