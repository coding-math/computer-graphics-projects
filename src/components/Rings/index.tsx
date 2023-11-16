import { useFrame } from '@react-three/fiber';
import React, { useMemo, useState } from 'react';
import { BufferGeometry, Quaternion, TorusGeometry, Vector3 } from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { planePosition } from '../Airplane';
import { updateScore } from '../UI/Score';
import scoreAudio from '../../assets/sounds/score.mp3';

const randomPoint = (scale?: Vector3): Vector3 => {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 1.5 + 0.6,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
};

const score = new Audio(scoreAudio);
const NUM_RINGS = 25;
const RING_RADIUS = 0.2;

interface Ring {
  center: Vector3;
  direction: Vector3;
  hit: boolean;
}

const handleHit = (ring: Ring) => {
  ring.hit = true;
  score.currentTime = 0;
  score.play();
  updateScore();
};

const Rings: React.FC = () => {
  const [rings, setRings] = useState<Ring[]>(() => {
    const arr: Ring[] = [];

    for (let i = 0; i < NUM_RINGS; i++) {
      arr.push({
        center: randomPoint(new Vector3(4, 2, 4)).add(
          new Vector3(0, 2 * Math.random() * 2, 0)
        ),
        direction: randomPoint().normalize(),
        hit: false
      });
    }

    return arr;
  });

  const geometry = useMemo<BufferGeometry>(() => {
    let geo: BufferGeometry | null;

    rings.forEach(ring => {
      const torusGeo = new TorusGeometry(RING_RADIUS, 0.02, 16, 50);
      torusGeo
        .applyQuaternion(
          new Quaternion().setFromUnitVectors(
            new Vector3(0, 0, 1),
            ring.direction
          )
        )
        .translate(ring.center.x, ring.center.y, ring.center.z);

      if (!geo) {
        geo = torusGeo;
      } else {
        geo = mergeBufferGeometries([geo, torusGeo]);
      }
    });

    return geo!;
  }, [rings]);

  useFrame(() => {
    rings.forEach(ring => {
      const v = planePosition.clone().sub(ring.center);
      const dist = ring.direction.dot(v);
      const projected = planePosition
        .clone()
        .sub(ring.direction.clone().multiplyScalar(dist));

      const hitDist = projected.distanceTo(ring.center);
      if (hitDist < RING_RADIUS && Math.abs(dist) < 0.3) {
        handleHit(ring);
      }
    });

    const atLeastOneHit = rings.find(ring => ring.hit);
    if (atLeastOneHit) {
      setRings(rings.filter(ring => !ring.hit));
    }
  });

  return (
    <>
      {geometry && (
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="gold"
            roughness={0.5}
            metalness={0.5}
            envMapIntensity={0.8}
          />
        </mesh>
      )}
    </>
  );
};

export { Rings, NUM_RINGS };
