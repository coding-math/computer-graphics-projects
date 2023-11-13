import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaEye } from 'react-icons/fa';

interface ProjectCardProps {
  image: string;
  projectName: string;
  description: string;
  projectPath: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  projectName,
  description,
  projectPath
}) => {
  const redirectToProject = () => {
    window.location.href = projectPath;
  };

  return (
    <Card className="flex flex-col min-h-[300px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[560px]">
      <CardMedia component="img" alt={projectName} height="140" image={image} />
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h5" component="div">
          {projectName}
        </Typography>
        <Typography
          variant="body2"
          className="lg:max-h-[60px] lg:overflow-y-auto"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <div className="flex justify-center w-full">
          <Button size="small" variant="outlined" onClick={redirectToProject}>
            View Project <FaEye className="ml-1 text-xl" />
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export { ProjectCard };
