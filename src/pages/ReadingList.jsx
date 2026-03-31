import React, { useState, useEffect, useMemo } from 'react';
import books from '../data/books';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Table from '../components/util/Table';

// Helper: Custom hook to handle window resizing
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
}

function ReadingList() {
    useDocumentTitle("Reading List - Santiago Quintero");
    
    const windowWidth = useWindowWidth();
    const [selectedCategory, setSelectedCategory] = useState('Current');
    const [sortOrder, setSortOrder] = useState('desc');

    const categories = useMemo(() => Object.keys(books), []);
    const COLUMNS = ["Title", "Score", "Notes"];

    // Centralized logic for data transformation
    const topicGroups = useMemo(() => {
        const rawBooks = books[selectedCategory] || [];
        const groups = {};

        rawBooks.forEach((book) => {
            // Normalize keys early
            const score = book.score ?? book.Score ?? 0;
            const topic = book.topic ?? book.Topic ?? 'Misc';
            const truncatedNotes = (book.notes || '').split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');

            if (!groups[topic]) groups[topic] = [];
            
            groups[topic].push({
                ...book,
                score, // Overwrite with normalized key
                notes: truncatedNotes
            });
        });

        // Sort each group
        Object.keys(groups).forEach(topic => {
            groups[topic].sort((a, b) => 
                sortOrder === 'asc' ? a.score - b.score : b.score - a.score
            );
        });

        return groups;
    }, [selectedCategory, sortOrder]);

    return (
        <div className="text-gray-800 dark:text-gray-200 font-sans max-w-5xl mx-auto px-4">
            <header className="text-center py-12">
                <h1 className="text-5xl font-light mb-6">Reading List</h1>

                {/* Simplified Category Selector: Mobile vs Desktop via CSS or simple ternary */}
                <div className="flex justify-center mb-4 relative z-50">
                    {windowWidth < 1000 ? (
                        <select
                            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded transition-colors ${
                                        category === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sort Selector */}
                <div className="mt-4 flex justify-center items-center gap-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Sort by rating:</span>
                    <select
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="desc">Highest rated</option>
                        <option value="asc">Lowest rated</option>
                    </select>
                </div>
            </header>

            <main className="mt-8 grid gap-8">
                {Object.entries(topicGroups).length === 0 ? (
                    <p className="text-center text-gray-500">No books found in this category.</p>
                ) : (
                    Object.entries(topicGroups).map(([topic, booksInTopic]) => (
                        <section key={topic} className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm">
                            <h2 className="text-2xl font-semibold mb-4 border-b dark:border-gray-700 pb-2">
                                {topic} ({booksInTopic.length})
                            </h2>
                            <Table columns={COLUMNS} data={booksInTopic} />
                        </section>
                    ))
                )}
            </main>

            <footer className="mt-12 mb-8 text-center text-sm text-gray-500">
                Showing {books[selectedCategory]?.length || 0} books in "{selectedCategory}" 
                across {Object.keys(topicGroups).length} topics.
            </footer>
        </div>
    );
}

export default ReadingList;