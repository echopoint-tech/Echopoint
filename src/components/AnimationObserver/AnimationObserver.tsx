"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./AnimationObserver.module.css";

export default function AnimationObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const selector = ".reveal:not(.active), .fade-in-up:not(.visible)";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll(selector).forEach(el => observer.observe(el));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;
          if (el.matches?.(selector)) observer.observe(el);
          el.querySelectorAll(selector).forEach(child => observer.observe(child));
        });
      });
    });

    mutationObserver.observe(document.querySelector('main') ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
