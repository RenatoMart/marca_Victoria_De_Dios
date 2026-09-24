import type { ComponentType } from 'react';

export type Category = 'empaques' | 'papeleria' | 'ropa' | 'accesorios' | 'hogar';

export const CATEGORIES: { id: Category; label: string }[] = [
	{ id: 'empaques', label: 'Empaques' },
	{ id: 'papeleria', label: 'Papelería' },
	{ id: 'ropa', label: 'Ropa & etiquetas' },
	{ id: 'accesorios', label: 'Carteras & bolsos' },
	{ id: 'hogar', label: 'Tazas, tomatodos & hogar' },
];

export interface MockupItem {
	id: string;
	title: string;
	category: Category;
	/** Técnica de aplicación del logo, p. ej. "Hot stamping dorado". */
	technique: string;
	/** Soporte o material, p. ej. "Cartón kraft corrugado". */
	material: string;
	/** Una línea de contexto opcional. */
	note?: string;
	Scene: ComponentType;
}
