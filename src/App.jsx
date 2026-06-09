import XmbShell from './xmb/XmbShell';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<XmbShell />} />
      <Route path="/:categorySlug" element={<XmbShell />} />
      <Route path="/:categorySlug/:itemSlug" element={<XmbShell />} />
    </Routes>
  );
}

export default App;
