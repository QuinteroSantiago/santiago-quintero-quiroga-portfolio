import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ProjectDescription from './pages/ProjectDescription'

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home/>} />
					<Route path="/test" element={<ProjectDescription />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
