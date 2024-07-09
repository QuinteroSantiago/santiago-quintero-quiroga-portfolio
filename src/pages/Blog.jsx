import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Blog() {
    const blogPosts = [
        { 
            id: 1, 
            title: 'A New Beginning',
            date: '23:40, Monday, 07-08-2024',
            content: `This will be my first blog post, just want to post my thoughts here.\n\n
            It's late at night, need to rest for the day, but I decided to start this blog as a place to share my thoughts and reflections. I would like to journal daily, we will see how that goes.\n\n
            I feel a sense of anticipation for tomorrow. Blah blah blah blah, at least this isn't AI generated :)\n\n\
            I will leave you with a poem I wrote a bit ago:
            >>poem
            Da Grey Beneath
            Blue black infinity,\n
            Shadows in your trenches,\n
            humanity's greatest fear,\n
            a trove of friendship
            Chub Cay, BS (06.22.24)<<`
        },
    ];
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}, []);

	const handleThemeSwitch = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

    const homeIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            strokeWidth={1.5}
			stroke="currentColor"
            className="w-6 h-6"
        >
            <path fill="#231F20" d="M62.79,29.172l-28-28C34.009,0.391,32.985,0,31.962,0s-2.047,0.391-2.828,1.172l-28,28
                c-1.562,1.566-1.484,4.016,0.078,5.578c1.566,1.57,3.855,1.801,5.422,0.234L8,33.617V60c0,2.211,1.789,4,4,4h16V48h8v16h16
                c2.211,0,4-1.789,4-4V33.695l1.195,1.195c1.562,1.562,3.949,1.422,5.516-0.141C64.274,33.188,64.356,30.734,62.79,29.172z"/>
        </svg>
    );

    const sortedPosts = blogPosts.slice().sort((a, b) => b.id - a.id);

    const renderFormattedText = (text) => {
        const poemRegex = />>poem([\s\S]*?)<</;  // Regex to extract poem content
        const elements = [];
        let lastIndex = 0;

        text.replace(poemRegex, (match, poemContent, offset) => {
            // Add preceding text as normal paragraphs, applying text justification
            if (offset > lastIndex) {
                elements.push(...processParagraphs(text.substring(lastIndex, offset), true));
            }
            // Add the poem with centered formatting
            elements.push(renderPoem(poemContent.trim(), match));
            lastIndex = offset + match.length;
        });

        // Add remaining text if any, with text justification
        if (lastIndex < text.length) {
            elements.push(...processParagraphs(text.substring(lastIndex), true));
        }

        return elements;
    };

    const processParagraphs = (paragraphText, justify = false) => {
        return paragraphText.split('\n').map((line, idx) => (
            <p key={idx} className={`mb-4 ${justify ? 'text-justify' : ''}`}>{line}</p>
        ));
    };

    const renderPoem = (poemContent) => {
        const lines = poemContent.split('\n');
        const title = lines[0];
        const poemLines = lines.slice(1);

        return (
            <div key="poem" className="my-6">
                <p className="text-xl font-bold mb-2 text-center">{title}</p>
                {poemLines.map((line, index) => {
                    // Check if the current line is the last line
                    const isLastLine = index === poemLines.length - 1;
                    return (
                        <p key={index} className={`text-sm text-center ${isLastLine ? 'font-bold' : 'italic'}`}>{line}</p>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <div className="fixed top-4 z-10 flex justify-between w-full px-20">
                <Link to="/" className="p-2 bg bg-black text-white dark:bg-yellow-500 dark:text-black text-lg rounded-md">{homeIcon}</Link>
                <button
                    type="button"
                    onClick={handleThemeSwitch}
                    className="p-2 bg-black dark:bg-yellow-500 text-lg rounded-md"
                >
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 min-h-screen font-inter">
                <div className="max-w-5xl w-11/12 mx-auto">
                    <div className="text-center py-12">
                        <h1 className="text-5xl font-bold mb-6">Posts</h1>
                        <div className="space-y-6">
                            {sortedPosts.map(post => (
                                <div key={post.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                                    <h2 className="text-3xl font-semibold mb-2 text-justify">{post.title}</h2>
                                    <p className="text-sm text-gray-500 mb-4 text-justify">{post.date}</p>
                                    {renderFormattedText(post.content)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
