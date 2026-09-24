import { useState, type CSSProperties } from 'react';
import Mark, { PAINT, type Finish, type MarkKind } from './Mark';

interface Version {
	name: string;
	use: string;
	bg: string;
	fg?: string;
	primary?: string;
	accent?: string;
	mono?: string;
	finish?: Finish;
}

const VERSIONS: Version[] = [
	{ name: 'Original', use: 'Web, redes, piezas a todo color', bg: 'var(--vd-paper)' },
	{
		name: 'Negativo',
		use: 'Fondos azul marino',
		bg: 'var(--vd-navy)',
		fg: '#fff',
		primary: PAINT.ivory,
		accent: PAINT.gold,
	},
	{ name: 'Monocromo azul', use: 'Sellos, 1 tinta', bg: '#fff', mono: PAINT.navy },
	{ name: 'Negro', use: 'Fax, grabado, fotocopia', bg: '#fff', mono: PAINT.black },
	{ name: 'Blanco', use: 'Sobre fotografía u oscuro', bg: 'var(--vd-onyx)', fg: '#fff', mono: PAINT.white },
	{ name: 'Todo dorado', use: 'Serigrafía 1 tinta dorada', bg: 'var(--vd-onyx)', fg: '#fff', mono: PAINT.gold },
	{
		name: 'Foil dorado',
		use: 'Bolsas, cajas, tarjetas',
		bg: '#0b0b0c',
		fg: '#fff',
		mono: PAINT.foil,
		finish: 'foil',
	},
	{
		name: 'Foil plata',
		use: 'Línea hogar / edición especial',
		bg: 'var(--vd-navy-deep)',
		fg: '#fff',
		mono: PAINT.silver,
		finish: 'foil',
	},
	{
		name: 'Kraft',
		use: 'Cajas de envío, bolsas de papel',
		bg: 'linear-gradient(160deg, #c9a577, #b38d5f)',
		mono: PAINT.kraftInk,
		finish: 'print',
	},
	{ name: 'Dorado sobre marfil', use: 'Papelería premium', bg: 'var(--vd-ivory)', mono: PAINT.gold },
	{
		name: 'Relieve seco',
		use: 'Tapas, papel algodón',
		bg: '#efe9de',
		mono: '#efe9de',
		finish: 'emboss',
	},
	{
		name: 'Bajo relieve en cuero',
		use: 'Carteras, bolsos, llaveros',
		bg: 'linear-gradient(150deg, #6b4428, #4a2e1a)',
		fg: '#fff',
		mono: '#3c2415',
		finish: 'deboss',
	},
];

const PALETTE = [
	{
		name: 'Azul Victoria',
		hex: '#1F2A3E',
		rgb: '31 · 42 · 62',
		cmyk: '50 · 32 · 0 · 76',
		pms: '2767 C (aprox.)',
		role: 'Color principal, textos',
		ink: '#fff',
	},
	{
		name: 'Oro Laurel',
		hex: '#AE8C46',
		rgb: '174 · 140 · 70',
		cmyk: '0 · 20 · 60 · 32',
		pms: '7562 C · metálico 871 C',
		role: 'Acento, acabados foil',
		ink: '#fff',
	},
	{
		name: 'Marfil',
		hex: '#F5F0E6',
		rgb: '245 · 240 · 230',
		cmyk: '0 · 2 · 6 · 4',
		pms: '9224 C (aprox.)',
		role: 'Fondos, papel',
		ink: 'var(--vd-navy)',
	},
	{
		name: 'Ónix',
		hex: '#121214',
		rgb: '18 · 18 · 20',
		cmyk: '60 · 40 · 40 · 100',
		pms: 'Black 6 C',
		role: 'Empaque de lujo',
		ink: '#fff',
	},
	{
		name: 'Kraft',
		hex: '#C19A6B',
		rgb: '193 · 154 · 107',
		cmyk: 'Soporte natural',
		pms: '—',
		role: 'Envíos, eco',
		ink: 'var(--vd-navy)',
	},
];

const MISUSES: { label: string; style: CSSProperties; primary?: string; accent?: string; bg?: string }[] = [
	{ label: 'No deformar', style: { transform: 'scaleX(1.45)' } },
	{ label: 'No cambiar los colores', style: {}, primary: '#b3261e', accent: '#2e7d32' },
	{ label: 'No rotar', style: { transform: 'rotate(-22deg)' } },
	{
		label: 'No usar sobre fondos cargados',
		style: {},
		bg: 'repeating-linear-gradient(45deg, #ae8c46 0 10px, #1f2a3e 10px 20px)',
	},
];

