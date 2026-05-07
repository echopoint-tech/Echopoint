"use client";

import NotFoundUI from "@/components/NotFoundUI/NotFoundUI";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const firstPart = pathParts[1];
    if (['es', 'en', 'fr', 'pt'].includes(firstPart)) {
      setLang(firstPart);
    }
  }, []);

  return <NotFoundUI lang={lang} />;
}
