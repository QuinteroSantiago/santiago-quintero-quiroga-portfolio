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

            groups[topic].push({ ...book, score, notes: truncatedNotes });
        });

        Object.keys(groups).forEach((topic) => {
            groups[topic].sort((a, b) =>
                sortOrder === 'asc' ? a.score - b.score : b.score - a.score
            );
        });

        return groups;
    }, [selectedCategory, sortOrder]);

    return (
        <div className="mx-auto max-w-6xl">
            <header className="py-10">
                <p className="eyebrow mb-2">Books, papers, and mental models</p>
                <h1 className="mb-6 text-3xl font-semibold text-[var(--text)]">Reading List</h1>

                <div className="flex flex-wrap items-center gap-4">
                    <ResponsiveSelector
                        label="Reading category"
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        mobileLabel="Select a reading category"
                    />

                    <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
                        Sort:
                        <select
                            className="rounded border border-[var(--border)] bg-[var(--surface-strong)] px-2 py-1 text-sm text-[var(--text)]"
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                        >
                            <option value="desc">Highest rated</option>
                            <option value="asc">Lowest rated</option>
                        </select>
                    </label>
                </div>
            </header>

            <main className="grid gap-6">
                {Object.entries(topicGroups).length === 0 ? (
                    <p className="text-sm text-[var(--muted)]">No books found in this category.</p>
                ) : (
                    Object.entries(topicGroups).map(([topic, booksInTopic]) => (
                        <section key={topic}>
                            <h2 className="mb-3 text-sm font-medium text-[var(--text)]">
                                {topic}
                                <span className="ml-2 text-[var(--muted)]">({booksInTopic.length})</span>
                            </h2>
                            <Table columns={COLUMNS} data={booksInTopic} caption={`${topic} books`} />
                        </section>
                    ))
                )}
            </main>

            <p className="mt-8 text-xs text-[var(--muted)]">
                {books[selectedCategory]?.length || 0} books · {Object.keys(topicGroups).length} topics
            </p>
        </div>
    );
}

export default ReadingList;
