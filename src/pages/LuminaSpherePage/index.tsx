import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Footer, LuminaSphere } from '../../components';

const LuminaSpherePage = () => {
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
              <li>teste</li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export { LuminaSpherePage };
