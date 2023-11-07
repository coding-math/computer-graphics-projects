import { TbBrandThreejs } from 'react-icons/tb';
import { FaGithub, FaReact } from 'react-icons/fa';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-4">
      <p className="text-center font-mono my-2">
        Projects created for the computer graphics course at UNIFESP
      </p>
      <hr className="hidden md:flex justify-center w-2/5 my-4 border-gray-700 sm:mx-auto" />
      <div className="flex justify-center items-center">
        <div className="font-mono whitespace-nowrap">
          Created with React <FaReact className="inline-block" />, Three.js{' '}
          <TbBrandThreejs className="inline-block" /> and{' '}
          <div className="inline-block">❤️</div> by{' '}
          <Link
            href="https://www.github.com/matheuxito"
            underline="hover"
            color="inherit"
          >
            Matheuxito
          </Link>{' '}
          <FaGithub className="inline-block" />
        </div>
      </div>
    </footer>
  );
};

export { Footer };
