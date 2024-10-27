import { Button } from '@headlessui/react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Klein from '@scenes/Home/components/Klein';
import Soul from '@scenes/Home/components/Soul';
import { FC } from 'react';

export interface ExplanationProps {
	country: string;
	next: () => void;
}
const gridSize = 10;
const offset = 3;

const Explanation: FC<ExplanationProps> = ({ next, country }) => {
	return (
		<div className="h-screen items-start p-12">
			<div className="text-white flex items-start">
				<div className="w-1/3 pr-8 flex flex-col items-center text-center">
					<p className="my-4 text-heading-5">
						This is your soul, in it's current state. As you progress from this
						life into the next, you see it's color change.
					</p>
					<Canvas
						camera={{ position: [0, 0, 5] }}
						style={{ height: '200px', width: '200px' }}
					>
						<OrbitControls enableZoom />
						<ambientLight intensity={0.5} />
						<directionalLight position={[5, 5, 5]} intensity={1} />
						<Soul color="#33FF57" />
					</Canvas>
				</div>
				<div className="w-1/3 pr-8 flex flex-col items-center text-center">
					<p className="my-4 text-heading-5">
						These are the other 100 souls that began their journey with you in{' '}
						{country}
					</p>
					<Canvas
						camera={{ position: [0, 0, gridSize * offset] }}
						style={{ height: '200px', width: '500px' }}
					>
						<OrbitControls enableZoom />
						<ambientLight intensity={0.5} />
						<directionalLight position={[10, 10, 10]} intensity={1} />
						{Array.from({ length: gridSize }).map((_, row) =>
							Array.from({ length: gridSize }).map((_, col) => (
								<Soul
									color="#33FF57"
									key={`${row}-${col}`}
									position={[
										(col - gridSize / 2) * offset,
										(row - gridSize / 2) * offset,
										0,
									]}
								/>
							))
						)}
					</Canvas>
				</div>
				<div className="w-1/3 pr-8 flex flex-col items-center text-center">
					<p className="my-4 text-heading-5">
						We will be visualizing the journey of these souls along three
						functions of time's infinite cycle.
					</p>
					<Canvas
						camera={{ position: [0, 0, 10] }}
						style={{ height: '200px', width: '200px' }}
					>
						<OrbitControls enableZoom />
						<ambientLight intensity={0.5} />
						<directionalLight position={[5, 5, 5]} intensity={1} />
						<Klein />
					</Canvas>
				</div>
			</div>
			<div
				className="flex justify-center mt-16"
				style={{ width: 'calc(100% - 48px)' }}
			>
				<Button
					onClick={() => {
						next();
					}}
					className="rounded-full bg-slate-50 text-zinc-800 text-body-large px-8 py-2"
				>
					Begin
				</Button>
			</div>
		</div>
	);
};

export default Explanation;
