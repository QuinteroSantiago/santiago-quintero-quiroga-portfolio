import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Workout from './pages/Workout';
import Diet from './pages/Diet';
import ReadingList from './pages/ReadingList';
import NotFound from './pages/404';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workout" element={<Workout />} />
      <Route path="/diet" element={<Diet />} />
      <Route path="/reading-list" element={<ReadingList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
