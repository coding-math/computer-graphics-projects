import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Footer, ProjectCard } from '../../components';
import ClownImage from '../../assets/images/clown.png';
import WindmillImage from '../../assets/images/windmill.jpg';
import AirplaneImage from '../../assets/images/airplane.png';

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
              image={WindmillImage}
              projectName="Windmill"
              description="Experience dynamic rotations within a canvas using keyboard and mouse commands."
              projectPath="/windmill"
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <ProjectCard
              image={ClownImage}
              projectName="Clown"
              description="3D clown model with dynamic movements and animations."
              projectPath="/clown"
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <ProjectCard
              image={AirplaneImage}
              projectName="SkyRings"
              description="SkyRings is my final project, a 3D aviation game crafted using the computer graphics concepts learned throughout the semester."
              projectPath="/skyrings"
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export { ProjectsPage };
