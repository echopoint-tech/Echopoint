"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./AnimationObserver.module.css";


export default function AnimationObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const animateSelector = ".reveal:not(.active), .fade-in-up:not(.visible)";

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

    const isInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    };

    const refreshAnimations = () => {
      const pendingElements = document.querySelectorAll(animateSelector);

      pendingElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('active', 'visible');
          observer.unobserve(element);
        } else {
          observer.observe(element);
        }
      });
    };

    const scheduleRefresh = () => {
      requestAnimationFrame(() => {
        refreshAnimations();
        requestAnimationFrame(refreshAnimations);
      });
    };

    scheduleRefresh();

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        return;
      }

      scheduleRefresh();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        scheduleRefresh();
      }
    };

    const handleFocus = () => {
      scheduleRefresh();
    };

    const handleResize = () => {
      scheduleRefresh();
    };

    const mutationObserver = new MutationObserver(scheduleRefresh);
    mutationObserver.observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('resize', handleResize);

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return null;
}
