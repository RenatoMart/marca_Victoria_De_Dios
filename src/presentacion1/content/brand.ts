export const BRAND = {
	name: 'Victoria de Dios',
	tagline: 'Lifestyle & Home',
	/**
	 * Destino de los botones de contacto. Cuando exista un canal real
	 * (WhatsApp, Instagram, correo) se cambia aquí y todos los CTA lo heredan.
	 * Mientras tanto llevan a la sección de personalización.
	 */
	contactHref: '#hazlo-tuyo',
	contactLabel: 'Hablemos de tu pedido',
} as const;

export type Universe = 'hogar' | 'estilo' | 'regalo';

export interface Product {
	id: string;
	name: string;
	note: string;
	universe: Universe;
	img: string;
	/** Proporción de la tarjeta; alterna alturas para ritmo editorial. */
	tall?: boolean;
}

export const UNIVERSES: { id: Universe | 'todo'; label: string }[] = [
	{ id: 'todo', label: 'Todo' },
	{ id: 'hogar', label: 'Hogar' },
	{ id: 'estilo', label: 'Estilo de vida' },
	{ id: 'regalo', label: 'Regalo y personalizado' },
];

export const PRODUCTS: Product[] = [
	{ id: 'taza', name: 'Taza esmaltada', note: 'Filo dorado, diseño propio', universe: 'hogar', img: 'hog-taza-blanca' },
	{ id: 'vela', name: 'Vela de vidrio', note: 'Aroma y presencia', universe: 'hogar', img: 'hog-vela', tall: true },
	{ id: 'chaqueta', name: 'Chaqueta de cuero', note: 'Bordado en dorado', universe: 'estilo', img: 'ropa-chaqueta-cuero', tall: true },
	{ id: 'tomatodo', name: 'Tomatodo de acero', note: 'Grabado al láser', universe: 'regalo', img: 'hog-tomatodo' },
	{ id: 'bolso', name: 'Bolso estructurado', note: 'Cuero cognac, herraje dorado', universe: 'estilo', img: 'acc-bolso-estructurado-cognac' },
	{ id: 'difusor', name: 'Difusor de ambiente', note: 'Frasco ámbar', universe: 'hogar', img: 'hog-difusor' },
	{ id: 'hoodie', name: 'Hoodie blanco', note: 'Isologo bordado', universe: 'estilo', img: 'ropa-hoodie-blanco', tall: true },
	{ id: 'caja', name: 'Caja de regalo', note: 'Cierre con cinta', universe: 'regalo', img: 'emp-caja-regalo-negra' },
	{ id: 'cojin', name: 'Cojín de lino', note: 'Para cada rincón', universe: 'hogar', img: 'hog-cojin' },
	{ id: 'tote', name: 'Tote crema', note: 'Uso diario', universe: 'estilo', img: 'acc-tote-crema' },
	{ id: 'sello', name: 'Sello de lacre', note: 'El detalle final', universe: 'regalo', img: 'emp-sello-cera' },
	{ id: 'toallas', name: 'Toallas bordadas', note: 'Algodón suave', universe: 'hogar', img: 'hog-toallas' },
];
