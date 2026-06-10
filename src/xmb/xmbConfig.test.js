import { describe, it, expect } from 'vitest';
import {
  CATEGORIES,
  slugify,
  normalizeAssetPath,
  getCategoryIndexBySlug,
  findItemIndexBySlug,
} from './xmbConfig';
import work from '../data/work';
import education from '../data/education';
import portfolio from '../data/portfolio';

describe('slugify', () => {
  it('kebab-cases and strips punctuation', () => {
    expect(slugify('Chargeback Heaven')).toBe('chargeback-heaven');
    expect(slugify('Silicon Valley Bank')).toBe('silicon-valley-bank');
    expect(slugify("JPMorgan Chase!")).toBe('jpmorgan-chase');
  });
});

describe('CATEGORIES', () => {
  it('has the six categories in order', () => {
    expect(CATEGORIES.map((c) => c.slug)).toEqual([
      'profile', 'experience', 'projects', 'reading', 'fitness', 'contact',
    ]);
  });

  it('every category has at least one item with a unique slug and a type', () => {
    for (const category of CATEGORIES) {
      expect(category.items.length).toBeGreaterThan(0);
      const slugs = category.items.map((i) => i.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const item of category.items) {
        expect(item.type).toBeTruthy();
        expect(item.title).toBeTruthy();
      }
    }
  });

  it('experience merges every work and education entry', () => {
    const experience = CATEGORIES.find((c) => c.slug === 'experience');
    expect(experience.items.length).toBe(work.length + education.length);
  });

  it('projects includes every active portfolio entry', () => {
    const projects = CATEGORIES.find((c) => c.slug === 'projects');
    expect(projects.items.length).toBe(portfolio.length);
  });

  it('experience and project items carry an absolute image path', () => {
    for (const slug of ['experience', 'projects']) {
      const category = CATEGORIES.find((c) => c.slug === slug);
      for (const item of category.items) {
        if (item.image) expect(item.image.startsWith('/')).toBe(true);
      }
    }
  });
});

describe('normalizeAssetPath', () => {
  it('adds a leading slash only when missing', () => {
    expect(normalizeAssetPath('assets/x.png')).toBe('/assets/x.png');
    expect(normalizeAssetPath('/assets/x.png')).toBe('/assets/x.png');
    expect(normalizeAssetPath(null)).toBe(null);
  });
});

describe('lookup helpers', () => {
  it('resolves category index by slug, -1 when missing', () => {
    expect(getCategoryIndexBySlug('projects')).toBe(2);
    expect(getCategoryIndexBySlug('nope')).toBe(-1);
  });

  it('resolves item index within a category, -1 when missing', () => {
    const idx = getCategoryIndexBySlug('experience');
    expect(findItemIndexBySlug(idx, 'corellium')).toBe(0);
    expect(findItemIndexBySlug(idx, 'nope')).toBe(-1);
  });
});
