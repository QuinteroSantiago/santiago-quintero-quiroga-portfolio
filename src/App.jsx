import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'; 

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="blog" element={<Blog />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
