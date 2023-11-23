import React, { Suspense, useMemo, useRef, useState } from 'react';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  SpotLight
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import night from '../../assets/textures/night.hdr';
import { Loader } from '..';

type SphereProps = {
  position?: THREE.Vector3;
};

interface SpotlightProps {
  point: THREE.Vector3;
  position: THREE.Vector3;
  color: string;
}

const Spotlight = ({ point, position, color }: SpotlightProps) => {
  const { intensity, angle, distance } = useControls('spotlight', {
    intensity: { value: 12, min: 0, max: 16, step: 0.1 },
    angle: { value: 0.4, min: 0, max: Math.PI / 2, step: 0.01 },
    distance: { value: 10, min: 0, max: 20, step: 0.1 }
  });

  const light = useRef<THREE.SpotLight>(new THREE.SpotLight());
  useFrame(() => {
    light.current.target.position.lerp(point, 0.1);
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <SpotLight
        castShadow
        ref={light}
        position={position}
        color={color}
        penumbra={0.5}
        distance={distance}
        angle={angle}
        attenuation={6}
        anglePower={4}
        intensity={intensity}
      />
    </>
  );
};

const Scene = () => {
  const [point, setPoint] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  const ref = useRef<THREE.Mesh>(new THREE.Mesh());

  const { raycaster, camera } = useThree();

  useFrame(state => {
    const [x, y] = [state.pointer.x, state.pointer.y];
    const mouse = new THREE.Vector2(x, y);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([ref.current!]);
    if (intersects.length > 0) {
      setPoint(intersects[0].point);
    }
  });

  return (
    <>
      <color attach="background" args={['#202020']} />
      <fog attach="fog" args={['#202020', 5, 20]} />
      <ambientLight intensity={0.015} />
      <Environment background={false} files={night} blur={0.1} />
      <Spotlight
        point={point}
        position={new THREE.Vector3(2, 5, -2)}
        color="#0c8cbf"
      />
      <Spotlight
        point={point}
        position={new THREE.Vector3(-1, 5, 4)}
        color="#b00c3f"
      />
      <mesh ref={ref} receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </>
  );
};

const Sphere = ({ position = new THREE.Vector3(0, 5, 0) }: SphereProps) => {
  const { roughness } = useControls('sphere', {
    roughness: { value: 0, min: 0, max: 1, step: 0.01 }
  });

  const ref = useRef<THREE.Mesh>(new THREE.Mesh());

  const randomColor = useMemo(
    () => `hsl(${Math.random() * 360}, 90%, 75%)`,
    []
  );

  return (
    <mesh ref={ref} castShadow position={position}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial
        color={randomColor}
        roughness={roughness}
        metalness={1}
      />
      <Sparkles count={50} scale={0.7} size={1} speed={0.3} />
    </mesh>
  );
};

const LuminaSphere = () => {
  const { spheresNumber } = useControls({
    spheresNumber: { value: 4, min: 1, max: 14, step: 1 }
  });

  const spheres: SphereProps[] = [];

  while (spheres.length < spheresNumber) {
    const newPosition = new THREE.Vector3(
      Math.random() * 6 - 3,
      0.5,
      Math.random() * 4 - 2
    );

    const overlapping = spheres.some(sphere => {
      if (!sphere.position) return false;
      const distance = newPosition.distanceTo(sphere.position);
      return distance < 1.0; // 1.0 is the sum of the two spheres radius
    });

    if (!overlapping) {
      spheres.push({ position: newPosition });
    }
  }

  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback={<Loader title="LuminaSphere" />}>
        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={2}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.1}
        />
        <PerspectiveCamera
          makeDefault
          position={[-4, 5, 6]}
          fov={50}
          near={1}
          far={20}
        />

        <Scene />

        {spheres.map((sphere, index) => (
          <Sphere key={index} position={sphere.position} />
        ))}
      </Suspense>
    </Canvas>
  );
};

export { LuminaSphere };
