import Link from "next/link";

type Props = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function ConfirmationPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-black">Payment Confirmation</h1>
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
        Order confirmed. Reference: <span className="font-bold">{params.ref ?? "ETH-UNKNOWN"}</span>
      </p>
      <p className="text-zinc-700">E-ticket delivery via PDF with QR code and notifications can be integrated next.</p>
      <div className="flex gap-3">
        <Link href="/dashboard" className="rounded bg-zinc-900 px-4 py-2 font-semibold text-white">View Dashboard</Link>
        <Link href="/events" className="rounded border border-zinc-300 bg-white px-4 py-2 font-semibold">Book Another Event</Link>
      </div>
    </div>
  );
}

