"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

function AuthForm() {
  const params = useSearchParams();
  const mode = params.get("mode") === "register" ? "register" : "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (mode === "register") {
        await register(email, password);
      } else {
        await login(email, password);
      }
      router.push("/dashboard");
    } catch {
      setError("Unable to authenticate. Check Firebase auth setup and credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-8">
      <form onSubmit={onSubmit} className="w-full space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-black">{mode === "register" ? "Create account" : "Login"}</h1>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border border-zinc-300 px-3 py-2"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded border border-zinc-300 px-3 py-2"
        />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button disabled={submitting} className="w-full rounded bg-zinc-900 px-4 py-2 font-semibold text-white">
          {submitting ? "Please wait..." : mode === "register" ? "Register" : "Login"}
        </button>
        <p className="text-sm text-zinc-600">
          {mode === "register" ? "Already have an account?" : "No account yet?"}{" "}
          <Link href={mode === "register" ? "/auth?mode=login" : "/auth?mode=register"} className="font-semibold text-zinc-900">
            {mode === "register" ? "Login" : "Register"}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="mx-auto w-full max-w-md px-4 py-10">Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}
