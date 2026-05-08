"use client";

import { createContext, useContext, ReactNode, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import { getInternalPath, getLocalizedPath } from "@/i18n/routing";

export type Language = "ES" | "EN" | "FR" | "PT";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isPending: boolean;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({
  children,
  initialLang,
  dictionary,
}: {
  children: ReactNode;
  initialLang?: Language;
  dictionary?: Dictionary;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const upperInitial = initialLang ? (initialLang.toUpperCase() as Language) : undefined;
  const lang = upperInitial && ["ES", "EN", "FR", "PT"].includes(upperInitial) ? upperInitial : "ES";

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
    if (newLang === lang) return;

    const newLangLower = newLang.toLowerCase();

    let internalPath = pathname || "/";
    const pathParts = internalPath.split("/");
    if (pathParts[1] && ["es", "en", "fr", "pt"].includes(pathParts[1])) {
      const currentLocale = pathParts[1];
      const restOfPath = internalPath.substring(currentLocale.length + 1);
      internalPath = getInternalPath(currentLocale, restOfPath);
    }

    const targetUrl = getLocalizedPath(newLangLower, internalPath);

    startTransition(() => {
      router.push(targetUrl);
    });
  };

  const t = (key: string): string => {
    if (!dictionary) return key;
    const keys = key.split(".");
    let value: unknown = dictionary;

    for (const k of keys) {
      if (value === undefined || value === null || typeof value !== "object") break;
      value = (value as Record<string, unknown>)[k];
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isPending, dictionary: dictionary ?? ({} as Dictionary) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
