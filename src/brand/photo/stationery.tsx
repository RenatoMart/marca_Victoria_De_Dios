import { PAINT } from '../Mark';
import type { MockupItem } from '../types';
import { photo } from './PhotoScene';

export const photoStationery: MockupItem[] = [
	{
		id: 'foto-tarjeta-negra',
		title: 'Tarjeta de presentación negra',
		category: 'papeleria',
		technique: 'Hot stamping dorado',
		material: 'Papel de algodón negro 350 g',
		note: 'El dorado sobre negro es la combinación de mayor contraste y percepción de valor en tarjetería.',
		credit: { photographer: 'Kaboompics.com', url: 'https://www.pexels.com/photo/a-black-business-card-on-a-white-background-8947555/' },
		Scene: photo('/mockups/pap-tarjeta-negra.jpg', 'Tarjeta de presentación negra con el isologo dorado', []),
	},
	{
		id: 'foto-sobre-sello',
		title: 'Sobre con sello de cera dorado',
		category: 'papeleria',
		technique: 'Sello de cera dorado',
		material: 'Sobre de papel texturizado oscuro',
		note: 'Para tarjetas de agradecimiento e invitaciones; el sello se aplica a mano sobre la solapa.',
		credit: { photographer: 'Senna Doe', url: 'https://www.pexels.com/photo/elegant-envelope-with-gold-wax-seal-in-dark-background-35241517/' },
		Scene: photo('/mockups/pap-sobre-sello.jpg', 'Sobre oscuro con sello de cera dorado y el símbolo de Victoria de Dios', []),
	},
	{
		id: 'foto-papeleria-set',
		title: 'Set de papelería y libretas',
		category: 'papeleria',
		technique: 'Grabado en relieve + tampografía',
		material: 'Libreta de tapa dura y bloc de notas kraft',
		note: 'Aplicación combinada: relieve en la libreta principal y tampografía en el bloc kraft de acompañamiento.',
		credit: { photographer: 'Cup of Couple', url: 'https://www.pexels.com/photo/a-flatlay-of-a-cup-of-coffee-and-writing-materials-7657977/' },
		Scene: photo('/mockups/pap-papeleria-set.jpg', 'Libreta y bloc de notas kraft con el isologo y el símbolo de Victoria de Dios', []),
	},
	{
		id: 'foto-etiqueta-colgante',
		title: 'Etiqueta colgante de cartulina',
		category: 'papeleria',
		technique: 'Impresión offset',
		material: 'Cartulina reciclada con cordel de algodón',
		note: 'Etiqueta de precio y composición para prendas y accesorios; formato ovalado con cordel.',
		credit: { photographer: 'Miguel Á. Padriñán', url: 'https://www.pexels.com/photo/white-tag-with-string-and-black-background-1111320/' },
		Scene: photo('/mockups/pap-etiqueta-colgante.jpg', 'Etiqueta colgante de cartulina con el símbolo de Victoria de Dios', [
			{
				kind: 'symbol',
				x: 20,
				y: 47,
				w: 13,
				mono: PAINT.navy,
				blend: 'multiply',
				opacity: 0.85,
			},
		]),
	},
];
