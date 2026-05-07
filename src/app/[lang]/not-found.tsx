"use client";

import { useParams } from "next/navigation";
import NotFoundUI from "@/components/NotFoundUI/NotFoundUI";

export default function NotFound() {
  const { lang } = useParams();
  const currentLang = typeof lang === 'string' ? lang : 'es';

  return <NotFoundUI lang={currentLang} />;
}
