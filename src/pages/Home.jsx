import React, { useEffect, useState } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import Timeline from '../components/Timeline';
import work from '../data/work';
import education from '../data/education';

function Home() {
	return (
		<>
			<div className="min-h-screen font-inter">
				<div className="max-w-5xl w-11/12 mx-auto">
					<Intro />
					<Timeline title="Work" timeline={work}/>
					<Timeline title="Education" timeline={education}/>
					<Portfolio />
					<Contact />
				</div>
			</div>
		</>
	)
}

export default Home
