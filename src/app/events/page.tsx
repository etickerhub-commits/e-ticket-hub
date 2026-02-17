import { EventCard } from "@/components/event-card";
import { mockEvents } from "@/data/mock-events";

type Props = {
  searchParams: Promise<{ q?: string; category?: string; city?: string }>;
};

export default async function EventsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = (params.q ?? "").toLowerCase();
  const category = params.category ?? "";
  const city = params.city ?? "";

  const filtered = mockEvents.filter((event) => {
    const matchQ =
      q.length === 0 ||
      [event.title, event.category, event.city, event.date].some((field) =>
        field.toLowerCase().includes(q),
      );
    const matchCategory = category.length === 0 || event.category === category;
    const matchCity = city.length === 0 || event.city.toLowerCase() === city.toLowerCase();
    return matchQ && matchCategory && matchCity;
  });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-black">Browse Events</h1>
      <form className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 sm:grid-cols-4">
        <input name="q" defaultValue={params.q} placeholder="Search" className="rounded border border-zinc-300 px-3 py-2" />
        <select name="category" defaultValue={category} className="rounded border border-zinc-300 px-3 py-2">
          <option value="">All categories</option>
          <option value="Concerts">Concerts</option>
          <option value="Theater">Theater</option>
          <option value="Sports">Sports</option>
        </select>
        <input name="city" defaultValue={city} placeholder="City" className="rounded border border-zinc-300 px-3 py-2" />
        <button className="rounded bg-zinc-900 px-4 py-2 font-semibold text-white">Apply filters</button>
      </form>

      {filtered.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-zinc-600">No events match your search.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

