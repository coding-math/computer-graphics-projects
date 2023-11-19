import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { Footer, LuminaSphere } from '../../components';

const LuminaSpherePage = () => {
  useEffect(() => {
    document.title = 'LuminaSphere | Computer Graphics';
  });

  return (
    <div className="bg-raisin">
      <Container className="p-8 bg-raisin  min-h-[88vh]">
        <Breadcrumbs aria-label="breadcrumb" color="white">
          <Link underline="hover" color="inherit" href="/">
            Projects
          </Link>
          <p className="font-semibold text-white">LuminaSphere</p>
        </Breadcrumbs>
        <div className="mb-8 text-4xl font-sans font-semibold text-white text-center mt-4 md:mt-0">
          LuminaSphere
        </div>
        <div className="relative bg-white rounded-b-lg w-full xl:w-4/5 mx-auto">
          <div
            id="game-canvas"
            className="aspect-square lg:aspect-video w-full"
          >
            <LuminaSphere />
          </div>
          <div className="p-4">
            <p className="font-semibold text-xl mb-3">Controls</p>
            <ul className="list-disc px-4">
              <li>
                On the computer, the spotlight will follow the mouse cursor. Use
                the left mouse button to rotate the scene, and scroll to control
                zoom.
              </li>
              <li>
                On mobile, simply tap to direct the spotlight and rotate by
                touching and holding the screen.
              </li>
              <li>
                On any device, there is a GUI that allows you to modify scene
                characteristics, such as the number of spheres and spotlight
                properties.
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export { LuminaSpherePage };
