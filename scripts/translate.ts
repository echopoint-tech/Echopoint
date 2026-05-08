import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { ES } from "../src/i18n/es";

// Load .env.local before any API calls
try {
  for (const line of readFileSync(resolve(process.cwd(), ".env.local"), "utf-8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {}

const DEEPL_KEY = process.env.DEEPL_API_KEY;

const TARGETS = [
  { code: "EN-US", file: "en", export: "EN" },
  { code: "FR",    file: "fr", export: "FR" },
  { code: "PT-BR", file: "pt", export: "PT" },
] as const;

// URL slugs — must not be translated (they're part of the URL)
const SKIP_KEYS = new Set(["slug"]);

type StrMap = Map<string, string>;

function collectStrings(obj: unknown, prefix = ""): StrMap {
  const map: StrMap = new Map();
  if (typeof obj === "string") {
    map.set(prefix, obj);
  } else if (obj && typeof obj === "object") {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (SKIP_KEYS.has(key)) continue;
      const path = prefix ? `${prefix}.${key}` : key;
      for (const [k, v] of collectStrings(value, path)) {
        map.set(k, v);
      }
    }
  }
  return map;
}

function setByPath(obj: Record<string, unknown>, path: string, value: string) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]] || typeof cur[keys[i]] !== "object") cur[keys[i]] = {};
    cur = cur[keys[i]] as Record<string, unknown>;
  }
  cur[keys[keys.length - 1]] = value;
}

async function translateBatch(texts: string[], targetLang: string): Promise<string[]> {
  // DeepL free keys end in :fx — use the free subdomain
  const host = DEEPL_KEY?.endsWith(":fx")
    ? "api-free.deepl.com"
    : "api.deepl.com";

  const res = await fetch(`https://${host}/v2/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
    },
    body: JSON.stringify({
      text: texts,
      source_lang: "ES",
      target_lang: targetLang,
      tag_handling: "html", // preserves <br/>, <span> etc.
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepL ${res.status}: ${err}`);
  }

  const data = (await res.json()) as { translations: { text: string }[] };
  return data.translations.map((t) => decodeEntities(t.text));
}

// DeepL with tag_handling:"html" encodes apostrophes as &#x27; — decode them back
function decodeEntities(str: string): string {
  return str.replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

async function main() {
  if (!DEEPL_KEY) {
    console.error("Error: DEEPL_API_KEY not found in .env.local");
    process.exit(1);
  }

  const strings = collectStrings(ES);
  const paths = [...strings.keys()];
  const texts = [...strings.values()];

  console.log(`Found ${texts.length} strings to translate\n`);

  for (const target of TARGETS) {
    console.log(`Translating → ${target.code}...`);

    const translated: string[] = [];
    const BATCH = 50; // DeepL max per request

    for (let i = 0; i < texts.length; i += BATCH) {
      const results = await translateBatch(texts.slice(i, i + BATCH), target.code);
      translated.push(...results);
      process.stdout.write(`  ${Math.min(i + BATCH, texts.length)}/${texts.length}\r`);
    }

    // Start from a deep clone of ES so slugs are preserved, then overlay translations
    const result = JSON.parse(JSON.stringify(ES)) as Record<string, unknown>;
    for (let i = 0; i < paths.length; i++) {
      setByPath(result, paths[i], translated[i]);
    }

    const content = `export const ${target.export} = ${JSON.stringify(result, null, 2)};\n`;
    writeFileSync(`src/i18n/${target.file}.ts`, content);
    console.log(`  ✓ src/i18n/${target.file}.ts`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
