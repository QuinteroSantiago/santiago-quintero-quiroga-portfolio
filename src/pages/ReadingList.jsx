import React, { useState, useEffect } from 'react';
import books from '../data/books';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Table from '../components/util/Table';

function ReadingList() {
    useDocumentTitle("Reading List - Santiago Quintero");

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedCategory, setSelectedCategory] = useState('Suggestions');

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filteredBooks = books[selectedCategory] || [];
    const tableData = filteredBooks.map(({ category, ...bookWithoutCategory }) => bookWithoutCategory);

    const categories = Object.keys(books);
    const columns = ["Title", "Topic", "Score"];

    const renderCategorySelector = () => {
        if (windowWidth < 1000) { // For smaller screens
            return (
                <select
                    className="px-4 py-2 rounded bg-gray-200 text-black"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            );
        } else { // For larger screens
            return (
                <div className="flex justify-center space-x-2 mb-4 relative z-50">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded ${category === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="text-gray-800 dark:text-gray-200 font-sans">
            <div className="max-w-5xl w-full mx-auto">
                <div className="text-center py-12">
                    <h1 className="text-5xl font-light mb-6">Reading List</h1>
                    {renderCategorySelector()}
                    <div className="mt-8">
                        <Table columns={columns} data={tableData} />
                    </div>
                    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredBooks.length} books in "{selectedCategory}" category.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReadingList;
