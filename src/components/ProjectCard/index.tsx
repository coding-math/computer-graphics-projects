import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ProjectCardProps {
  imageUrl: string;
  projectName: string;
  description: string;
  projectPath: string;
  projectTags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  projectName,
  description,
  projectPath,
  projectTags
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setIsLoading(false);
    image.src = imageUrl;
  }, [imageUrl]);

  return (
    <>
      <a
        href={projectPath}
        aria-label={`Link to ${projectName} project page, description: ${description}`}
        className="no-underline"
      >
        <Card className="flex flex-col cursor-pointer group hover:bg-gray-200">
          {!isLoading ? (
            <CardMedia
              component="img"
              alt={projectName}
              height="140"
              image={imageUrl}
            />
          ) : (
            <div className="animate-pulse flex items-center justify-center aspect-square bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
          )}
          <CardContent className="flex-grow md:min-h-[130px]">
            <Typography gutterBottom variant="h5" component="div">
              {projectName}
            </Typography>
            <Typography
              variant="body2"
              className="min-h-[60px] max-h-[60px] overflow-y-auto"
            >
              {description}
            </Typography>
          </CardContent>
          {projectTags && (
            <div className="mx-auto my-2 flex justify-evenly items-center gap-2">
              {projectTags.map((tag, index) => (
                <span
                  key={index}
                  className={`${
                    tag === 'Easy'
                      ? 'bg-green-300 group-hover:bg-green-400'
                      : tag === 'Medium'
                      ? 'bg-yellow-300 group-hover:bg-yellow-400'
                      : tag === 'Hard'
                      ? 'bg-red-300 group-hover:bg-red-400'
                      : 'bg-gray-300 group-hover:bg-gray-400'
                  } rounded-full px-3 py-1 text-sm font-semibold`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      </a>
    </>
  );
};

export { ProjectCard };
