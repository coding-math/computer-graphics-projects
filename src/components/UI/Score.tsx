import { useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { NUM_RINGS } from '../Rings';
import { resetPlaneAxis } from '../Airplane';

let ringsCount = 0;

const updateScore = () => {
  ringsCount += 1;
  if (ringsCount === NUM_RINGS) {
    resetPlaneAxis();
  }
};

const Score = () => {
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  useFrame(() => {
    setScore(ringsCount);
    if (ringsCount === NUM_RINGS) {
      setFinished(true);
    }
  });
  return (
    <group>
      {finished ? (
        <Text position-y={0.75} anchorX="center" color="#ff3080">
          Congratulations!!!
        </Text>
      ) : (
        <Text position-y={0.75} anchorX="center" color="#ff3080">
          {score}/{NUM_RINGS}
        </Text>
      )}
    </group>
  );
};

export { Score, updateScore };
