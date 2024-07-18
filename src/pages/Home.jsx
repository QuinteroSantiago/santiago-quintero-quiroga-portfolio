import React, { useEffect, useState } from 'react';
import Contact from '../components/Home/Contact';
import Intro from '../components/Home/Intro';
import Portfolio from '../components/Home/Portfolio';
import Timeline from '../components/Home/Timeline';
import work from '../data/work';
import education from '../data/education';
import useDocumentTitle from '../hooks/useDocumentTitle';

function Home() {
	useDocumentTitle("Home - Santiago Quintero");
	return (
		<>
			<div className="min-h-screen font-inter">
				<div className="max-w-5xl w-11/12 mx-auto">
					<Intro />
					<Timeline title="Work" timeline={work} />
					<Timeline title="Education" timeline={education} />
					<Portfolio />
					<Contact />
				</div>
			</div>
		</>
	)
}

export default Home
