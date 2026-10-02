let cached: boolean | null = null;

/** Comprueba una vez si el navegador puede crear un contexto WebGL. */
export function hasWebGL() {
	if (cached !== null) return cached;
	try {
		const c = document.createElement('canvas');
		cached = Boolean(c.getContext('webgl2') ?? c.getContext('webgl'));
	} catch {
		cached = false;
	}
	return cached;
}
