"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { deleteMediaFileAction } from "@/server/actions/admin-media";

type M = {
  id: string;
  path: string;
  originalName: string;
  folder: string;
  size: number;
  createdAt: Date;
};

const input =
  "rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function MediaLibraryClient({ initial }: { initial: M[] }) {
  const router = useRouter();
  const [folder, setFolder] = useState("general");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (!list.length) return;
    setBusy(true);
    setMsg(null);
    try {
      for (const file of list) {
        const fd = new FormData();
        fd.set("file", file);
        fd.set("folder", folder);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error ?? "Upload fehlgeschlagen");
        }
      }
      setMsg(`${list.length} Datei(en) hochgeladen.`);
      router.refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Fehler");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-zinc-800">Dateien hierher ziehen</p>
        <p className="mt-1 text-xs text-zinc-500">oder auswählen · JPG/PNG/WebP → optimiertes JPEG</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <input
            className={input}
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            placeholder="Ordner (z. B. general)"
            aria-label="Zielordner"
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const f = e.target.files;
              if (f) void uploadFiles(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
          >
            Dateien wählen
          </button>
        </div>
        <div
          className="mt-6 rounded-lg border border-zinc-100 bg-zinc-50/80 py-10 text-xs text-zinc-500"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void uploadFiles(e.dataTransfer.files);
          }}
        >
          Drag &amp; Drop Bereich
        </div>
        {msg ? <p className="mt-4 text-sm text-zinc-700">{msg}</p> : null}
        {busy ? (
          <p className="mt-2 text-xs text-zinc-500">Bitte warten …</p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {initial.map((m) => (
          <div
            key={m.id}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-zinc-100">
              <Image
                src={m.path}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 50vw, 33vw"
              />
            </div>
            <div className="space-y-2 p-3">
              <p className="truncate text-xs font-medium text-zinc-900">
                {m.originalName}
              </p>
              <p className="truncate text-[11px] text-zinc-500">{m.path}</p>
              <p className="text-[11px] text-zinc-400">
                {m.folder} · {(m.size / 1024).toFixed(1)} KB
              </p>
              <form
                action={async (fd) => {
                  await deleteMediaFileAction(fd);
                  router.refresh();
                }}
              >
                <input type="hidden" name="id" value={m.id} />
                <button
                  type="submit"
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Löschen
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
