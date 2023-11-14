/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei';
import { BackSide } from 'three';
import texture from '../../assets/textures/envmap.jpg';

const SphereEnv = () => {
  const map = useTexture(texture) as THREE.Texture;

  return (
    <mesh>
      <sphereGeometry args={[60, 50, 50]} />
      <meshBasicMaterial side={BackSide} map={map} />
    </mesh>
  );
};

export { SphereEnv };
