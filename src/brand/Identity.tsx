import { useState, type CSSProperties } from 'react';
import Mark, { PAINT, type Finish, type MarkKind } from './Mark';

interface Version {
	name: string;
	use: string;
	bg: string;
	primary?: string;
	accent?: string;
	mono?: string;
	finish?: Finish;
}

/** Las seis primeras se muestran siempre; el resto al desplegar. */
const VERSIONS: Version[] = [
	{
		name: 'Original',
		use: 'Web, redes, piezas a todo color',
		bg: 'var(--vd-ivory)',
	},
	{
		name: 'Negativo',
		use: 'Fondos azul marino',
		bg: 'var(--vd-navy)',
		primary: PAINT.ivory,
		accent: PAINT.gold,
	},
	{
		name: 'Monocromo azul',
		use: 'Sellos e impresión a una tinta',
		bg: '#fff',
		mono: PAINT.navy,
	},
	{
		name: 'Foil dorado',
		use: 'Bolsas, cajas y tarjetas',
		bg: '#0b0b0c',
		mono: PAINT.foil,
		finish: 'foil',
	},
	{
		name: 'Blanco',
		use: 'Sobre fotografía u oscuro',
		bg: 'var(--vd-night)',
		mono: PAINT.white,
	},
	{
		name: 'Kraft',
		use: 'Cajas de envío y bolsas de papel',
		bg: 'linear-gradient(160deg, #c9a577, #b38d5f)',
		mono: PAINT.kraftInk,
		finish: 'print',
	},
	{ name: 'Negro', use: 'Grabado y fotocopia', bg: '#fff', mono: PAINT.black },
	{
		name: 'Todo dorado',
		use: 'Serigrafía a una tinta dorada',
		bg: 'var(--vd-onyx)',
		mono: PAINT.gold,
	},
	{
		name: 'Foil plata',
		use: 'Línea hogar o edición especial',
		bg: 'var(--vd-navy-deep)',
		mono: PAINT.silver,
		finish: 'foil',
	},
	{
		name: 'Dorado sobre marfil',
		use: 'Papelería premium',
		bg: 'var(--vd-ivory)',
		mono: PAINT.gold,
	},
	{
		name: 'Relieve seco',
		use: 'Tapas y papel de algodón',
		bg: '#efe9de',
		mono: '#efe9de',
		finish: 'emboss',
	},
	{
		name: 'Bajo relieve en cuero',
		use: 'Carteras, bolsos y llaveros',
		bg: 'linear-gradient(150deg, #6b4428, #4a2e1a)',
		mono: '#3c2415',
		finish: 'deboss',
	},
];

/** share = peso aproximado de cada color en la identidad (define el ancho de la banda). */
const PALETTE = [
	{
		name: 'Azul Victoria',
		hex: '#1F2A3E',
		rgb: '31 42 62',
		cmyk: '50 32 0 76',
		pms: '2767 C',
		share: 38,
		ink: '#fff',
	},
	{
		name: 'Marfil',
		hex: '#F5F0E6',
		rgb: '245 240 230',
		cmyk: '0 2 6 4',
		pms: '9224 C',
		share: 26,
		ink: 'var(--vd-ink)',
	},
	{
		name: 'Oro Laurel',
		hex: '#AE8C46',
		rgb: '174 140 70',
		cmyk: '0 20 60 32',
		pms: '7562 C · 871 C metálico',
		share: 16,
		ink: '#fff',
	},
	{
		name: 'Ónix',
		hex: '#121214',
		rgb: '18 18 20',
		cmyk: '60 40 40 100',
		pms: 'Black 6 C',
		share: 12,
		ink: '#fff',
	},
	{
		name: 'Kraft',
		hex: '#C19A6B',
		rgb: '193 154 107',
		cmyk: 'Soporte natural',
		pms: '—',
		share: 8,
		ink: 'var(--vd-ink)',
	},
];

const MISUSES: {
	label: string;
	style: CSSProperties;
	primary?: string;
	accent?: string;
	bg?: string;
}[] = [
	{ label: 'Deformar', style: { transform: 'scaleX(1.45)' } },
	{
		label: 'Cambiar los colores',
		style: {},
		primary: '#b3261e',
		accent: '#2e7d32',
	},
	{ label: 'Rotar', style: { transform: 'rotate(-22deg)' } },
	{
		label: 'Fondos cargados',
		style: {},
		bg: 'repeating-linear-gradient(45deg, #ae8c46 0 10px, #1f2a3e 10px 20px)',
	},
];

