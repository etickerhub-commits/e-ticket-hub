import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/types";
import { toCurrency } from "@/lib/currency";

export function EventCard({ event }: { event: EventItem }) {
  const lowestPrice = Math.min(...event.ticketTypes.map((ticket) => ticket.price));

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative h-48">
        <Image src={event.image} alt={event.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">{event.category}</p>
        <h3 className="text-lg font-bold text-zinc-900">{event.title}</h3>
        <p className="text-sm text-zinc-600">
          {event.city} • {event.venue}
        </p>
        <p className="text-sm text-zinc-600">
          {event.date} • {event.time}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-zinc-900">From {toCurrency(lowestPrice)}</p>
          <Link
            href={`/events/${event.id}`}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white"
          >
            View Event
          </Link>
        </div>
      </div>
    </article>
  );
}

