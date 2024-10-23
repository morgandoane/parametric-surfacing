import { FC } from 'react';
import * as THREE from 'three';
import { MeshDistortMaterial } from '@react-three/drei';
import { ParametricGeometry } from 'three/examples/jsm/Addons.js';

export interface ParametricKleinProps {
	u: number;
	v: number;
}

const ParametricKlein: FC<ParametricKleinProps> = ({ u, v }) => {
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

	return (
		<mesh geometry={geometry}>
			{/* Use a material for the surface, e.g., MeshDistortMaterial for some effect */}
			<MeshDistortMaterial color="indigo" wireframe={true} />
		</mesh>
	);
};

export default ParametricKlein;
