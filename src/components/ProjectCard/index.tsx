import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RxCode } from 'react-icons/rx';
import { FaEye } from 'react-icons/fa';

interface ProjectCardProps {
  image: string;
  projectName: string;
  description: string;
  projectPath: string;
  codePath: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  projectName,
  description,
  projectPath,
  codePath
}) => {
  const redirectToCode = () => {
    window.location.href = codePath;
  };

  const redirectToProject = () => {
    window.location.href = projectPath;
  };

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia component="img" alt={projectName} height="140" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={redirectToProject}>
          View Project <FaEye className="ml-1 text-xl" />
        </Button>
        <Button size="small" onClick={redirectToCode}>
          View Code <RxCode className="ml-1 text-xl" />
        </Button>
      </CardActions>
    </Card>
  );
};

export { ProjectCard };
