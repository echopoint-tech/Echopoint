"use client";
import { useEffect, useRef, ReactNode, Children, useState, useCallback } from "react";
import styles from "./AutoCarousel.module.css";

interface AutoCarouselProps {
  children: ReactNode;
  className?: string;
  intervalMs?: number;
}

export default function AutoCarousel({ children, className, intervalMs = 5000 }: AutoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = Children.count(children);

  const scrollNext = (isManual = false) => {
    if (isManual) setIsAutoPlaying(false);
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
      }
    }
  };

  const scrollPrev = () => {
    setIsAutoPlaying(false);
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -clientWidth, behavior: "smooth" });
      }
    }
  };

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      setActiveIndex(Math.round(scrollLeft / clientWidth));
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => scrollNext(false), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, isAutoPlaying]);

  return (
    <div className={`${styles.carouselWrapper} ${className || ""}`}>
      <button
        className={`${styles.arrowButton} ${styles.arrowLeft}`}
        onClick={scrollPrev}
        aria-label="Anterior"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className={styles.carouselContainer}
        onTouchStart={() => setIsAutoPlaying(false)}
        onMouseDown={() => setIsAutoPlaying(false)}
      >
        {Children.map(children, (child) => (
          <div className={styles.carouselItem}>
            {child}
          </div>
        ))}
      </div>

      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
          />
        ))}
      </div>

      <button
        className={`${styles.arrowButton} ${styles.arrowRight}`}
        onClick={() => scrollNext(true)}
        aria-label="Siguiente"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
