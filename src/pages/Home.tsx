// src/pages/Home.tsx
import Card from '../components/Card';
import LogoAnimation from '../components/LogoAnimation';
import '../styles/Home.css';

const products = [
	{
		title: 'Laptop Gaming Pro',
		description:
			'Potente laptop con RTX 4060, ideal para gaming y trabajo profesional.',
		imageUrl:
			'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
		price: '$1,299',
		discount: '-15%',
	},
	{
		title: 'Smartphone Ultra 5G',
		description:
			'Pantalla AMOLED 6.7", cámara de 108MP y batería de larga duración.',
		imageUrl:
			'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
		price: '$899',
		discount: '-20%',
	},
	{
		title: 'Auriculares Pro Wireless',
		description:
			'Cancelación de ruido activa, 30h de batería y audio Hi-Fi premium.',
		imageUrl:
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
		price: '$299',
		discount: '-25%',
	},
	{
		title: 'Tablet Creator 12.9"',
		description:
			'Perfecta para diseño y productividad. Incluye stylus y teclado.',
		imageUrl:
			'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80',
		price: '$799',
		discount: '-10%',
	},
	{
		title: 'Smartwatch Elite',
		description:
			'Monitoreo de salud 24/7, GPS integrado y resistencia al agua.',
		imageUrl:
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
		price: '$449',
		discount: '-18%',
	},
	{
		title: 'Cámara Mirrorless 4K',
		description: 'Sensor full-frame, video 4K 60fps y conectividad WiFi.',
		imageUrl:
			'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
		price: '$1,899',
		discount: '-12%',
	},
];

function Home() {
	return (
		<div className='home-container'>
			{/* Hero Section con AnimeJS */}
			<section className='hero-section'>
				<LogoAnimation />
				<p className='hero-subtitle'>
					Las mejores ofertas en tecnología, a un solo click
				</p>
			</section>

			{/* Products Section - Pure React */}
			<section className='products-section'>
				<h2 className='section-title'>Productos Destacados</h2>
				<div className='products-grid'>
					{products.map(product => (
						<Card key={product.title} {...product} />
					))}
				</div>
			</section>
		</div>
	);
}

export default Home;
