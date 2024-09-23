import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
	const location = useLocation();
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
	const buttonRef = useRef(null);
	const [buttonPosition, setButtonPosition] = useState({ x: 80, y: 112 });

	useEffect(() => {
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme) {
			setTheme(currentTheme);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
		document.documentElement.className = theme;
	}, []);

	useEffect(() => {
		localStorage.setItem('theme', theme);
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setButtonPosition({ x: 16, y: 98 });
			} else {
				setButtonPosition({ x: 80, y: 112 });
			}
		};

		handleResize(); // Set initial position on component mount
		window.addEventListener('resize', handleResize); // Update position on resize
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleThemeSwitch = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	useEffect(() => {
		const handleMouseMove = (event) => {
			if (buttonRef.current) {
				const buttonRect = buttonRef.current.getBoundingClientRect();
				const centerX = buttonRect.left + buttonRect.width / 2;
				const centerY = buttonRect.top + buttonRect.height / 2;
				const dx = centerX - event.clientX;
				const dy = centerY - event.clientY;

				const distance = Math.sqrt(dx * dx + dy * dy);
				const minDistance = 30;
				if (distance < minDistance) {
					let newX = buttonPosition.x + dx;
					let newY = buttonPosition.y + dy;

					newX = Math.max(0, Math.min(newX, window.innerWidth - buttonRect.width));
					newY = Math.max(0, Math.min(newY, window.innerHeight - buttonRect.height));

					setButtonPosition({ x: newX, y: newY });
				}
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [buttonPosition]);

	const sun = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
			/>
		</svg>
	);

	const moon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="white"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
			/>
		</svg>
	);

	const blogIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			fill="currentColor"
			className="w-6 h-6"
		>
			<g>
				<g>
					<g>
						<path d="M93.238,220.968h172.463c4.466,0,8.084-3.619,8.084-8.084s-3.618-8.084-8.084-8.084H93.238
							c-4.466,0-8.084,3.619-8.084,8.084S88.772,220.968,93.238,220.968z"/>
						<path d="M93.238,177.853h97.01c4.466,0,8.084-3.619,8.084-8.084s-3.618-8.084-8.084-8.084h-97.01
							c-4.466,0-8.084,3.619-8.084,8.084S88.772,177.853,93.238,177.853z"/>
						<path d="M114.796,398.282h280.253c16.344,0,29.642-13.298,29.642-29.642v-91.082c0-5.206-1.371-10.333-3.968-14.822
							c-2.233-3.865-7.179-5.189-11.044-2.953c-3.866,2.233-5.188,7.179-2.953,11.044c1.176,2.034,1.797,4.362,1.797,6.732v91.082
							c0,7.43-6.044,13.474-13.474,13.474H114.796c-7.43,0-13.474-6.044-13.474-13.474v-91.082c0-7.43,6.044-13.474,13.474-13.474
							h150.905c4.466,0,8.084-3.619,8.084-8.084c0-4.466-3.618-8.084-8.084-8.084H114.796c-16.344,0-29.642,13.298-29.642,29.642
							v91.082C85.154,384.984,98.452,398.282,114.796,398.282z"/>
						<path d="M477.068,412.237c1.684-5.067,2.596-10.484,2.596-16.11V158.989c0-28.231-22.969-51.2-51.2-51.2h-45.81V29.642
							C382.653,13.298,369.355,0,353.01,0h-21.558c-16.344,0-29.642,13.298-29.642,29.642v78.147H83.537
							c-28.231,0-51.2,22.969-51.2,51.2v237.137c0,5.627,0.912,11.043,2.596,16.11C14.43,419.065,0,438.368,0,460.8
							C0,489.031,22.969,512,51.2,512h409.6c28.231,0,51.2-22.969,51.2-51.2C512,438.368,497.57,419.065,477.068,412.237z
							M317.979,29.642c0-7.43,6.044-13.474,13.474-13.474h21.558c7.43,0,13.474,6.044,13.474,13.474v13.474h-48.505V29.642z
							M366.484,59.284v188.632h-16.168V59.284H366.484z M317.979,59.284h16.168v188.632h-16.168V59.284z M317.979,264.084h48.505
							v20.66c0,0.579-0.192,1.153-0.539,1.617l-21.558,28.743c-0.704,0.938-1.652,1.078-2.156,1.078c-0.503,0-1.452-0.14-2.156-1.078
							l-21.557-28.741c-0.348-0.466-0.54-1.04-0.54-1.619V264.084z M48.505,158.989c0-19.317,15.715-35.032,35.032-35.032h218.274
							v37.726h-57.667c-4.466,0-8.084,3.619-8.084,8.084s3.618,8.084,8.084,8.084h57.667v106.892c0,4.053,1.339,8.071,3.773,11.318
							l21.558,28.743c3.596,4.796,9.096,7.545,15.091,7.545c5.994,0,11.495-2.75,15.091-7.545l21.559-28.745
							c2.433-3.244,3.772-7.263,3.772-11.316v-63.776h33.954c4.466,0,8.084-3.619,8.084-8.084s-3.619-8.084-8.084-8.084h-33.954
							v-26.947h33.954c4.466,0,8.084-3.619,8.084-8.084s-3.619-8.084-8.084-8.084h-33.954v-37.726h45.81
							c19.317,0,35.032,15.715,35.032,35.032v237.137c0,19.317-15.715,35.032-35.032,35.032H83.537
							c-19.317,0-35.032-15.715-35.032-35.032V158.989z M460.8,495.832H51.2c-19.317,0-35.032-15.715-35.032-35.032
							c0-16.257,11.071-30.113,26.426-33.963c9.349,12.434,24.222,20.49,40.943,20.49h344.926c16.72,0,31.594-8.056,40.943-20.49
							c15.355,3.85,26.426,17.707,26.426,33.963C495.832,480.117,480.117,495.832,460.8,495.832z"/>
						<path d="M235.52,463.495h-1.078c-4.466,0-8.084,3.618-8.084,8.084c0,4.466,3.618,8.084,8.084,8.084h1.078
							c4.466,0,8.084-3.618,8.084-8.084C243.604,467.113,239.986,463.495,235.52,463.495z"/>
						<path d="M433.853,463.495H272.168c-4.466,0-8.084,3.618-8.084,8.084c0,4.466,3.618,8.084,8.084,8.084h161.684
							c4.466,0,8.084-3.618,8.084-8.084C441.937,467.113,438.318,463.495,433.853,463.495z"/>
						<path d="M202.105,463.495h-1.078c-4.466,0-8.084,3.618-8.084,8.084c0,4.466,3.618,8.084,8.084,8.084h1.078
							c4.466,0,8.084-3.618,8.084-8.084C210.189,467.113,206.571,463.495,202.105,463.495z"/>
						<path d="M164.379,463.495H78.147c-4.466,0-8.084,3.618-8.084,8.084c0,4.466,3.618,8.084,8.084,8.084h86.232
							c4.466,0,8.084-3.618,8.084-8.084C172.463,467.113,168.845,463.495,164.379,463.495z"/>
					</g>
				</g>
			</g>
		</svg>
	);
	const homeIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" />
		</svg>
	);

	const workoutIcon = (
		<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
			<path d="M6 7.5H7.5V11.25V12.75V16.5H6V7.5ZM9 12.75V18H4.5V16.5H1.5V7.5H4.5V6H9V11.25L15 11.25V6H19.5V7.5L22.5 7.5V16.5H19.5V18H15V12.75L9 12.75ZM16.5 12.75L16.5 16.5H18L18 7.5L16.5 7.5L16.5 11.25V12.75ZM4.5 9H3V15H4.5V9ZM19.5 15H21V9H19.5V15Z" fill="#080341" />
		</svg>
	);

	const questionMark = (
		<svg className="w-6 h-6" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
			<path d="M142 125.853C155.049 97.8883 180.62 82.7645 200.381 78.4757C227.189 72.6575 249.859 84.0511 257.624 112.528C260.302 122.352 259.217 138.128 253.081 148.517C247.426 158.092 239.904 165.942 227.555 176.481C225.251 178.447 217.389 185.018 216.649 185.643C199.849 199.818 191.567 209.152 186.81 220.972C182.053 232.792 182.305 269.489 216.649 266.35" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M198.744 315.68C198.744 317.274 198.744 319.614 198.744 322.7" stroke="currentColor" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);

	return (
		<div className="fixed top-4 z-10 flex justify-between items-start w-full px-4 sm:px-20">
			<div className="flex flex-col items-start space-y-4 sm:space-y-4">
				{location.pathname !== '/' && (
					<Link to="/" aria-label="Go to Homepage" className="p-1 sm:p-2 bg-black text-white dark:bg-yellow-500 dark:text-black text-lg rounded-md">{homeIcon}</Link>
				)}
				{location.pathname !== '/blog' && (
					<Link to="/blog" aria-label="Go to Santiago Quintero's blog" className="p-1 sm:p-2 bg-black text-white dark:bg-yellow-500 dark:text-black text-lg rounded-md">{blogIcon}</Link>
				)}
				{location.pathname !== '/workout' && (
					<Link to="/workout" aria-label="Go to Workout Page" className="p-1 sm:p-2 bg-black text-white dark:bg-yellow-500 dark:text-black text-lg rounded-md">{workoutIcon}</Link>
				)}
				<Link to="/404" >
					<button
						aria-label="Mystery button, chase it if you can"
						ref={buttonRef}
						className="p-1 sm:p-2 bg-black text-white dark:bg-yellow-500 dark:text-black text-lg rounded-md"
						style={{
							position: 'absolute',
							left: `${buttonPosition.x}px`,
							top: `${buttonPosition.y}px`,
							zIndex: 2,
							cursor: 'pointer',
							transition: 'left 1s, top 1s'
						}}
					>
						{questionMark}
					</button>
				</Link>
			</div>
			<button
				aria-label="Switch theme button"
				type="button"
				onClick={handleThemeSwitch}
				className="p-1 sm:p-2 bg-black dark:bg-yellow-500 text-lg rounded-md dark:text-black"
			>
				{theme === 'dark' ? sun : moon}
			</button>
		</div>
	);
}

export default Navigation;