import work from '../data/work';
import education from '../data/education';
import portfolio from '../data/portfolio';
import books from '../data/books';

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Data paths are inconsistent (some omit the leading slash); normalize to an
// absolute path so logos resolve from any deep route (e.g. /projects/x).
export function normalizeAssetPath(url) {
  if (!url) return null;
  return url.startsWith('/') ? url : `/${url}`;
}

const experienceItems = [...work, ...education].map((entry) => ({
  slug: slugify(entry.place),
  title: entry.place,
  subtitle: `${entry.title} · ${entry.year}`,
  image: normalizeAssetPath(entry.imgUrl),
  type: 'experience',
  data: entry,
}));

const projectItems = portfolio.map((project) => ({
  slug: slugify(project.title),
  title: project.title,
  subtitle: project.stack?.join(' · ') ?? '',
  image: normalizeAssetPath(project.imgUrl),
  type: 'project',
  data: project,
}));

const readingItems = Object.keys(books).map((categoryKey) => ({
  slug: slugify(categoryKey),
  title: categoryKey,
  subtitle: `${books[categoryKey]?.length ?? 0} books`,
  type: 'reading',
  data: categoryKey,
}));

export const CATEGORIES = [
  {
    slug: 'profile',
    label: 'Profile',
    icon: 'avatar',
    items: [
      { slug: 'about', title: 'About', subtitle: 'Who I am', type: 'profile', data: null },
    ],
  },
  {
    slug: 'experience',
    label: 'Experience',
    icon: 'pearls',
    items: experienceItems,
  },
  {
    slug: 'projects',
    label: 'Projects',
    icon: 'hardhat',
    items: projectItems,
  },
  {
    slug: 'reading',
    label: 'Reading',
    icon: 'book',
    items: readingItems,
  },
  {
    slug: 'fitness',
    label: 'Fitness',
    icon: 'barbell',
    items: [
      { slug: 'workout', title: 'Workout', subtitle: 'Weekly training plan', type: 'fitness-workout', data: null },
      { slug: 'diet', title: 'Diet', subtitle: 'Nutrition plan', type: 'fitness-diet', data: null },
    ],
  },
  {
    slug: 'contact',
    label: 'Contact',
    icon: '✉',
    items: [
      { slug: 'get-in-touch', title: 'Get in touch', subtitle: 'Links & email', type: 'contact', data: null },
    ],
  },
];

export function getCategoryIndexBySlug(slug) {
  return CATEGORIES.findIndex((category) => category.slug === slug);
}

export function findItemIndexBySlug(categoryIndex, itemSlug) {
  const category = CATEGORIES[categoryIndex];
  if (!category) return -1;
  return category.items.findIndex((item) => item.slug === itemSlug);
}
