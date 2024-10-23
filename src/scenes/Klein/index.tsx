import { FC, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParametricKlein from './components/ParametricKlein';

const Klein: FC = () => {
	const [dimensions, setDimensions] = useState({ u: 100, v: 100 });

	return (
		<div className="bg-">
			<Canvas
				camera={{ position: [0, 0, 5] }}
				style={{
					backgroundColor: 'black',
					width: '100%',
					height: '100vh',
				}}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 5, 5]} intensity={1} />
				<ParametricKlein {...dimensions} />
				<OrbitControls />
			</Canvas>
		</div>
	);
};

export default Klein;
