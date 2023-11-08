import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Footer, ProjectCard } from '../../components';
import clownImage from '../../assets/images/clown.png';
import windmillImage from '../../assets/images/windmill.jpg';

const ProjectsPage = () => {
  return (
    <div className="bg-raisin">
      <Container className="p-8 bg-raisin min-h-[88vh]">
        <div className="mb-8 text-4xl font-sans font-semibold text-white text-center">
          CG Projects
        </div>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} sm={5} md={4}>
            <ProjectCard
              image={windmillImage}
              projectName="Windmill"
              description="In this interactive project, you can experience dynamic rotations within a canvas using keyboard and mouse commands."
              projectPath="/windmill"
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <ProjectCard
              image={clownImage}
              projectName="Clown"
              description="dsdas"
              projectPath="/clown"
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export { ProjectsPage };
