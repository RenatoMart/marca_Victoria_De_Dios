import {
	CanvasTexture,
	LinearFilter,
	LinearMipmapLinearFilter,
	RepeatWrapping,
	SRGBColorSpace,
} from 'three';

/**
 * Convierte una máscara PNG (forma en el canal alfa) en dos texturas:
 *  - `color`: blanco con alfa, para teñir con `material.color` y recortar la silueta.
 *  - `height`: relieve (canal verde) con borde suavizado, para `bumpMap` (el foil «sube»).
 */
export function maskTextures(img: HTMLImageElement, size: number, bevelPx = 3) {
	const w = size;
	const h = Math.round(size * (img.naturalHeight / img.naturalWidth));

	const a = document.createElement('canvas');
	a.width = w;
	a.height = h;
	const actx = a.getContext('2d')!;
	actx.drawImage(img, 0, 0, w, h);
	const data = actx.getImageData(0, 0, w, h);
	for (let i = 0; i < data.data.length; i += 4) {
		data.data[i] = data.data[i + 1] = data.data[i + 2] = 255;
	}
	actx.putImageData(data, 0, 0);

	const b = document.createElement('canvas');
	b.width = w;
	b.height = h;
	const bctx = b.getContext('2d')!;
	bctx.fillStyle = '#000';
	bctx.fillRect(0, 0, w, h);
	bctx.filter = `blur(${bevelPx * (size / 1024)}px)`;
	bctx.drawImage(a, 0, 0);

	const color = new CanvasTexture(a);
	color.colorSpace = SRGBColorSpace;
	color.anisotropy = 8;
	const height = new CanvasTexture(b);
	height.anisotropy = 4;
	height.magFilter = LinearFilter;
	height.minFilter = LinearMipmapLinearFilter;
	return { color, height, aspect: img.naturalHeight / img.naturalWidth };
}

/** Grano fino de papel de algodón para el soporte del sello. */
export function paperGrain(size = 256) {
	const c = document.createElement('canvas');
	c.width = c.height = size;
	const ctx = c.getContext('2d')!;
	const d = ctx.createImageData(size, size);
	for (let i = 0; i < d.data.length; i += 4) {
		const v = 110 + Math.random() * 90;
		d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
		d.data[i + 3] = 255;
	}
	ctx.putImageData(d, 0, 0);
	const t = new CanvasTexture(c);
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(5, 5);
	return t;
}
