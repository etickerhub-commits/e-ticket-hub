import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mockEvents } from "@/data/mock-events";
import { TicketSelector } from "@/components/ticket-selector";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = mockEvents.find((item) => item.id === id);
  if (!event) return notFound();

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1.25fr_0.75fr]">
      <section className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="relative h-72 overflow-hidden rounded-xl">
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        </div>
        <h1 className="text-3xl font-black">{event.title}</h1>
        <p className="text-zinc-700">{event.description}</p>
        <p className="text-zinc-600">{event.date} • {event.time}</p>
        <p className="text-zinc-600">{event.venue}, {event.city}</p>
        <p className="text-zinc-700">Performers: {event.performers.join(", ")}</p>
        <Link href="https://maps.google.com" target="_blank" className="text-sm font-semibold text-emerald-700">
          View venue map
        </Link>
      </section>
      <aside>
        <TicketSelector event={event} />
      </aside>
    </div>
  );
}

