"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <p className="rounded-lg border border-zinc-300 bg-white p-4">Please login to access your dashboard.</p>
        <Link href="/auth?mode=login" className="mt-3 inline-block rounded bg-zinc-900 px-4 py-2 font-semibold text-white">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-4 py-8">
      <h1 className="text-2xl font-black">User Account Dashboard</h1>
      <p className="text-zinc-700">Signed in as {user.email}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="font-bold">My Tickets</h2>
          <p className="text-sm text-zinc-600">Download or view your active and past e-tickets.</p>
        </section>
        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="font-bold">Profile</h2>
          <p className="text-sm text-zinc-600">Edit account details and contact information.</p>
        </section>
        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="font-bold">Payment Methods</h2>
          <p className="text-sm text-zinc-600">Saved payment methods will be available after gateway selection.</p>
        </section>
        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="font-bold">Refund Requests</h2>
          <p className="text-sm text-zinc-600">Submit refunds based on event policies.</p>
        </section>
      </div>
    </div>
  );
}

