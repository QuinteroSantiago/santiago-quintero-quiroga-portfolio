import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import NotFound from './pages/404';
import Workout from './pages/Workout';
import ReadingList from './pages/ReadingList';
import CopyComponent from './pages/CopyComponent';
import Diet from './pages/Diet';

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/reading" element={<ReadingList />} />
                <Route path="/copy" element={<CopyComponent />} />
                <Route path="/diet" element={<Diet />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
