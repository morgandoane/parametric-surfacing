import { FC, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParametricKlein, { SphereData } from './components/ParametricKlein';

type State = {
	u: number;
	v: number;
	spheres: SphereData[];
};

const Klein: FC = () => {
	const [dimensions, setDimensions] = useState<State>({
		u: 100,
		v: 100,
		spheres: [
			{
				u: 10,
				v: 10,
				speed: 0.5,
			},
			{
				u: 10,
				v: 10,
				speed: 0.5,
			},
			{
				u: 10,
				v: 10,
				speed: 0.5,
			},
			{
				u: 10,
				v: 10,
				speed: 0.5,
			},
			{
				u: 10,
				v: 10,
				speed: 0.5,
			},
			{
				u: 10,
				v: 10,
				speed: 0.5,
			},
		],
	});

	return (
		<div className="h-screen bg-black">
			<Canvas
				camera={{ position: [0, 0, 5] }}
				style={{
					backgroundColor: 'transparent',
					width: '100%',
					height: '100vh',
				}}
			>
				<ambientLight intensity={0.6} />
				<directionalLight position={[5, 5, 5]} intensity={1} />
				<ParametricKlein {...dimensions} />
				<OrbitControls />
			</Canvas>
			<div className="fixed bottom-0 right-0 flex flex-col gap-4 p-6">
				<p className="text-white">U</p>
				<input
					className="p-0 m-0"
					type="range"
					min={10}
					max={200}
					value={dimensions.u}
					onChange={(e) =>
						setDimensions({ ...dimensions, u: parseInt(e.target.value) })
					}
				/>
				<p className="text-white">V</p>
				<input
					className="p-0 m-0"
					type="range"
					min={10}
					max={200}
					value={dimensions.v}
					onChange={(e) =>
						setDimensions({ ...dimensions, v: parseInt(e.target.value) })
					}
				/>
				<p className="text-white">Travelers</p>
				<input
					className="p-0 m-0"
					type="range"
					min={0}
					max={10}
					value={dimensions.spheres.length}
					onChange={(e) =>
						setDimensions({
							...dimensions,
							spheres: Array.from({ length: parseInt(e.target.value) }).map(
								() => ({
									u: 10,
									v: 10,
									speed: 1,
								})
							),
						})
					}
				/>
			</div>
		</div>
	);
};

export default Klein;
