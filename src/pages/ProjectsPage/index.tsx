import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Footer, ProjectCard } from '../../components';
import AirplaneImage from '../../assets/images/airplane.png';
import LuminaSphereImage from '../../assets/images/luminasphere.png';
import WindmillImage from '../../assets/images/windmill.jpg';
import ClownImage from '../../assets/images/clown.png';

const ProjectsPage = () => {
  return (
    <div className="bg-raisin">
      <Container className="p-8 bg-raisin min-h-[88vh]">
        <div className="mb-8 text-4xl font-sans font-semibold text-white text-center">
          <p className="hidden md:block">Computer Graphics Projects</p>
          <p className="block md:hidden">CG Projects</p>
        </div>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} sm={6} md={4}>
            <ProjectCard
              image={AirplaneImage}
              projectName="SkyRings"
              description="SkyRings is my final project, a 3D aviation game crafted using the computer graphics concepts learned throughout the semester."
              projectPath="/skyrings"
              projectTags={['Hard', '3D', 'Final Project']}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ProjectCard
              image={LuminaSphereImage}
              projectName="LuminaSphere"
              description="LuminaSphere is a dynamically evolving project delving into the creative interplay of lights in computer graphics."
              projectPath="/luminasphere"
              projectTags={['Medium', '3D', 'Experiment']}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ProjectCard
              image={WindmillImage}
              projectName="Windmill"
              description="Experience dynamic rotations within a canvas using keyboard and mouse commands."
              projectPath="/windmill"
              projectTags={['Easy', '2D', 'Experiment']}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ProjectCard
              image={ClownImage}
              projectName="Clown"
              description="3D clown model with dynamic movements and animations."
              projectPath="/clown"
              projectTags={['Easy', '3D', 'Experiment']}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export { ProjectsPage };
