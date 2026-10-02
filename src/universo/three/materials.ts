import { DoubleSide, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

/** Materiales compartidos (se crean una vez y se reutilizan en todas las vistas). */
export const MAT = {
	/** Esmalte cerámico marfil. */
	ceramic: new MeshPhysicalMaterial({
		color: '#f3eee4',
		roughness: 0.32,
		clearcoat: 0.7,
		clearcoatRoughness: 0.18,
		side: DoubleSide,
	}),
	/** Azul de marca con tacto aterciopelado (Hogar). */
	navy: new MeshPhysicalMaterial({
		color: '#1f2a3e',
		roughness: 0.62,
		sheen: 0.4,
		sheenColor: '#3a4a6e',
	}),
	/** Dorado cepillado (accesorio / estilo de vida). */
	gold: new MeshStandardMaterial({
		color: '#c7a159',
		metalness: 1,
		roughness: 0.3,
	}),
	/** Pedestal de piedra clara. */
	plinth: new MeshStandardMaterial({ color: '#e6dfd2', roughness: 0.92 }),
	/** Papel del transfer de sublimación. */
	paper: new MeshStandardMaterial({
		color: '#fbfaf7',
		roughness: 0.85,
		side: DoubleSide,
	}),
};
