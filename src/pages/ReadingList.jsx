import { useMemo, useState } from 'react';
import ResponsiveSelector from '../components/shared/ResponsiveSelector';
import Table from '../components/util/Table';
import books from '../data/books';
import useDocumentTitle from '../hooks/useDocumentTitle';

const COLUMNS = [
    { key: 'title', header: 'Title' },
    { key: 'score', header: 'Score' },
    { key: 'notes', header: 'Notes' },
];

function ReadingList() {
    useDocumentTitle('Reading List - Santiago Quintero');

    const [selectedCategory, setSelectedCategory] = useState('Current');
    const [sortOrder, setSortOrder] = useState('desc');

    const categories = useMemo(() => Object.keys(books), []);
    const categoryOptions = useMemo(
        () => categories.map((category) => ({ value: category, label: category })),
        [categories]
    );

    const topicGroups = useMemo(() => {
        const rawBooks = books[selectedCategory] || [];
        const groups = {};

        rawBooks.forEach((book) => {
            const score = book.score ?? book.Score ?? 0;
            const topic = book.topic ?? book.Topic ?? 'Misc';
            const truncatedNotes = (book.notes || '').split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');

            if (!groups[topic]) {
                groups[topic] = [];
            }

            groups[topic].push({
                ...book,
                score,
                notes: truncatedNotes,
            });
        });

        Object.keys(groups).forEach((topic) => {
            groups[topic].sort((a, b) =>
                sortOrder === 'asc' ? a.score - b.score : b.score - a.score
            );
        });

        return groups;
    }, [selectedCategory, sortOrder]);

    return (
        <div className="mx-auto max-w-6xl px-4 font-sans text-gray-800 dark:text-gray-200">
            <header className="py-12 text-center">
                <p className="eyebrow mb-3">Books, papers, and mental models</p>
                <h1 className="mb-6 text-5xl font-light">Reading List</h1>

                <ResponsiveSelector
                    label="Reading category"
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    mobileLabel="Select a reading category"
                    className="relative z-50 mb-4"
                />

                <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                    <label htmlFor="reading-sort-order" className="text-gray-600 dark:text-gray-400">
                        Sort by rating:
                    </label>
                    <select
                        id="reading-sort-order"
                        className="rounded bg-gray-200 px-3 py-1 dark:bg-gray-700"
                        value={sortOrder}
                        onChange={(event) => setSortOrder(event.target.value)}
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
                        <section key={topic} className="section-frame rounded-[1.75rem] p-6 sm:p-8">
                            <h2 className="mb-4 border-b pb-2 text-2xl font-semibold dark:border-gray-700">
                                {topic} ({booksInTopic.length})
                            </h2>
                            <Table columns={COLUMNS} data={booksInTopic} caption={`${topic} books`} />
                        </section>
                    ))
                )}
            </main>

            <footer className="mb-8 mt-12 text-center text-sm text-gray-500">
                Showing {books[selectedCategory]?.length || 0} books in &quot;{selectedCategory}&quot;
                {' '}across {Object.keys(topicGroups).length} topics.
            </footer>
        </div>
    );
}

export default ReadingList;
