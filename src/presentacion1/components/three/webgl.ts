import { LOW_END, QUALITY as BASE } from '../../../universo/quality';

export { hasWebGL } from '../../../universo/webgl';

/**
 * Misma calidad que el resto del proyecto (antialias siempre, densidad de píxeles hasta 2×
 * en móvil); aquí solo se añade el detalle de las texturas de relieve del sello.
 */
export const QUALITY = {
	...BASE,
	bumpDetail: LOW_END ? 512 : 1024,
};
