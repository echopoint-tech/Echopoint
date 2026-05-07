// Map of external translated paths to internal Next.js folder paths
export const pathTranslationMap: Record<string, Record<string, string>> = {
  es: {
    servicios: "servicios",
    nosotros: "nosotros",
    contacto: "contacto",
    blog: "blog",
  },
  en: {
    services: "servicios",
    about: "nosotros",
    contact: "contacto",
    blog: "blog",
  },
  fr: {
    services: "servicios",
    "a-propos": "nosotros",
    contact: "contacto",
    blog: "blog",
  },
  pt: {
    servicos: "servicios",
    "sobre-nos": "nosotros",
    contato: "contacto",
    blog: "blog",
  },
};

// Reverse map to get the translated URL from an internal path
export const getLocalizedPath = (locale: string, internalPath: string): string => {
  const lang = locale.toLowerCase();
  if (!pathTranslationMap[lang]) return `/${lang}${internalPath}`;

  // internalPath typically looks like "/servicios" or "/servicios/slug"
  const parts = internalPath.split("/").filter(Boolean);
  if (parts.length === 0) return `/${lang}`;

  const rootFolder = parts[0];
  
  // Find the translated folder name by looking up the value in the map
  const entries = Object.entries(pathTranslationMap[lang]);
  const matchedEntry = entries.find(([_, internal]) => internal === rootFolder);
  
  if (matchedEntry) {
    const translatedRoot = matchedEntry[0];
    parts[0] = translatedRoot;
    return `/${lang}/${parts.join("/")}`;
  }

  return `/${lang}${internalPath}`;
};

export const getInternalPath = (locale: string, externalPath: string): string => {
  const lang = locale.toLowerCase();
  if (!pathTranslationMap[lang]) return externalPath;

  const parts = externalPath.split("/").filter(Boolean);
  if (parts.length === 0) return "/";

  const rootFolder = parts[0];
  const internalFolder = pathTranslationMap[lang][rootFolder];

  if (internalFolder) {
    parts[0] = internalFolder;
    return `/${parts.join("/")}`;
  }

  return externalPath;
};
