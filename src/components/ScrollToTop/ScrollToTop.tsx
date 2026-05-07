"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);

    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as any,
      });

      // Fallback for some mobile browsers
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
