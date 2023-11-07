import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Footer, ProjectCard } from '../../components';
import clownImage from '../../assets/images/clown.png';
import windmillImage from '../../assets/images/windmill.jpg';

const ProjectsPage = () => {
  return (
    <>
      <Container className="p-8">
        <div className="mb-8 text-4xl font-sans font-semibold text-gray-800 text-center">
          Computer Graphics - Projects
        </div>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} sm={5} md={4}>
            <ProjectCard
              image={windmillImage}
              projectName="Windmill"
              description="dsdas"
              projectPath="/windmill"
              codePath="#"
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <ProjectCard
              image={clownImage}
              projectName="Clown"
              description="dsdas"
              projectPath="/clown"
              codePath="#"
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export { ProjectsPage };
