import { FC, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshDistortMaterial } from '@react-three/drei';
import { ParametricGeometry } from 'three/examples/jsm/Addons.js';
import { useFrame } from '@react-three/fiber';

export interface SphereData {
	u: number;
	v: number;
	speed: number;
	color?: string;
}

export interface ParametricKleinProps {
	u: number;
	v: number;
	spheres: SphereData[]; // Array of spheres with movement data
}

const ParametricKlein: FC<ParametricKleinProps> = ({ u, v, spheres }) => {
	const kleinRef = useRef<THREE.Mesh>(null);
	const sphereRefs = useRef<THREE.Mesh[]>([]); // Array of refs for each sphere
	const [time, setTime] = useState(0);

	const parametricSurface = (u: number, v: number, target: THREE.Vector3) => {
		u = u * Math.PI * 2;
		v = v * Math.PI * 2;

		let x, y, z;
		if (u < Math.PI) {
			x =
				3 * Math.cos(u) * (1 + Math.sin(u)) +
				2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
			y =
				8 * Math.sin(u) + 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
		} else {
			x =
				3 * Math.cos(u) * (1 + Math.sin(u)) +
				2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
			y = 8 * Math.sin(u);
		}
		z = 2 * (1 - Math.cos(u) / 2) * Math.sin(v);

		target.set(x, y, z);
	};

	// Create ParametricGeometry from the surface function
	const geometry = new ParametricGeometry(parametricSurface, u, v);

	// Animate the spheres positions along the Klein surface
	useFrame(() => {
		const newTime = time + 0.0035;
		setTime(newTime);

		spheres.forEach((sphere, i) => {
			if (sphereRefs.current[i]) {
				const position = new THREE.Vector3(
					sphereRefs.current[i].position.x * (i % 2 === 0 ? 1 : -1),
					sphereRefs.current[i].position.y * (i % 2 === 0 ? 1 : -1),
					sphereRefs.current[i].position.z * (i % 2 === 0 ? 1 : -1)
				);
				const updatedU = (newTime * sphere.speed * 2 * Math.PI) % (2 * Math.PI); // Full range for u
				const updatedV =
					(newTime * sphere.speed * 2 * Math.PI + i) % (2 * Math.PI); // Full range for v, adding i as an offset

				parametricSurface(
					updatedU / (2 * Math.PI),
					updatedV / (2 * Math.PI),
					position
				);
				sphereRefs.current[i].position.set(position.x, position.y, position.z);
			}
		});
	});

	const anchorTime = time + 0.25;
	const mode = Math.floor(anchorTime) % 2 === 0 ? 'inside' : 'outside';

	return (
		<>
			<mesh ref={kleinRef} geometry={geometry}>
				<MeshDistortMaterial
					color="white"
					wireframe={true}
					distort={0}
					speed={1}
				/>
			</mesh>

			{/* Render spheres moving along the surface */}
			{spheres.map((sphere, index) => (
				<mesh
					key={`sphereA-${index}`}
					ref={(el) => (sphereRefs.current[index] = el!)} // Assign each ref
					position={[0, 0, 0]}
				>
					<sphereGeometry args={[0.5, 32, 32]} /> {/* Sphere with radius 0.5 */}
					<meshBasicMaterial
						color={mode === 'inside' ? 'red' : 'blue'}
						wireframe
					/>
				</mesh>
			))}
		</>
	);
};

export default ParametricKlein;
