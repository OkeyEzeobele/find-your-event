import EventCard from './EventCard';

export default function EventList({ events, query }) {
  if (!events.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-slate-600">
        No events found!
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {events.map((e) => (
        <EventCard key={e.id} event={e} query={query} />
      ))}
    </ul>
  );
}
