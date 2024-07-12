import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home'
import Blog from './pages/Blog';
import NotFound from './pages/404'

function App() {
    return (
        <BrowserRouter>
            <div className='dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300'>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
