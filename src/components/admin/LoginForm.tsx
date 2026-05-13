"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

const input =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-200/50">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        Admin
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
        Anmelden
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        CMS-Zugang für Inhalte und Medien.
      </p>
      <form
        className="mt-8 space-y-4"
        action={async (fd) => {
          setError(null);
          setPending(true);
          try {
            const email = String(fd.get("email") ?? "");
            const password = String(fd.get("password") ?? "");
            const res = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });
            if (res?.error) {
              setError("E-Mail oder Passwort ungültig.");
              setPending(false);
              return;
            }
            window.location.href = "/admin";
          } catch {
            setError("Anmeldung fehlgeschlagen.");
            setPending(false);
          }
        }}
      >
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className={input}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-700"
          >
            Passwort
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={input}
          />
        </div>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Bitte warten …" : "Einloggen"}
        </button>
      </form>
    </div>
  );
}
