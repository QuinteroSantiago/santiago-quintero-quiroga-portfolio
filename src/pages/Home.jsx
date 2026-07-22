import Contact from '../components/Home/Contact';
import Intro from '../components/Home/Intro';
import Nav from '../components/Home/Nav';
import Portfolio from '../components/Home/Portfolio';
import Timeline from '../components/Home/Timeline';
import work from '../data/work';
import education from '../data/education';
import useDocumentTitle from '../hooks/useDocumentTitle';

function Home() {
	useDocumentTitle("Home - Santiago Quintero");

	return (
		<div className="mx-auto max-w-4xl">
			<Nav />
			<Intro />
			<Timeline id="work" title="Work" timeline={work} />
			<Timeline title="Education" timeline={education} />
			<Portfolio id="projects" />
			<Contact id="contact" />
		</div>
	);
}

export default Home;
