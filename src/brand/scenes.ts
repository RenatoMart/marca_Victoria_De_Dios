/** Escenas de marca (composiciones con varios productos). La primera se muestra destacada. */
export interface BrandScene {
	src: string;
	title: string;
	description: string;
	/** Productos que aparecen, como etiquetas cortas. */
	items: string[];
}

export const SCENES: BrandScene[] = [
	{
		src: '/escenas/papeleria-polo-taza.jpg',
		title: 'Identidad corporativa',
		description:
			'Tarjetas de presentación en marfil y azul con detalles dorados, polo piqué bordado con etiqueta tejida y taza de cerámica con filete dorado.',
		items: ['Tarjetas', 'Polo bordado', 'Etiqueta tejida', 'Taza', 'Libreta'],
	},
	{
		src: '/escenas/papeleria-corporativa.jpg',
		title: 'Papelería corporativa',
		description:
			'Tarjetas de presentación en marfil y azul con estampado dorado, hoja membretada, sobre con lacre y pluma estilográfica.',
		items: ['Tarjetas', 'Hoja membretada', 'Sobre con lacre'],
	},
	{
		src: '/escenas/coleccion-textil.jpg',
		title: 'Colección textil',
		description:
			'Polo piqué con el logo bordado, etiqueta tejida de cuello, camiseta con el símbolo y gorra con bordado 3D.',
		items: ['Polo bordado', 'Etiqueta tejida', 'Camiseta', 'Gorra'],
	},
	{
		src: '/escenas/boutique-maniqui.jpg',
		title: 'Boutique',
		description:
			'Maniquí de sastre con blazer bordado, perchero dorado y letrero de latón con el logo.',
		items: ['Blazer bordado', 'Maniquí', 'Letrero'],
	},
	{
		src: '/escenas/unboxing-empaque.jpg',
		title: 'Unboxing',
		description:
			'Caja kraft impresa, papel de seda con patrón del símbolo, tarjeta de agradecimiento y sticker de cierre.',
		items: ['Caja kraft', 'Papel de seda', 'Sticker'],
	},
	{
		src: '/escenas/bolsa-de-compra.jpg',
		title: 'Bolsa de compra y regalo',
		description:
			'Bolsa negra con el logo en foil dorado, caja de regalo azul con lazo marfil y tarjeta.',
		items: ['Bolsa negra', 'Caja de regalo', 'Tarjeta'],
	},
	{
		src: '/escenas/marroquineria.jpg',
		title: 'Marroquinería',
		description:
			'Bolso de cuero coñac con placa dorada, cartera azul con estampado dorado y llavero con medalla grabada.',
		items: ['Bolso', 'Cartera', 'Llavero'],
	},
	{
		src: '/escenas/tazas-y-tomatodos.jpg',
		title: 'Tazas y tomatodos',
		description:
			'Taza blanca con filete dorado, taza negra mate, tomatodo azul grabado y vaso térmico.',
		items: ['Tazas', 'Tomatodo', 'Vaso térmico'],
	},
	{
		src: '/escenas/hogar-aromas.jpg',
		title: 'Hogar y aromas',
		description:
			'Vela en frasco ámbar, difusor de varillas, cojín de lino bordado y toallas con el símbolo.',
		items: ['Vela', 'Difusor', 'Cojín', 'Toallas'],
	},
	{
		src: '/escenas/etiquetas-de-ropa.jpg',
		title: 'Etiquetas de ropa',
		description:
			'Etiquetas colgantes negras con foil dorado, etiqueta tejida azul y etiqueta de composición en satén.',
		items: ['Etiquetas colgantes', 'Etiqueta tejida', 'Etiqueta de satén'],
	},
	{
		src: '/escenas/regalo-corporativo.jpg',
		title: 'Regalo corporativo',
		description:
			'Caja rígida azul con el logo dorado: libreta con relieve, bolígrafo dorado, taza y tarjeta.',
		items: ['Caja de regalo', 'Libreta', 'Taza'],
	},
	{
		src: '/escenas/bolsa-tote-y-viaje.jpg',
		title: 'Tote, neceser y pañuelo',
		description:
			'Tote de lona serigrafiada, neceser de lino bordado y pañuelo de seda con patrón del símbolo.',
		items: ['Tote', 'Neceser', 'Pañuelo de seda'],
	},
];
