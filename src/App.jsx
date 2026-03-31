import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';

const Workout = lazy(() => import('./pages/Workout'));
const ReadingList = lazy(() => import('./pages/ReadingList'));
const Diet = lazy(() => import('./pages/Diet'));
const NotFound = lazy(() => import('./pages/404'));

function App() {
    return (
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12 text-[var(--muted)]">Loading...</div>}>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="/reading" element={<ReadingList />} />
                    <Route path="/diet" element={<Diet />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
