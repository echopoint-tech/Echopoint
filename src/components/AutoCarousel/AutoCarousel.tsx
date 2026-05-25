"use client";
import { useEffect, useState, ReactNode, Children, useCallback } from "react";
import styles from "./AutoCarousel.module.css";

interface AutoCarouselProps {
  children: ReactNode;
  className?: string;
  intervalMs?: number;
}

export default function AutoCarousel({ children, className, intervalMs = 8000 }: AutoCarouselProps) {
  const [idx, setIdx] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const timer = setInterval(() => setIdx(prev => (prev + 1) % count), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, count, resetKey]);

  const go = useCallback((i: number) => {
    setIdx(((i % count) + count) % count);
    setResetKey(k => k + 1);
  }, [count]);

  return (
    <div className={`${styles.carouselWrapper} ${className || ""}`}>
      <div className={styles.carouselInner}>
        <button className={`${styles.navBtn} ${styles.prev}`} onClick={() => go(idx - 1)} aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.track}>
          <div className={styles.slides} style={{ transform: `translateX(-${idx * 100}%)` }}>
            {Children.map(children, (child) => (
              <div className={styles.slide}>{child}</div>
            ))}
          </div>
        </div>

        <button className={`${styles.navBtn} ${styles.next}`} onClick={() => go(idx + 1)} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.controls}>
        <span className={styles.counter}>
          <b>{String(idx + 1).padStart(2, "0")}</b>
          {" — "}
          {String(count).padStart(2, "0")}
        </span>
        <div className={styles.dots}>
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`}
              onClick={() => go(i)}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
