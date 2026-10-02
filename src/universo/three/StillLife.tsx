import { ContactShadows, RoundedBox } from '@react-three/drei';
import { MAT } from './materials';
import { MugBody } from './Mug';

/**
 * Bodegón del universo Victoria de Dios: tres objetos, tres mundos.
 * - Hogar: un volumen azul de aristas suaves (orden, utilidad).
 * - Estilo de vida: un aro dorado de pie (accesorio, gesto).
 * - Personalizados: la taza de cerámica con filete dorado.
 * No giran: es la cámara la que observa.
 */
export default function StillLife() {
	return (
		<group position={[0, 0, 0]}>
			<mesh material={MAT.plinth} position={[0, -0.09, 0]} receiveShadow>
				<cylinderGeometry args={[1.85, 1.85, 0.18, 96]} />
			</mesh>

			<RoundedBox
				args={[1.05, 1.05, 1.05]}
				radius={0.09}
				smoothness={4}
				material={MAT.navy}
				position={[-0.82, 0.525, -0.32]}
				rotation={[0, 0.38, 0]}
			/>

			<mesh
				material={MAT.gold}
				position={[-0.42, 0.445, 0.78]}
				rotation={[0, 0.95, 0]}
			>
				<torusGeometry args={[0.4, 0.045, 32, 128]} />
			</mesh>

			<group position={[0.72, 0, 0.12]} rotation={[0, -0.7, 0]}>
				<MugBody rim />
			</group>

			<ContactShadows
				position={[0, 0.001, 0]}
				scale={4.2}
				blur={2.6}
				opacity={0.42}
				far={1.6}
				resolution={512}
				frames={1}
				color='#1b1610'
			/>
		</group>
	);
}
