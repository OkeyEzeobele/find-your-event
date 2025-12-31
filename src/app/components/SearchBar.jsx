export default function SearchBar({ value, onChange }) {
  return (
    <div className="grid gap-2">
      <label htmlFor="search" className="text-sm text-slate-700">
        Search by name or location
      </label>

      <input
        id="search"
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Manchester, React, Dublin..."
        autoComplete="off"
      />
    </div>
  );
}
