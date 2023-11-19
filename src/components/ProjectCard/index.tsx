import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ProjectCardProps {
  image: string;
  projectName: string;
  description: string;
  projectPath: string;
  projectTags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  projectName,
  description,
  projectPath,
  projectTags
}) => {
  return (
    <>
      <a
        href={projectPath}
        aria-label={`Link to ${projectName} project page, description: ${description}`}
        className="no-underline"
      >
        <Card className="flex flex-col cursor-pointer group hover:bg-gray-200">
          <CardMedia
            component="img"
            alt={projectName}
            height="140"
            image={image}
          />
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
