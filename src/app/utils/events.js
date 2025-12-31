export function normalizeQuery(q) {
  return (q ?? '').trim().toLowerCase();
}

export function sortBySoonestDate(list) {
  return [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function filterEvents(list, query) {
  const q = normalizeQuery(query);
  if (!q) return list;

  return list.filter((e) => {
    const name = (e.name ?? '').toLowerCase();
    const location = (e.location ?? '').toLowerCase();
    return name.includes(q) || location.includes(q);
  });
}

export function splitForHighlight(text, query) {
  const q = normalizeQuery(query);
  const s = String(text ?? '');
  if (!q) return [{ text: s, match: false }];

  const lower = s.toLowerCase();
  const parts = [];
  let i = 0;

  while (i < s.length) {
    const idx = lower.indexOf(q, i);
    if (idx === -1) {
      parts.push({ text: s.slice(i), match: false });
      break;
    }
    if (idx > i) parts.push({ text: s.slice(i, idx), match: false });
    parts.push({ text: s.slice(idx, idx + q.length), match: true });
    i = idx + q.length;
  }

  return parts.length ? parts : [{ text: s, match: false }];
}
