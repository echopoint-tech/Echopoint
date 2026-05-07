"use client";
import { useEffect, useRef, ReactNode, Children } from "react";
import styles from "./AutoCarousel.module.css";

interface AutoCarouselProps {
  children: ReactNode;
  className?: string;
  intervalMs?: number;
}

export default function AutoCarousel({ children, className, intervalMs = 5000 }: AutoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
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
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -clientWidth, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(scrollNext, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

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

      <div ref={scrollRef} className={styles.carouselContainer}>
        {Children.map(children, (child) => (
          <div className={styles.carouselItem}>
            {child}
          </div>
        ))}
      </div>

      <button 
        className={`${styles.arrowButton} ${styles.arrowRight}`} 
        onClick={scrollNext}
        aria-label="Siguiente"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
