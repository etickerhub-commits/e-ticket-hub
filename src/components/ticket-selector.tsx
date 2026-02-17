"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toCurrency } from "@/lib/currency";
import type { EventItem } from "@/types";
import { useCart } from "@/context/cart-context";

export function TicketSelector({ event }: { event: EventItem }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [ticketTypeId, setTicketTypeId] = useState(event.ticketTypes[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  const ticket = useMemo(
    () => event.ticketTypes.find((item) => item.id === ticketTypeId),
    [event.ticketTypes, ticketTypeId],
  );

  const soldOut = !ticket || ticket.available < 1;

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Select Tickets</h2>
      <select
        value={ticketTypeId}
        onChange={(e) => setTicketTypeId(e.target.value)}
        className="w-full rounded border border-zinc-300 px-3 py-2"
      >
        {event.ticketTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name} - {toCurrency(type.price)} ({type.available} left)
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        max={10}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
        className="w-full rounded border border-zinc-300 px-3 py-2"
      />
      {soldOut && <p className="text-sm font-medium text-rose-600">This ticket type is sold out.</p>}
      <button
        onClick={() => {
          if (!ticket || soldOut) return;
          addItem({
            eventId: event.id,
            eventTitle: event.title,
            ticketTypeId: ticket.id,
            ticketTypeName: ticket.name,
            unitPrice: ticket.price,
            quantity,
          });
          router.push("/cart");
        }}
        disabled={soldOut}
        className="w-full rounded bg-zinc-900 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        Add to Cart
      </button>
    </div>
  );
}

