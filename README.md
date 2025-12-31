# Find Your Event

A small Next.js app that fetches a list of upcoming events and lets you search them instantly by **name** or **location**.

This was built as a take-home exercise to demonstrate:
- React fundamentals (state, controlled inputs, derived UI with `useMemo`)
- logic (filtering + optional sorting)
- UX (clear loading/error/empty states)
- testing (a unit test verifying filtering)

---

## Features

### Events list (from API)
- Fetches events from a Postman Mock Server endpoint.
- Each event has: `id`, `name`, `date`, `location`.

### Search
- Filters by **name OR location** as the user types.
- Case-insensitive.
- Matching text is highlighted (only once the search term is **2+ characters**).

### Empty state
- Shows **“No events found!”** when no results match.

### Sort toggle
- Default view is **unsorted** (original API order).
- A text button toggles sorting by **date ascending (soonest first)**.
- Toggle again to return to original order.

### Scrolling
- Only the **event list** scrolls (header + search stay in place).

---

## Tech used

- **Next.js (App Router)** — React framework and routing
- **React** — functional components + built-in hooks (`useState`, `useEffect`, `useMemo`)
- **Tailwind CSS v4** — lightweight styling without custom CSS files
- **Jest** — unit testing for filtering logic
- **Postman Mock Server** — external mock API for the `/events` endpoint

---

## API

The app expects:

- GET `/events`

Response shape:

- `{ "success": true, "data": [ ...events ] }`

Example event object:

- `{ "id": "1", "name": "Manchester Tech Meetup", "date": "2026-01-12", "location": "Manchester, UK" }`

---

## Project structure (high level)

- `src/app/page.jsx`
  - Page shell/layout

- `src/app/EventsClient.jsx`
  - Fetches events
  - Manages state (query, loading/error, sort toggle)
  - Filters + optionally sorts
  - Passes results to the list

- `src/app/components/`
  - `SearchBar` (controlled input)
  - `EventList` (empty state + list)
  - `EventCard` (event display + highlighting)

- `src/app/utils/events.js`
  - pure utilities: `filterEvents`, `sortBySoonestDate`, highlight helpers

- `src/lib/api/`
  - `client.js` (shared request wrapper + base URL handling)
  - `events.js` (domain wrapper: `getEvents()`)

- `__tests__/events.utils.test.js`
  - Jest test verifying filtering behaviour

---

## How to run it

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm (comes with Node)

Check versions:

    node -v
    npm -v

### Install dependencies

From the project root:

    npm install

---

## Environment configuration

Create `.env.local` in the project root and set the API base URL:

    NEXT_PUBLIC_API_BASE_URL=https://0499455a-7e06-475e-b0fa-abb734fae339.mock.pstmn.io


---

## Run the app

### Development

    npm run dev

Open:

- http://localhost:3000

### Production (optional)

    npm run build
    npm start

---

## Run tests

    npm test

### What the tests cover

The unit tests verify core UI logic in `src/app/utils/events.js`:

- **`filterEvents()`**
  - empty query returns all events
  - matches by name
  - matches by location (case-insensitive)
  - non-matching query returns an empty array

- **`sortBySoonestDate()`**
  - sorts events by date ascending (soonest first)

- **`splitForHighlight()`**
  - splits text into match/non-match parts (case-insensitive)
  - highlights multiple occurrences
  - safely handles special characters in the query (e.g. `C++`)