export default function Identity() {
	const [kind, setKind] = useState<MarkKind>('isologo');

	return (
		<>
			<section id='identidad' className='vd-section'>
				<header className='vd-section__head'>
					<p className='vd-eyebrow'>01 · Identidad</p>
					<h2>Arquitectura de la marca</h2>
					<p className='vd-lede'>
						Tres piezas que se usan según el espacio disponible. El isologo es la firma principal;
						el símbolo funciona solo cuando la marca ya es reconocible o el formato es pequeño.
					</p>
				</header>

				<div className='vd-arch'>
					<figure className='vd-arch__item vd-arch__item--main'>
						<div className='vd-arch__stage'>
							<Mark kind='isologo' width='min(78%, 360px)' />
						</div>
						<figcaption>
							<strong>Isologo</strong>
							<span>Símbolo + nombre. Firma principal: empaques, web, tienda, papelería.</span>
						</figcaption>
					</figure>
					<figure className='vd-arch__item'>
						<div className='vd-arch__stage'>
							<Mark kind='symbol' width='min(62%, 220px)' />
						</div>
						<figcaption>
							<strong>Símbolo (isotipo)</strong>
							<span>Laurel, estrella, corona y monograma VD. Bordados, herrajes, patrones, avatar.</span>
						</figcaption>
					</figure>
					<figure className='vd-arch__item'>
						<div className='vd-arch__stage'>
							<Mark kind='wordmark' width='86%' />
						</div>
						<figcaption>
							<strong>Logotipo</strong>
							<span>Solo el nombre. Etiquetas de cuello, cintas, lomos, bolígrafos.</span>
						</figcaption>
					</figure>
				</div>
			</section>

			<section id='color' className='vd-section'>
				<header className='vd-section__head vd-section__head--row'>
					<div>
						<p className='vd-eyebrow'>02 · Versiones</p>
						<h2>Versiones de color y acabados</h2>
						<p className='vd-lede'>
							El mismo archivo original recoloreado para cada técnica: una tinta, negativo, foil,
							relieve y cuero.
						</p>
					</div>
					<div className='vd-seg' role='group' aria-label='Pieza mostrada'>
						{(['isologo', 'symbol'] as const).map(k => (
							<button
								key={k}
								type='button'
								aria-pressed={kind === k}
								className={kind === k ? 'is-on' : ''}
								onClick={() => setKind(k)}
							>
								{k === 'isologo' ? 'Isologo' : 'Símbolo'}
							</button>
						))}
					</div>
				</header>

				<div className='vd-versions'>
					{VERSIONS.map(v => (
						<figure key={v.name} className='vd-version'>
							<div className='vd-version__stage' style={{ background: v.bg }}>
								<Mark
									kind={kind}
									primary={v.primary}
									accent={v.accent}
									mono={v.mono}
									finish={v.finish}
									width={kind === 'isologo' ? '64%' : '52%'}
								/>
							</div>
							<figcaption>
								<strong>{v.name}</strong>
								<span>{v.use}</span>
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			<section id='paleta' className='vd-section'>
				<header className='vd-section__head'>
					<p className='vd-eyebrow'>03 · Color</p>
					<h2>Paleta</h2>
					<p className='vd-lede'>
						Valores medidos sobre los archivos originales. Las referencias Pantone son
						aproximadas: confírmalas con una guía impresa antes de producir.
					</p>
				</header>
				<div className='vd-palette'>
					{PALETTE.map(c => (
						<div key={c.name} className='vd-swatch'>
							<div className='vd-swatch__chip' style={{ background: c.hex, color: c.ink }}>
								<span>{c.hex}</span>
							</div>
							<dl>
								<dt>{c.name}</dt>
								<dd className='vd-swatch__role'>{c.role}</dd>
								<dd>
									<b>RGB</b> {c.rgb}
								</dd>
								<dd>
									<b>CMYK</b> {c.cmyk}
								</dd>
								<dd>
									<b>PMS</b> {c.pms}
								</dd>
							</dl>
						</div>
					))}
				</div>
			</section>

			<section id='reglas' className='vd-section'>
				<header className='vd-section__head'>
					<p className='vd-eyebrow'>04 · Reglas</p>
					<h2>Espacio, tamaño y tipografía</h2>
				</header>

				<div className='vd-rules'>
					<div className='vd-rule'>
						<div className='vd-clear'>
							<div className='vd-clear__box'>
								<Mark kind='isologo' width='100%' />
								<span className='vd-clear__x vd-clear__x--t'>x</span>
								<span className='vd-clear__x vd-clear__x--l'>x</span>
							</div>
						</div>
						<h3>Área de protección</h3>
						<p>
							Deja libre alrededor del logo al menos <b>x</b>, igual a la altura de la corona.
							Ningún texto ni borde entra en esa zona.
						</p>
					</div>

					<div className='vd-rule'>
						<div className='vd-sizes'>
							<div>
								<Mark kind='isologo' width='76px' />
								<span>30 mm · 140 px</span>
							</div>
							<div>
								<Mark kind='symbol' width='34px' />
								<span>12 mm · 32 px</span>
							</div>
							<div>
								<Mark kind='symbol' width='56px' mono={PAINT.threadGold} finish='embroidery' />
								<span>Bordado ≥ 25 mm</span>
							</div>
						</div>
						<h3>Tamaños mínimos</h3>
						<p>
							Las hojas del laurel son finas: por debajo de estos tamaños se pierden. En bordado,
							usa el símbolo desde 25 mm; más pequeño, bórdalo solo en una tinta.
						</p>
					</div>

					<div className='vd-rule'>
						<div className='vd-type'>
							<p className='vd-type__display'>Victoria de Dios</p>
							<p className='vd-type__serif'>Elegancia que se hereda.</p>
							<p className='vd-type__sans'>LIFESTYLE &amp; HOME</p>
						</div>
						<h3>Tipografía</h3>
						<p>
							<b>Cinzel</b> para titulares en mayúsculas (afín al nombre del logo),{' '}
							<b>Cormorant Garamond</b> para texto editorial y <b>Jost</b> para datos y
							etiquetas. Las tres son gratuitas (Google Fonts).
						</p>
					</div>
				</div>

				<div className='vd-misuse'>
					{MISUSES.map(m => (
						<figure key={m.label} className='vd-misuse__item'>
							<div className='vd-misuse__stage' style={{ background: m.bg ?? 'var(--vd-paper)' }}>
								<Mark kind='symbol' width='44%' primary={m.primary} accent={m.accent} style={m.style} />
								<span className='vd-misuse__x' aria-hidden='true'>
									✕
								</span>
							</div>
							<figcaption>{m.label}</figcaption>
						</figure>
					))}
				</div>
			</section>
		</>
	);
}
