"use client";

import { useState } from "react";
import { updateContactSettingsAction } from "@/server/actions/admin-contact";

const label = "block text-sm font-medium text-zinc-700";
const input =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

type C = {
  companyName: string;
  legalName: string;
  phone: string;
  phoneRaw: string;
  email: string;
  whatsappUrl: string;
  addressStreet: string;
  addressZip: string;
  addressCity: string;
  addressCountry: string;
  hours: string;
  siteUrl: string;
  defaultDescription: string;
};

export function ContactSettingsForm({ initial }: { initial: C }) {
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <form
      className="max-w-2xl space-y-4"
        action={async (fd) => {
          await updateContactSettingsAction(fd);
          setMsg("Gespeichert.");
        }}
    >
      {msg ? (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {msg}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Markenname</label>
          <input name="companyName" className={input} defaultValue={initial.companyName} />
        </div>
        <div>
          <label className={label}>Rechtlicher Name</label>
          <input name="legalName" className={input} defaultValue={initial.legalName} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Telefon (Anzeige)</label>
          <input name="phone" className={input} defaultValue={initial.phone} />
        </div>
        <div>
          <label className={label}>Telefon (tel:-Link, E.164)</label>
          <input name="phoneRaw" className={input} defaultValue={initial.phoneRaw} />
        </div>
      </div>
      <div>
        <label className={label}>E-Mail</label>
        <input name="email" type="email" className={input} defaultValue={initial.email} />
      </div>
      <div>
        <label className={label}>WhatsApp-Link</label>
        <input name="whatsappUrl" className={input} defaultValue={initial.whatsappUrl} />
      </div>
      <div>
        <label className={label}>Straße</label>
        <input name="addressStreet" className={input} defaultValue={initial.addressStreet} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label}>PLZ</label>
          <input name="addressZip" className={input} defaultValue={initial.addressZip} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Ort</label>
          <input name="addressCity" className={input} defaultValue={initial.addressCity} />
        </div>
      </div>
      <div>
        <label className={label}>Land</label>
        <input name="addressCountry" className={input} defaultValue={initial.addressCountry} />
      </div>
      <div>
        <label className={label}>Öffnungszeiten</label>
        <input name="hours" className={input} defaultValue={initial.hours} />
      </div>
      <div>
        <label className={label}>Website-URL (metadataBase)</label>
        <input name="siteUrl" className={input} defaultValue={initial.siteUrl} />
      </div>
      <div>
        <label className={label}>Standard-Meta-Beschreibung</label>
        <textarea
          name="defaultDescription"
          className={input + " min-h-[100px]"}
          defaultValue={initial.defaultDescription}
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600"
      >
        Speichern
      </button>
    </form>
  );
}
