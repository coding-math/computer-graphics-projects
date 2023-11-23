import { Html, useProgress } from '@react-three/drei';

interface LoaderProps {
  title: string;
}

const Loader = ({ title }: LoaderProps) => {
  const { progress } = useProgress();

  return (
    <Html fullscreen className="bg-black flex justify-center items-center">
      <div className="w-1/2 absolute flex flex-col justify-center items-center bg-black cursor-wait gap-16">
        <div className="text-xl text-white">{title}</div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-white text-lg">
            Loading {progress.toFixed()}%
          </div>
        </div>
      </div>
    </Html>
  );
};

export { Loader };
