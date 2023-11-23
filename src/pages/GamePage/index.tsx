import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Suspense, useEffect } from 'react';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, HueSaturation } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import {
  Airplane,
  Footer,
  Landscape,
  Loader,
  MotionBlur,
  Rings,
  SphereEnv
} from '../../components';
import { Score } from '../../components/UI';
import hdrTexture from '../../assets/textures/envmap.hdr';

const GamePage = () => {
  useEffect(() => {
    document.title = 'SkyRings | Computer Graphics';
  });

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
        <div className="relative bg-white rounded-b-lg w-full xl:w-4/5 mx-auto">
          <div id="game-canvas" className="aspect-video w-full">
            <Canvas>
              <Suspense fallback={<Loader title="SkyRings" />}>
                <SphereEnv />
                <Environment background={false} files={hdrTexture} />

                <Rings />
                <Landscape />
                <Airplane />
                <Score />

                <directionalLight
                  castShadow
                  color="#f3d29a"
                  intensity={0.8}
                  position={[10, 0, 7]}
                  shadow-bias={-0.0005}
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                  shadow-camera-near={0.01}
                  shadow-camera-far={20}
                  shadow-camera-top={6}
                  shadow-camera-bottom={-6}
                  shadow-camera-left={-6}
                  shadow-camera-right={6}
                />

                <EffectComposer>
                  <MotionBlur />
                  <HueSaturation
                    blendFunction={BlendFunction.NORMAL}
                    hue={0.15}
                    saturation={0.15}
                  />
                </EffectComposer>
              </Suspense>
            </Canvas>
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
