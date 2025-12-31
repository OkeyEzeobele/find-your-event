import EventsClient from './EventsClient';

export default function Page() {
  return (
    <div className="h-full bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-10">
        <header className="shrink-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Find Your Event
          </h1>
          <p className="mt-2 text-slate-600">
            Browse upcoming events and search instantly.
          </p>
        </header>

        <main className="mt-6 flex-1 min-h-0">
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <EventsClient />
          </div>
        </main>
      </div>
    </div>
  );
}
