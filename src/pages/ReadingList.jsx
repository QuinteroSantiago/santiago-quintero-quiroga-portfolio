import React, { useState, useEffect, useMemo } from 'react';
import books from '../data/books';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Table from '../components/util/Table';

function ReadingList() {
    useDocumentTitle("Reading List - Santiago Quintero");

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedCategory, setSelectedCategory] = useState('Current');
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = highest score first

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const categories = Object.keys(books);

    const getScore = (book) => {
        if (typeof book.score === 'number') return book.score;
        if (typeof book.Score === 'number') return book.Score;
        return 0;
    };

    const truncateNotes = (text, maxSentences = 2) => {
        if (!text) return '';
        const parts = text.split(/(?<=[.!?])\s+/);
        return parts.slice(0, maxSentences).join(' ');
    };

    const filteredBooks = books[selectedCategory] || [];

    const topicGroups = useMemo(() => {
        const groups = {};
        filteredBooks.forEach((b) => {
            const topic = b.topic || b.Topic || 'Misc';
            if (!groups[topic]) groups[topic] = [];
            groups[topic].push(b);
        });

        const result = {};
        Object.keys(groups).forEach((topic) => {
            const sorted = [...groups[topic]].sort((a, b) => {
                const scoreA = getScore(a);
                const scoreB = getScore(b);

                if (sortOrder === 'asc') {
                    return scoreA - scoreB;
                } else {
                    return scoreB - scoreA;
                }
            });

            result[topic] = sorted.map(({ category, notes, topic: _t, ...rest }) => ({
                ...rest,
                topic: _t,
                notes: truncateNotes(notes),
            }));
        });

        return result;
    }, [filteredBooks, sortOrder]);

    const columns = ["Title", "Score", "Notes"]; 

    const renderCategorySelector = () => {
        if (windowWidth < 1000) {
            return (
                <select
                    className="px-4 py-2 rounded bg-gray-200 text-black"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            );
        } else {
            return (
                <div className="flex flex-wrap justify-center gap-2 mb-4 relative z-50">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded ${
                                category === selectedCategory
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            );
        }
    };

    const renderSortSelector = () => (
        <div className="mt-4 flex justify-center">
            <label className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                    Sort by rating:
                </span>
                <select
                    className="px-3 py-1 rounded bg-gray-200 text-black text-sm"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">Highest rated</option>
                    <option value="asc">Lowest rated</option>
                </select>
            </label>
        </div>
    );

    return (
        <div className="text-gray-800 dark:text-gray-200 font-sans">
            <div className="max-w-5xl w-full mx-auto">
                <div className="text-center py-12">
                    <h1 className="text-5xl font-light mb-6">Reading List</h1>

                    {renderCategorySelector()}
                    {renderSortSelector()}

                    <div className="mt-8 grid gap-8">
                        {Object.keys(topicGroups).length === 0 ? (
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">No books found in this category.</p>
                        ) : (
                            Object.keys(topicGroups).map((topic) => (
                                <div key={topic} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                                    <h2 className="text-2xl font-semibold mb-2">{topic} ({(topicGroups[topic] || []).length})</h2>
                                    <Table columns={columns} data={topicGroups[topic]} />
                                </div>
                            ))
                        )}
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredBooks.length} books in "{selectedCategory}" across {Object.keys(topicGroups).length} topics.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReadingList;
