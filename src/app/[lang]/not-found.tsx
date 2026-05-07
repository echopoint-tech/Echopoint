"use client";

import { useParams } from "next/navigation";
import NotFoundUI from "@/components/NotFoundUI/NotFoundUI";

export default function NotFound() {
  const params = useParams();
  let lang = typeof params?.lang === 'string' ? params.lang : '';

  // Fallback para detectar el idioma desde la URL si useParams está vacío
  if (!lang && typeof window !== 'undefined') {
    const pathParts = window.location.pathname.split('/');
    const firstPart = pathParts[1]; // /en/abc -> en
    if (['es', 'en', 'fr', 'pt'].includes(firstPart)) {
      lang = firstPart;
    }
  }

  const currentLang = lang || 'es';

  return <NotFoundUI lang={currentLang} />;
}
