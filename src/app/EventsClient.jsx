'use client';

import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import { filterEvents, sortBySoonestDate } from './utils/events';
import { getEvents } from '../lib/api/events';

export default function EventsClient() {
  const [query, setQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('loading');
  const [sortEnabled, setSortEnabled] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const data = await getEvents();
        if (!alive) return;
        setEvents(data);
        setStatus('ready');
      } catch (e) {
        if (!alive) return;
        setStatus('error');
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const visibleEvents = useMemo(() => {
    const filtered = filterEvents(events, query);
    return sortEnabled ? sortBySoonestDate(filtered) : filtered;
  }, [events, query, sortEnabled]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <SearchBar value={query} onChange={setQuery} />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSortEnabled((v) => !v)}
          aria-pressed={sortEnabled}
          className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900 cursor-pointer"
        >
          {sortEnabled ? 'Click to show original order' : 'Click to sort by date (earliest first)'}
        </button>

        {status === 'ready' ? (
          <div className="text-sm text-slate-600">{visibleEvents.length} {visibleEvents.length<2?'result':'results'}</div>
        ) : null}
      </div>

      {status === 'loading' && (
        <div
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
          role="status"
        >
          Loading events…
        </div>
      )}

      {status === 'error' && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
          role="alert"
        >
          Couldn’t load events. Please try again.
        </div>
      )}

      {status === 'ready' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <EventList events={visibleEvents} query={query} />
        </div>
      )}
    </div>
  );
}
