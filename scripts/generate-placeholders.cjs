/**
 * Lädt kuratierte, realistische Bau-/Gewerbe-Fotografie und speichert sie lokal unter public/images.
 * Wird NUR beim Entwickeln ausgeführt (npm run generate:images) – die Next.js-App nutzt ausschließlich lokale Pfade.
 *
 * Quelle: Unsplash (frei nutzbar gemäß https://unsplash.com/license) – Download nur in diesem Skript, keine Remote-URLs in der App.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images");

const SLUGS = [
  "hochbau",
  "tiefbau",
  "rohbau",
  "innenausbau",
  "sanierung",
  "trockenbau",
  "fliesenarbeiten",
  "malerarbeiten",
  "bodenverlegung",
  "abbrucharbeiten",
  "elektroarbeiten",
  "sanitaerarbeiten",
  "fenster-tueren",
  "fassadensanierung",
  "dacharbeiten",
  "waermepumpen",
  "barrierefreies-bad-wc",
  "solaranlagen",
  "reinigungsservice",
];

/** Unsplash-Bild-ID (ohne Präfix „photo-“) → echte Fotografie */
function u(id, w) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=88`;
}

/**
 * Kuratierte Motive: Kräne, Rohbau, Innenausbau, Sanierung, Gewerke, Elektro, Sanitär, Fassade, Dach …
 * IDs sind etablierte Unsplash-Fotos (Baustelle, Architektur, Handwerk).
 */
const GLOBAL = {
  hero: ["1503387762-592deb58ef4e", 2400, 1200],
  about: ["1581092160562-40aa08e78837", 1800, 2200],
  cta: ["1541888946425-d81bb19240f5", 2200, 900],
  projects: [
    ["1486406146926-c627a92ad1ab", 1600, 1100],
    ["1503387762-592deb58ef4e", 1600, 1100],
    ["1545324418-cc1a3fa10c00", 1600, 1100],
    ["1560518883-ce09059eeffa", 1600, 1100],
  ],
};

/** Pro Leistung: Hero + 3 Galerie-Motive (nur verifizierte Unsplash-IDs mit HTTP 200) */
const BY_SLUG = {
  hochbau: {
    hero: "1486406146926-c627a92ad1ab",
    gallery: [
      "1581094794329-c8112a89af12",
      "1621905252507-b35492cc74b4",
      "1541888946425-d81bb19240f5",
    ],
  },
  tiefbau: {
    hero: "1621905251918-48416bd8575a",
    gallery: [
      "1581094794329-c8112a89af12",
      "1503387762-592deb58ef4e",
      "1621905252507-b35492cc74b4",
    ],
  },
  rohbau: {
    hero: "1503389152951-9f343605f61e",
    gallery: [
      "1581092160562-40aa08e78837",
      "1621905252507-b35492cc74b4",
      "1618221195710-dd6b41faaea6",
    ],
  },
  innenausbau: {
    hero: "1618221195710-dd6b41faaea6",
    gallery: [
      "1616486338812-3dadae4b4ace",
      "1600585154526-990dced4db0d",
      "1615873968403-89e068629265",
    ],
  },
  sanierung: {
    hero: "1560518883-ce09059eeffa",
    gallery: [
      "1600585154340-be6161a56a0c",
      "1600566752355-35792bedcfea",
      "1581092160562-40aa08e78837",
    ],
  },
  trockenbau: {
    hero: "1600585154526-990dced4db0d",
    gallery: [
      "1618221195710-dd6b41faaea6",
      "1616486338812-3dadae4b4ace",
      "1600566753190-17f0baa2a6c3",
    ],
  },
  fliesenarbeiten: {
    hero: "1600607687644-c7171b42498f",
    gallery: [
      "1600566753190-17f0baa2a6c3",
      "1615873968403-89e068629265",
      "1600585154526-990dced4db0d",
    ],
  },
  malerarbeiten: {
    hero: "1589939705384-5185137a7f0f",
    gallery: [
      "1618221195710-dd6b41faaea6",
      "1600566752355-35792bedcfea",
      "1600585154526-990dced4db0d",
    ],
  },
  bodenverlegung: {
    hero: "1615873968403-89e068629265",
    gallery: [
      "1616486338812-3dadae4b4ace",
      "1600607687644-c7171b42498f",
      "1560518883-ce09059eeffa",
    ],
  },
  abbrucharbeiten: {
    hero: "1621905251918-48416bd8575a",
    gallery: [
      "1621905252507-b35492cc74b4",
      "1581094794329-c8112a89af12",
      "1503387762-592deb58ef4e",
    ],
  },
  elektroarbeiten: {
    hero: "1621905252507-b35492cc74b4",
    gallery: [
      "1503389152951-9f343605f61e",
      "1541888946425-d81bb19240f5",
      "1486406146926-c627a92ad1ab",
    ],
  },
  sanitaerarbeiten: {
    hero: "1600566753190-17f0baa2a6c3",
    gallery: [
      "1600607687644-c7171b42498f",
      "1600585154526-990dced4db0d",
      "1615873968403-89e068629265",
    ],
  },
  "fenster-tueren": {
    hero: "1600585154340-be6161a56a0c",
    gallery: [
      "1545324418-cc1a3fa10c00",
      "1560518883-ce09059eeffa",
      "1600566752355-35792bedcfea",
    ],
  },
  fassadensanierung: {
    hero: "1545324418-cc1a3fa10c00",
    gallery: [
      "1600585154340-be6161a56a0c",
      "1486406146926-c627a92ad1ab",
      "1541888946425-d81bb19240f5",
    ],
  },
  dacharbeiten: {
    hero: "1600585154084-4e5fe7c39198",
    gallery: [
      "1560518883-ce09059eeffa",
      "1600585154340-be6161a56a0c",
      "1503387762-592deb58ef4e",
    ],
  },
  waermepumpen: {
    hero: "1621905252507-b35492cc74b4",
    gallery: [
      "1503389152951-9f343605f61e",
      "1541888946425-d81bb19240f5",
      "1486406146926-c627a92ad1ab",
    ],
  },
  "barrierefreies-bad-wc": {
    hero: "1600566753190-17f0baa2a6c3",
    gallery: [
      "1600607687644-c7171b42498f",
      "1600585154526-990dced4db0d",
      "1615873968403-89e068629265",
    ],
  },
  solaranlagen: {
    hero: "1600585154084-4e5fe7c39198",
    gallery: [
      "1560518883-ce09059eeffa",
      "1600585154340-be6161a56a0c",
      "1503387762-592deb58ef4e",
    ],
  },
  reinigungsservice: {
    hero: "1589939705384-5185137a7f0f",
    gallery: [
      "1618221195710-dd6b41faaea6",
      "1600566752355-35792bedcfea",
      "1600585154526-990dced4db0d",
    ],
  },
};

async function downloadBuffer(url) {
  const prev = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DelikayaBau-AssetFetch/1.0; +https://www.delikaya-bau.de)",
        Accept: "image/avif,image/webp,image/jpeg,image/*,*/*;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) throw new Error("Antwort zu klein (kein Bild)");
    return buf;
  } finally {
    if (prev === undefined) delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    else process.env.NODE_TLS_REJECT_UNAUTHORIZED = prev;
  }
}

async function savePhoto(relPath, photoId, width, height) {
  const dest = path.join(OUT, ...relPath.split("/"));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const url = u(photoId, Math.min(3200, Math.max(width, height) * 2));
  const raw = await downloadBuffer(url);
  await sharp(raw)
    .rotate()
    .resize({
      width,
      height,
      fit: "cover",
      position: "centre",
    })
    .modulate({
      brightness: 1.04,
      saturation: 1.08,
      hue: 4,
    })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(dest);
  console.log("wrote", relPath);
}

async function main() {
  const [hId, hw, hh] = GLOBAL.hero;
  await savePhoto("hero/construction-site.jpg", hId, hw, hh);

  const [aId, aw, ah] = GLOBAL.about;
  await savePhoto("about/construction-team.jpg", aId, aw, ah);

  const [cId, cw, ch] = GLOBAL.cta;
  await savePhoto("cta/construction-bg.jpg", cId, cw, ch);

  await Promise.all(
    GLOBAL.projects.map(([pid, pw, ph], i) =>
      savePhoto(`projects/project-${i + 1}.jpg`, pid, pw, ph)
    )
  );

  for (const slug of SLUGS) {
    const cfg = BY_SLUG[slug];
    if (!cfg) throw new Error(`Fehlende Foto-Zuordnung: ${slug}`);
    await savePhoto(`services/${slug}.jpg`, cfg.hero, 1920, 1080);
    for (let idx = 0; idx < cfg.gallery.length; idx++) {
      await savePhoto(
        `services/${slug}/gallery-${idx + 1}.jpg`,
        cfg.gallery[idx],
        1600,
        1100
      );
    }
  }

  console.log(
    "Fertig: realistische JPEGs unter public/images (nächster Schritt: npm run build)."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
