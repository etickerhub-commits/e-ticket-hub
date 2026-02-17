"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

export function SiteHeader() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-black tracking-tight text-zinc-900">
          E-Ticket Hub
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-700">
          <Link href="/events">Explore</Link>
          <Link href="/cart">Cart ({count})</Link>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={() => logout()} className="rounded bg-zinc-900 px-3 py-1.5 text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth?mode=login">Login</Link>
              <Link href="/auth?mode=register" className="rounded bg-zinc-900 px-3 py-1.5 text-white">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

