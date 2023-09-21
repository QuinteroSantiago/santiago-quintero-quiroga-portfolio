import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home/>} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
