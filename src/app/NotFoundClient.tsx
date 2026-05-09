"use client";

import { useEffect, useState } from "react";
import NotFoundUI from "@/components/NotFoundUI/NotFoundUI";

export default function NotFoundClient() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const firstPart = window.location.pathname.split("/")[1];
    if (["es", "en", "fr", "pt"].includes(firstPart)) {
      setLang(firstPart);
    }
  }, []);

  return <NotFoundUI lang={lang} />;
}
