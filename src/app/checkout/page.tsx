"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    clearCart();
    const ref = `ETH-${Date.now().toString().slice(-8)}`;
    router.push(`/confirmation?ref=${ref}`);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 px-4 py-8">
      <h1 className="text-2xl font-black">Secure Checkout</h1>
      {!user && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          Please login or register before final payment integration is enabled.
        </p>
      )}
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5">
        <input required placeholder="Full name" className="w-full rounded border border-zinc-300 px-3 py-2" />
        <input required type="email" placeholder="Email" className="w-full rounded border border-zinc-300 px-3 py-2" />
        <input required placeholder="Phone" className="w-full rounded border border-zinc-300 px-3 py-2" />
        <select className="w-full rounded border border-zinc-300 px-3 py-2">
          <option>Payment gateway to be finalized</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          I accept the terms and conditions
        </label>
        <button className="rounded bg-zinc-900 px-5 py-2 font-semibold text-white">Place Order</button>
      </form>
    </div>
  );
}

