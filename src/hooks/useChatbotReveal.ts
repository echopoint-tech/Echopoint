"use client";

import { useState, useEffect } from "react";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function useChatbotReveal(): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let mounted = true;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const reveal = () => {
      if (!mounted) return;
      setShow(true);
      window.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", reveal);
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("touchstart", reveal);
    };

    window.addEventListener("pointerdown", reveal, { passive: true });
    window.addEventListener("keydown", reveal);
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("touchstart", reveal, { passive: true });

    const win = window as IdleWindow;
    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(reveal, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(reveal, 1800);
    }

    return () => {
      mounted = false;
      window.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", reveal);
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("touchstart", reveal);
      if (idleId !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return show;
}
