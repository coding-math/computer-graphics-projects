import { TbBrandThreejs } from 'react-icons/tb';
import { FaGithub, FaReact } from 'react-icons/fa';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <footer className="w-full bg-white py-2 text-raisin font-semibold min-h-[12vh]">
      <p className="text-center font-mono my-2">
        Projects created for the computer graphics course at UNIFESP
      </p>
      <hr className="hidden md:flex justify-center w-2/5 my-2 border-gray-700 sm:mx-auto" />
      <div className="flex justify-center items-center">
        <div className="font-mono whitespace-nowrap hidden sm:inline-block">
          Created with React <FaReact className="inline-block animate-spin" />,
          Three.js <TbBrandThreejs className="inline-block" /> and{' '}
          <div className="inline-block">❤️</div> by{' '}
          <Link
            href="https://www.github.com/math-silva"
            aria-label="Link to math-silva's GitHub profile"
            underline="hover"
            color="inherit"
            target="_blank"
          >
            math-silva
          </Link>{' '}
          <a
            href="https://www.github.com/math-silva"
            aria-label="Link to math-silva's GitHub profile"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="inline-block" />
          </a>
        </div>
        <div className="font-mono whitespace-nowrap inline-block sm:hidden">
          by{' '}
          <Link
            href="https://www.github.com/math-silva"
            aria-label="Link to math-silva's GitHub profile"
            underline="hover"
            color="inherit"
            target="_blank"
          >
            math-silva
          </Link>{' '}
          <a
            href="https://www.github.com/math-silva"
            aria-label="Link to math-silva's GitHub profile"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="inline-block" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
