import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, HueSaturation } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import {
  Airplane,
  Footer,
  Landscape,
  MotionBlur,
  Rings,
  SphereEnv
} from '../../components';
import hdrTexture from '../../assets/textures/envmap.hdr';

const GamePage = () => {
  return (
    <div className="bg-raisin">
      <Container className="p-8 bg-raisin  min-h-[88vh]">
        <Breadcrumbs aria-label="breadcrumb" color="white">
          <Link underline="hover" color="inherit" href="/">
            Projects
          </Link>
          <p className="font-semibold text-white">SkyRings</p>
        </Breadcrumbs>
        <div className="mb-8 text-4xl font-sans font-semibold text-white text-center mt-4 md:mt-0">
          SkyRings
        </div>
        <div className="relative bg-white rounded-lg w-full mx-auto">
          <div id="game-canvas" className="aspect-video rounded-t-lg w-full">
            <Canvas>
              <SphereEnv />
              <Environment background={false} files={hdrTexture} />

              <PerspectiveCamera makeDefault position={[0, 10, 10]} />

              <Landscape />
              <Airplane />
              <Rings />

              <directionalLight
                castShadow
                color="#f3d29a"
                intensity={0.3}
                position={[10, 5, 4]}
                shadow-bias={-0.0005}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.01}
                shadow-camera-far={20}
                shadow-camera-top={6}
                shadow-camera-bottom={-6}
                shadow-camera-left={-6.2}
                shadow-camera-right={6.4}
              />

              <EffectComposer>
                <MotionBlur />
                <HueSaturation
                  blendFunction={BlendFunction.NORMAL}
                  hue={0.15}
                  saturation={0.15}
                />
              </EffectComposer>
            </Canvas>
          </div>
          <div
            id="progress-bar-container"
            className="hidden absolute left-0 top-0 w-full aspect-video rounded-t-lg flex-col justify-center items-center bg-black cursor-wait"
          >
            <div className="text-white text-lg">Loading...</div>
            <progress
              id="progress-bar"
              className="w-2/5 h-2 mt-2"
              value="0"
              max="100"
            />
          </div>
          <div className="p-4">
            <p className="font-semibold text-xl mb-3">Controls</p>
            <ul className="list-disc px-4">
              <li className="mb-3">
                <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> Move the
                plane
              </li>
              <li className="mb-3">
                <kbd>Shift</kbd> Activates turbo
              </li>
              <li className="mb-3">
                <kbd>R</kbd> Resets the plane&apos;s position
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export { GamePage };
