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
    <Card>
      <CardMedia component="img" alt={projectName} height="140" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projectName}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <div className="flex justify-evenly w-full">
          <Button size="small" variant="outlined" onClick={redirectToProject}>
            View Project <FaEye className="ml-1 text-xl" />
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export { ProjectCard };
