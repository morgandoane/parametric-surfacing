import React, { FC, forwardRef, PropsWithRef, useRef } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';
import { ParametricGeometry } from 'three/examples/jsm/Addons.js';

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

export interface KleinProps {}

const Klein = forwardRef<Mesh, PropsWithRef<KleinProps>>((_, inputRef) => {
	const thisRef = useRef<Mesh>(null);

	const geometry = new ParametricGeometry(parametricKlein, uCount, vCount);

	return (
		<>
			<mesh ref={inputRef || thisRef} geometry={geometry}>
				<meshStandardMaterial
					color="white"
					wireframe
					opacity={0.5}
					transparent
				/>
			</mesh>
		</>
	);
});

export default Klein;
