"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { toCurrency } from "@/lib/currency";

export default function CartPage() {
  const { items, total, subtotal, fees, updateQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-4 py-8">
      <h1 className="text-2xl font-black">Cart / Ticket Review</h1>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-zinc-600">Your cart is empty.</p>
          <Link href="/events" className="mt-4 inline-block rounded bg-zinc-900 px-4 py-2 font-semibold text-white">
            Browse Events
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <article key={`${item.eventId}-${item.ticketTypeId}`} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <h2 className="font-bold">{item.eventTitle}</h2>
                <p className="text-sm text-zinc-600">{item.ticketTypeName} • {toCurrency(item.unitPrice)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.eventId, item.ticketTypeId, Number(e.target.value || 1))}
                    className="w-20 rounded border border-zinc-300 px-2 py-1"
                  />
                  <button onClick={() => removeItem(item.eventId, item.ticketTypeId)} className="text-sm font-semibold text-rose-600">
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-zinc-700">Subtotal: {toCurrency(subtotal)}</p>
            <p className="text-zinc-700">Service fee: {toCurrency(fees)}</p>
            <p className="mt-2 text-xl font-black">Total: {toCurrency(total)}</p>
            <p className="mt-2 text-sm text-amber-700">Only selected quantities are reserved at checkout.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <input placeholder="Promo code" className="rounded border border-zinc-300 px-3 py-2" />
              <Link href="/checkout" className="rounded bg-zinc-900 px-5 py-2 font-semibold text-white">
                Continue to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