export default function Identity() {
	const [kind, setKind] = useState<MarkKind>('isologo');
	const [all, setAll] = useState(false);
	const shown = all ? VERSIONS : VERSIONS.slice(0, 6);

	return (
		<>
			<section id='identidad' className='vd-section'>
				<header className='vd-head'>
					<h2>Identidad</h2>
					<p>
						Tres piezas según el espacio disponible. El isologo es la firma
						principal.
					</p>
				</header>

				<div className='vd-arch'>
					<figure>
						<div className='vd-arch__stage'>
							<Mark kind='isologo' width='min(70%, 300px)' />
						</div>
						<figcaption>
							<strong>Isologo</strong> Empaques, web, tienda y papelería.
						</figcaption>
					</figure>
					<figure>
						<div className='vd-arch__stage'>
							<Mark kind='symbol' width='min(52%, 190px)' />
						</div>
						<figcaption>
							<strong>Símbolo</strong> Bordados, herrajes, sellos y patrones.
						</figcaption>
					</figure>
					<figure>
						<div className='vd-arch__stage'>
							<Mark kind='wordmark' width='82%' />
						</div>
						<figcaption>
							<strong>Logotipo</strong> Etiquetas de cuello, cintas y lomos.
						</figcaption>
					</figure>
				</div>
			</section>

			<section id='color' className='vd-section'>
				<header className='vd-head vd-head--row'>
					<div>
						<h2>Versiones de color</h2>
						<p>El mismo archivo original, preparado para cada técnica.</p>
					</div>
					<div className='vd-seg' role='group' aria-label='Pieza mostrada'>
						{(['isologo', 'symbol'] as const).map(k => (
							<button
								key={k}
								type='button'
								aria-pressed={kind === k}
								onClick={() => setKind(k)}
							>
								{k === 'isologo' ? 'Isologo' : 'Símbolo'}
							</button>
						))}
					</div>
				</header>

				<div className='vd-versions'>
					{shown.map(v => (
						<figure key={v.name}>
							<div className='vd-versions__stage' style={{ background: v.bg }}>
								<Mark
									kind={kind}
									primary={v.primary}
									accent={v.accent}
									mono={v.mono}
									finish={v.finish}
									width={kind === 'isologo' ? '54%' : '42%'}
								/>
							</div>
							<figcaption>
								<strong>{v.name}</strong> {v.use}
							</figcaption>
						</figure>
					))}
				</div>
				<button
					type='button'
					className='vd-more'
					aria-expanded={all}
					onClick={() => setAll(a => !a)}
				>
					{all
						? 'Mostrar menos versiones'
						: `Mostrar las ${VERSIONS.length} versiones`}
				</button>

				<div className='vd-palette'>
					<h3 className='vd-palette__title'>Paleta</h3>
					<div className='vd-palette__band' aria-hidden='true'>
						{PALETTE.map(c => (
							<span
								key={c.hex}
								style={{ background: c.hex, color: c.ink, flexGrow: c.share }}
							>
								{c.hex}
							</span>
						))}
					</div>
					<table className='vd-palette__table'>
						<caption>
							Paleta medida sobre los archivos originales. Confirma las
							referencias Pantone con una guía impresa.
						</caption>
						<thead>
							<tr>
								<th scope='col'>Color</th>
								<th scope='col'>HEX</th>
								<th scope='col'>RGB</th>
								<th scope='col'>CMYK</th>
								<th scope='col'>Pantone (aprox.)</th>
							</tr>
						</thead>
						<tbody>
							{PALETTE.map(c => (
								<tr key={c.hex}>
									<th scope='row'>
										<i style={{ background: c.hex }} aria-hidden='true' />
										{c.name}
									</th>
									<td>{c.hex}</td>
									<td>{c.rgb}</td>
									<td>{c.cmyk}</td>
									<td>{c.pms}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section id='reglas' className='vd-section'>
				<header className='vd-head'>
					<h2>Reglas de uso</h2>
				</header>

				<div className='vd-rules'>
					<div>
						<div className='vd-rules__figure'>
							<div className='vd-clear'>
								<Mark kind='isologo' width='100%' />
								<span className='vd-clear__x vd-clear__x--t'>x</span>
								<span className='vd-clear__x vd-clear__x--l'>x</span>
							</div>
						</div>
						<h3>Área de protección</h3>
						<p>
							Alrededor del logo queda libre al menos <b>x</b>, la altura de la
							corona. Ningún texto ni borde entra en esa zona.
						</p>
					</div>

					<div>
						<div className='vd-rules__figure vd-sizes'>
							<span>
								<Mark kind='isologo' width='76px' />
								30 mm · 140 px
							</span>
							<span>
								<Mark kind='symbol' width='34px' />
								12 mm · 32 px
							</span>
							<span>
								<Mark
									kind='symbol'
									width='52px'
									mono={PAINT.threadGold}
									finish='embroidery'
								/>
								Bordado ≥ 25 mm
							</span>
						</div>
						<h3>Tamaños mínimos</h3>
						<p>
							Las hojas del laurel son finas y se pierden por debajo de estos
							tamaños. En bordado, usa el símbolo desde 25 mm.
						</p>
					</div>

					<div>
						<div className='vd-rules__figure vd-type'>
							<p className='vd-type__caps'>Victoria de Dios</p>
							<p className='vd-type__serif'>Elegancia que se hereda.</p>
							<p className='vd-type__sans'>Lifestyle &amp; Home</p>
						</div>
						<h3>Tipografía</h3>
						<p>
							<b>Cinzel</b> para titulares en mayúsculas,{' '}
							<b>Cormorant Garamond</b> para textos editoriales y <b>Jost</b>{' '}
							para datos y etiquetas. Las tres son gratuitas.
						</p>
					</div>
				</div>

				<div className='vd-misuse'>
					<p className='vd-label'>Evitar</p>
					{MISUSES.map(m => (
						<figure key={m.label}>
							<div
								className='vd-misuse__stage'
								style={{ background: m.bg ?? 'var(--vd-ivory)' }}
							>
								<Mark
									kind='symbol'
									width='42%'
									primary={m.primary}
									accent={m.accent}
									style={m.style}
								/>
							</div>
							<figcaption>{m.label}</figcaption>
						</figure>
					))}
				</div>
			</section>
		</>
	);
}
