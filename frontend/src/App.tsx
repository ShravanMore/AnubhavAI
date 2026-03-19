import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import DiscoverArtifact from './pages/DiscoverArtifact';
import ARExperience from './pages/ARExperience';
import ClimateImpact from './pages/ClimateImpact';
import CulturalMapping from './pages/CulturalMapping';
import Restoration from './pages/Restoration';
import Community from './pages/Community';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/discover-artifacts" element={<DiscoverArtifact />} />
        <Route path="/ar-experience" element={<ARExperience />} />
        <Route path="/climate-impact" element={<ClimateImpact />} />
        <Route path="/restoration" element={<Restoration />} />
        <Route path="/cultural-mapping" element={<CulturalMapping />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </>
  );
}

export default App;



