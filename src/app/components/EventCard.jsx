import { splitForHighlight } from '../utils/events';

function HighlightText({ text, query }) {
  const q = (query ?? '').trim();

  if (q.length < 2) return <>{text}</>;

  const parts = splitForHighlight(text, q);

  return (
    <>
      {parts.map((p, idx) =>
        p.match ? (
          <mark key={idx} className="rounded bg-amber-200/70 px-0.5 text-slate-900">
            {p.text}
          </mark>
        ) : (
          <span key={idx}>{p.text}</span>
        )
      )}
    </>
  );
}


export default function EventCard({ event, query }) {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date(event.date));

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="font-semibold text-slate-900">
        <HighlightText text={event.name} query={query} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">
          {formatted}
        </span>
        <span className="opacity-70">•</span>
        <span>
          <HighlightText text={event.location} query={query} />
        </span>
      </div>
    </li>
  );
}
