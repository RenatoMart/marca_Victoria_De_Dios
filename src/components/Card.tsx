// src/components/Card.tsx - Componente React puro
import { useState } from 'react';
import '../styles/Card.css';

type CardProps = {
	title: string;
	description: string;
	imageUrl?: string;
	linkUrl?: string;
	price?: string;
	discount?: string;
};

function Card({
	title,
	description,
	imageUrl,
	linkUrl,
	price,
	discount,
}: CardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`card ${isHovered ? 'card-hovered' : ''}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => linkUrl && window.open(linkUrl, '_blank')}
		>
			{discount && <div className='card-discount'>{discount}</div>}

			{imageUrl && (
				<div className='card-image-container'>
					<img src={imageUrl} alt={title} className='card-image' />
				</div>
			)}

			<div className='card-content'>
				<h3 className='card-title'>{title}</h3>
				<p className='card-description'>{description}</p>

				<div className='card-footer'>
					{price && <span className='card-price'>{price}</span>}
					<button className='card-button'>Comprar</button>
				</div>
			</div>
		</div>
	);
}

export default Card;
