import type { MugColor, MugDesign } from './rig';

export const MUG_TONES: Record<MugColor, { body: string; ink: string; foil: string; label: string }> = {
	marfil: { body: '#f3eee4', ink: '#1f2a3e', foil: '#a98a45', label: 'Marfil' },
	negro: { body: '#18181b', ink: '#d8bd7e', foil: '#d8bd7e', label: 'Negro' },
	azul: { body: '#1f2a3e', ink: '#d8bd7e', foil: '#d8bd7e', label: 'Azul' },
};

/** Proporción de la banda impresa de la taza (arco ÷ alto). */
export const DECAL_RATIO = 1.68;
export const DECAL_W = 1024;
export const DECAL_H = Math.round(DECAL_W / DECAL_RATIO);

export const NAME_MAX = 14;

function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
	ctx.beginPath();
	ctx.moveTo(cx, cy - r);
	ctx.quadraticCurveTo(cx, cy, cx + r * 0.55, cy);
	ctx.quadraticCurveTo(cx, cy, cx, cy + r);
	ctx.quadraticCurveTo(cx, cy, cx - r * 0.55, cy);
	ctx.quadraticCurveTo(cx, cy, cx, cy - r);
	ctx.fill();
}

interface Sources {
	logoColor: HTMLImageElement;
	logoMask: HTMLImageElement;
}

/** Pinta el diseño elegido sobre el lienzo de la banda impresa. Fondo transparente. */
export function drawDesign(
	canvas: HTMLCanvasElement,
	design: MugDesign,
	text: string,
	color: MugColor,
	src: Sources,
) {
	const ctx = canvas.getContext('2d')!;
	const W = canvas.width;
	const H = canvas.height;
	const tone = MUG_TONES[color];
	ctx.clearRect(0, 0, W, H);
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	if (design === 'isologo') {
		const h = H * 0.9;
		const img = color === 'marfil' ? src.logoColor : src.logoMask;
		const w = h * (img.naturalWidth / img.naturalHeight);
		if (color === 'marfil') {
			ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
		} else {
			const tmp = document.createElement('canvas');
			tmp.width = Math.round(w);
			tmp.height = Math.round(h);
			const t = tmp.getContext('2d')!;
			t.drawImage(img, 0, 0, tmp.width, tmp.height);
			t.globalCompositeOperation = 'source-in';
			t.fillStyle = tone.ink;
			t.fillRect(0, 0, tmp.width, tmp.height);
			ctx.drawImage(tmp, (W - w) / 2, (H - h) / 2);
		}
		return;
	}

	ctx.fillStyle = tone.ink;
	ctx.strokeStyle = tone.foil;
	ctx.lineWidth = 2;

	if (design === 'monograma') {
		ctx.font = `600 ${H * 0.52}px "Cormorant Garamond", "Times New Roman", serif`;
		ctx.fillText('VD', W / 2, H * 0.44);
		ctx.font = `500 ${H * 0.082}px Cinzel, "Times New Roman", serif`;
		ctx.letterSpacing = `${H * 0.02}px`;
		ctx.fillText('VICTORIA DE DIOS', W / 2, H * 0.78);
		ctx.letterSpacing = '0px';
		ctx.fillStyle = tone.foil;
		star(ctx, W / 2, H * 0.16, H * 0.07);
		return;
	}

	// nombre
	const label = (text.trim() || 'TU NOMBRE').toUpperCase().slice(0, NAME_MAX);
	let size = H * 0.3;
	ctx.font = `500 ${size}px Cinzel, "Times New Roman", serif`;
	ctx.letterSpacing = `${size * 0.08}px`;
	const maxW = W * 0.82;
	const measured = ctx.measureText(label).width;
	if (measured > maxW) {
		size *= maxW / measured;
		ctx.font = `500 ${size}px Cinzel, "Times New Roman", serif`;
		ctx.letterSpacing = `${size * 0.08}px`;
	}
	ctx.fillText(label, W / 2, H * 0.5);
	ctx.letterSpacing = '0px';
	ctx.fillStyle = tone.foil;
	star(ctx, W / 2, H * 0.2, H * 0.06);
	ctx.beginPath();
	ctx.moveTo(W * 0.3, H * 0.74);
	ctx.lineTo(W * 0.7, H * 0.74);
	ctx.stroke();
}
