/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Footer } from '../../components';
import ClownModel from '../../assets/models/clown.gltf';

const ClownPage = () => {
  useEffect(() => {
    let hatDirection = 1;
    const cameraPosition = { x: 0, y: 0 };
    let isHatAnimated = false;
    let isClownRotating = false;

    const keyMap: Record<string, string> = {
      a: 'moveCameraLeft',
      s: 'moveCameraDown',
      w: 'moveCameraUp',
      d: 'moveCameraRight',
      h: 'animateHat',
      r: 'rotateClown'
    };

    function handleKeyPress(key: string): void {
      switch (key) {
        case 'moveCameraRight':
          cameraPosition.x += cameraPosition.x < 2 ? 0.1 : 0;
          break;
        case 'moveCameraLeft':
          cameraPosition.x -= cameraPosition.x > -2 ? 0.1 : 0;
          break;
        case 'moveCameraUp':
          cameraPosition.y += cameraPosition.y < 2 ? 0.1 : 0;
          break;
        case 'moveCameraDown':
          cameraPosition.y -= cameraPosition.y > -2 ? 0.1 : 0;
          break;
        case 'animateHat':
          isHatAnimated = !isHatAnimated;
          break;
        case 'rotateClown':
          isClownRotating = !isClownRotating;
          break;
        default:
          break;
      }
    }

    function handleHatAnimation(
      hat: THREE.Object3D<THREE.Object3DEventMap>,
      hatInitialY: number
    ) {
      if (hat.position.y < 3 && hatDirection === 1) {
        hat.translateY(0.01);
        hat.rotateY(0.02);
      } else if (hat.position.y > hatInitialY && hatDirection === -1) {
        hat.translateY(-0.01);
        hat.rotateY(-0.01);
      } else {
        hatDirection *= -1;
      }
    }

    function init() {
      const canvas = document.getElementById('clown-canvas');
      if (!canvas) {
        return;
      }
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      const loader = new GLTFLoader();
      loader.load(ClownModel, gltf => {
        const object = gltf.scene;

        object.position.set(0, 0, 0);
        scene.add(object);
        const hat = object.getObjectByName('Hat');
        if (!hat) {
          return;
        }
        const hatInitialY = hat.position.y;

        const animate = () => {
          requestAnimationFrame(animate);

          if (isClownRotating) {
            object.rotation.y += 0.01;
          }

          if (isHatAnimated) {
            handleHatAnimation(hat, hatInitialY);
          } else {
            hat.position.y = hatInitialY;
          }

          camera.position.x = cameraPosition.x;
          camera.position.y = cameraPosition.y;
          renderer.render(scene, camera);
        };
        animate();
      });
    }

    init();

    document.addEventListener('keydown', event => {
      const { key } = event;
      if (keyMap[key]) {
        handleKeyPress(keyMap[key]);
      }
    });
  }, []);
  return (
    <div className="bg-raisin">
      <Container className="p-8 bg-raisin  min-h-[88vh]">
        <Breadcrumbs aria-label="breadcrumb" color="white">
          <Link underline="hover" color="inherit" href="/">
            Projects
          </Link>
          <p className="font-semibold text-white">Clown</p>
        </Breadcrumbs>
        <div className="mb-8 text-4xl font-sans font-semibold text-white text-center mt-4 md:mt-0">
          Clown
        </div>
        <div className="bg-white rounded-lg w-full md:w-3/5 lg:w-1/2 mx-auto">
          <canvas
            id="clown-canvas"
            className="aspect-square rounded-t-lg w-full"
            width={1000}
            height={1000}
          />
          <div className="p-4">
            <p className="font-semibold text-xl mb-3">Controls</p>
            <ul className="list-disc px-4">
              <li>Use the W and S keys to move the camera up and down</li>
              <li>Use the A and D keys to move the camera left and right</li>
              <li>Press the H key to enable or disable the hat animation</li>
              <li>Press the R key to enable or disable the clown rotation</li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export { ClownPage };
