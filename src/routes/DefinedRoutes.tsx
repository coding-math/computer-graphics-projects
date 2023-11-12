import { Route, Routes } from 'react-router-dom';
import { ClownPage, GamePage, ProjectsPage, WindmillPage } from '../pages';

const DefinedRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/windmill" element={<WindmillPage />} />
        <Route path="/clown" element={<ClownPage />} />
        <Route path="/skyrings" element={<GamePage />} />
      </Route>
    </Routes>
  );
};

export { DefinedRoutes };
