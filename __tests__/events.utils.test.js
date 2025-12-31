import {
  filterEvents,
  sortBySoonestDate,
  splitForHighlight
} from '../src/app/utils/events';

describe('filterEvents', () => {
  const sample = [
    { id: '1', name: 'React Night', date: '2026-01-02', location: 'Manchester' },
    { id: '2', name: 'Fintech Breakfast', date: '2026-01-03', location: 'London' },
    { id: '3', name: 'Design Meetup', date: '2026-01-04', location: 'Dublin' }
  ];

  it('filters by name OR location (case-insensitive) and returns all when query is empty', () => {
    expect(filterEvents(sample, '')).toHaveLength(3);

    const byName = filterEvents(sample, 'react');
    expect(byName.map((e) => e.id)).toEqual(['1']);

    const byLocation = filterEvents(sample, 'lOnDoN');
    expect(byLocation.map((e) => e.id)).toEqual(['2']);

    const none = filterEvents(sample, 'zurich');
    expect(none).toEqual([]);
  });
});

describe('sortBySoonestDate', () => {
  it('sorts events by date ascending (soonest first)', () => {
    const sample = [
      { id: 'a', name: 'Later', date: '2026-03-10', location: 'Birmingham' },
      { id: 'b', name: 'Soonest', date: '2026-01-05', location: 'Leeds' },
      { id: 'c', name: 'Middle', date: '2026-01-12', location: 'Manchester' }
    ];

    const result = sortBySoonestDate(sample);
    expect(result.map((e) => e.id)).toEqual(['b', 'c', 'a']);
  });
});

describe('splitForHighlight', () => {
  it('splits text into match/non-match parts (case-insensitive) and preserves original text', () => {
    const text = 'Manchester, UK';
    const parts = splitForHighlight(text, 'man');

    expect(parts.map((p) => p.text).join('')).toBe(text);
    expect(parts.some((p) => p.match && p.text.toLowerCase() === 'man')).toBe(true);
  });

  it('highlights multiple occurrences', () => {
    const text = 'Man man MAN';
    const parts = splitForHighlight(text, 'man');

    const matches = parts.filter((p) => p.match).map((p) => p.text.toLowerCase());
    expect(matches).toEqual(['man', 'man', 'man']);
  });

  it('does not crash on special characters in the query (e.g. C++)', () => {
    expect(() => splitForHighlight('C++ Meetup', 'c++')).not.toThrow();

    const parts = splitForHighlight('C++ Meetup', 'c++');
    expect(parts.map((p) => p.text).join('')).toBe('C++ Meetup');
    expect(parts.some((p) => p.match && p.text.toLowerCase() === 'c++')).toBe(true);
  });
});
