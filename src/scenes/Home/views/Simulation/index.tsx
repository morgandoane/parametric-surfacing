import { State } from '@scenes/Home';
import { getRandomLifeExpectancy } from '@utils/getRandomLifeExpectancy';
import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export interface SimulationProps {
	state: State;
}

const kleinPoint = (
	u: number,
	v: number
): { x: number; y: number; z: number } => {
	let x, y, z;

	if (u < Math.PI) {
		x =
			3 * Math.cos(u) * (1 + Math.sin(u)) +
			2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
		y = 8 * Math.sin(u) + 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
	} else {
		x =
			3 * Math.cos(u) * (1 + Math.sin(u)) +
			2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
		y = 8 * Math.sin(u);
	}
	z = 2 * (1 - Math.cos(u) / 2) * Math.sin(v);

	return { x, y, z };
};

const parametricKlein = (u: number, v: number, target: THREE.Vector3) => {
	u = u * Math.PI * 2;
	v = v * Math.PI * 2;

	const { x, y, z } = kleinPoint(u, v);

	target.set(x, y, z);
};

const uCount = 100;
const vCount = 100;

const kleinGeometry = new ParametricGeometry(parametricKlein, uCount, vCount);

type Soul = {
	id: string;
	country: string;
	name: string;
	age: number;
	birth: number;
	expectency: number;
};

type SoulCollection = {
	souls: Soul[];
	isUser: boolean;
};

type SimulationState = {
	souls: SoulCollection[];
};

const randomSoul = (): Soul => ({
	id: `soul-${Math.random()}`,
	country: 'USA',
	name: 'John Doe',
	age: 0,
	birth: 2000,
	expectency: getRandomLifeExpectancy(),
});

const defaultSouls = (state: State): Soul[] =>
	Array.from({ length: 100 }).map((_, i) => ({
		id: `soul-${i}`,
		country: 'USA',
		name: 'John Doe',
		age: 0,
		birth: state.year!,
		expectency: getRandomLifeExpectancy(),
		generation: 0,
	}));

const defaultUser = (state: State): Soul => ({
	id: 'user',
	country: state.country,
	name: state.name,
	age: 0,
	birth: state.year!,
	expectency: getRandomLifeExpectancy(),
});

const getColor = (generation: number): string => {
	const hues = [
		'#FF5733',
		'#33FF57',
		'#5733FF',
		'#FF33A1',
		'#33D4FF',
		'#FFD433',
		'#33FFA1',
		'#FF5733',
		'#A133FF',
		'#33FFCC',
		'#FF3380',
		'#4DFF33',
		'#33FFEB',
		'#FF33D4',
		'#FFA133',
		'#33A1FF',
		'#80FF33',
		'#FF3385',
		'#33FFD4',
		'#D433FF',
	];

	return hues[generation % hues.length];
};

const bumpState = (state: SimulationState): SimulationState => {
	const bump = 0.3;

	const newSouls: SoulCollection[] = state.souls.map(({ souls, isUser }) => {
		const latest = souls[souls.length - 1];
		if (latest.age >= latest.expectency) {
			// death has occurred
			souls.push({
				...randomSoul(),
			});
		} else {
			// bump the age
			latest.age += bump;
		}
		return { souls, isUser };
	});

	return { souls: newSouls };
};

const Simulation: FC<SimulationProps> = ({
	state: { name, country, year },
}) => {
	const kleinRef = useRef<THREE.Mesh>(null);

	const [state, setState] = useState<SimulationState>({
		souls: [
			...defaultSouls({ name, country, year }).map((soul) => ({
				souls: [soul],
				isUser: false,
			})),
			{
				souls: [defaultUser({ name, country, year })],
				isUser: true,
			},
		],
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setState(bumpState);
		}, 50);

		return () => clearInterval(interval);
	}, []);
	const maxGenerations = state.souls.reduce(
		(acc, { souls }) => Math.max(acc, souls.length),
		0
	);
	return (
		<div className="h-screen flex items-stretch">
			<div className="p-4 flex items-stretch gap-1 relative">
				{state.souls.map(({ souls, isUser }, i) => {
					const totalYears =
						souls.slice(0, -1).reduce((acc, soul) => acc + soul.expectency, 0) +
						souls[souls.length - 1].age;

					const soulShare = (age: number) =>
						totalYears === 0 ? 0 : age / totalYears;

					return (
						<div key={`soulBar-${i}`} className="w-1 flex flex-col">
							{souls.map((soul, j) => (
								<div
									key={`soul-${soul.id}`}
									style={{
										backgroundColor: getColor(j + 1),
										height:
											(j < souls.length - 1
												? soulShare(soul.expectency)
												: soulShare(soul.age)) *
												100 +
											'%',
									}}
								/>
							))}
						</div>
					);
				})}
			</div>
			<Canvas
				style={{ height: '100%', width: '50%', flex: 1 }}
				camera={{ position: [0, 0, 20] }}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 5, 5]} intensity={1} />
				<mesh ref={kleinRef} geometry={kleinGeometry}>
					<meshStandardMaterial color="#fff" wireframe />
				</mesh>
				{state.souls.map(({ souls }, i) => {
					const soul = souls[souls.length - 1];
					const ratio = soul.age / soul.expectency;
					const boundary = 0.73;
					const wrappedRatio = ratio + boundary;

					const position = kleinPoint(wrappedRatio * Math.PI * 2, i);

					return (
						<mesh key={soul.id} position={[position.x, position.y, position.z]}>
							<sphereGeometry args={[0.5, 24, 24]} />
							<meshStandardMaterial color={getColor(souls.length)} wireframe />
						</mesh>
					);
				})}
				<OrbitControls enableZoom />
			</Canvas>
		</div>
	);
};

export default Simulation;
