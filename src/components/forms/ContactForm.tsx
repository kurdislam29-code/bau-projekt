"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z.string().optional(),
  message: z.string().min(10, "Bitte beschreiben Sie Ihr Anliegen etwas ausführlicher."),
});

export type ContactFormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!errs[k]) errs[k] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("ok");
    form.reset();
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/25";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="text-sm font-medium text-zinc-800">
          Name *
        </label>
        <input id="name" name="name" type="text" autoComplete="name" className={inputClass} />
        {fieldErrors.name && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-800">
            E-Mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-zinc-800">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-zinc-800">
          Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Projektort, Zeitraum, Leistungsumfang …"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-70 transition-colors w-full sm:w-auto"
      >
        {status === "sending" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        )}
        Nachricht senden
      </button>
      {status === "ok" && (
        <p className="text-sm text-emerald-700" role="status">
          Vielen Dank – wir melden uns zeitnah bei Ihnen.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Senden derzeit nicht möglich. Bitte kontaktieren Sie uns telefonisch.
        </p>
      )}
      <p className="text-xs text-zinc-500 leading-relaxed">
        Mit Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß unserer{" "}
        <Link href="/datenschutz" className="text-brand hover:underline">
          Datenschutzerklärung
        </Link>{" "}
        zu.
      </p>
    </form>
  );
}
