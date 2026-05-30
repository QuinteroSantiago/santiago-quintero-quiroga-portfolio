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
		<div className="mx-auto max-w-4xl">
			<Intro />
			<Timeline title="Work" timeline={work} />
			<Timeline title="Education" timeline={education} />
			<Portfolio />
			<Contact />
		</div>
	);
}

export default Home;
