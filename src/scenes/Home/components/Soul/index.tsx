import React, { useRef } from 'react';
import { Mesh } from 'three';

type SoulProps = {
	position?: [number, number, number];
	color: string;
};

const Soul: React.FC<SoulProps> = ({ position, color }) => {
	const ref = useRef<Mesh>(null);

	return (
		<mesh ref={ref} position={position}>
			<sphereGeometry args={[1, 24, 24]} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
};

export default Soul;
