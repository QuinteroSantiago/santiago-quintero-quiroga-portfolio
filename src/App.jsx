import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home'
import Blog from './pages/Blog';
import NotFound from './pages/404'
import Workout from './pages/Workout';

function App() {
    return (
        <BrowserRouter>
            <div className="font-inter min-h-screen w-full m-0 p-0 text-zinc-900 dark:text-zinc-300 dark:bg-zinc-900">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
