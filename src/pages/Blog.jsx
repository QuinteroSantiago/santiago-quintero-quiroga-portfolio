import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blog';

function Blog() {
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
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" />
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

    const countWords = (text) => {
        return text.split(/\s+/).filter(Boolean).length;
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
                        <h1 className="text-5xl font-bold mb-6">Valar Morghulis</h1>
                        <div className="space-y-6">
                            {sortedPosts.map(post => (
                                <div key={post.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative">
                                    <h2 className="text-3xl font-semibold mb-2 text-justify">{post.title}</h2>
                                    <p className="text-sm text-gray-500 mb-4 text-justify">{post.date}</p>
                                    {renderFormattedText(post.content)}
                                    <span className="text-xs text-gray-400 absolute bottom-2 right-2">
                                        wc: {countWords(post.content)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <h1 className="text-5xl font-bold mb-6 pt-12">Valar Dohaeris</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
