/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Footer } from '../../components';

const GamePage = () => {
  useEffect(() => {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
  }, []);
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
        <div className="bg-white rounded-lg w-full mx-auto">
          <canvas
            id="game-canvas"
            className="aspect-video rounded-t-lg w-full"
            width={1920}
            height={1080}
          />
          <div className="p-4">
            <p className="font-semibold text-xl mb-3">Controls</p>
            <ul className="list-disc px-4">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export { GamePage };
