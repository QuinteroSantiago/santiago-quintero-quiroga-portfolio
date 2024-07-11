import React from 'react';
import blogPosts from '../data/blog';

function Blog() {

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
            <div className=" text-zinc-900 dark:text-zinc-300 min-h-screen font-inter">
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
