import Link from "next/link";
import { mockEvents } from "@/data/mock-events";
import { EventCard } from "@/components/event-card";

const categories = ["Concerts", "Theater", "Sports"];

export default function Home() {
  const featured = mockEvents.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8">
      <section className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Find your next event</p>
        <h1 className="mt-2 text-4xl font-black leading-tight">Tickets in minutes, no confusion.</h1>
        <p className="mt-3 max-w-2xl text-zinc-200">Search by event, category, city, or date and check real-time availability.</p>
        <form action="/events" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            name="q"
            placeholder="Search concerts, theater, sports..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none ring-emerald-300 focus:ring"
          />
          <button className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-zinc-950">Search</button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/events?category=${category}`}
              className="rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Featured Events</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

