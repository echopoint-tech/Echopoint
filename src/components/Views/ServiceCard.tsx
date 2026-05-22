'use client';

import Link from 'next/link';
import styles from './ServiceCard.module.css';
import * as Viz from './Visualizations';

export type ServiceItem = {
  id: string;
  cat: 'bi' | 'ai' | 'growth';
  viz: keyof typeof Viz;
  badge: string;       // e.g. "BI · 01"
  title: string;       // e.g. "Dashboards Ejecutivos"
  desc: string;
  stats?: { v: string; u?: string; k: string }[];
  primaryCta?: string;   // default "Solicitar demo"
  secondaryCta?: string; // default "Detalles"
  primaryCtaUrl?: string;
  secondaryCtaUrl?: string;
};

export default function ServiceCard({ item }: { item: ServiceItem }) {
  const VizComp = Viz[item.viz];
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={styles.badge}>{item.badge}</span>
      </header>

      {VizComp && <VizComp />}

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.desc}>{item.desc}</p>
      <div className={styles.cta}>
        {item.secondaryCtaUrl ? (
          <Link href={item.secondaryCtaUrl} className={styles.btnSecondary}>
            {item.secondaryCta ?? 'Detalles'}
            <Arrow />
          </Link>
        ) : (
          <button className={styles.btnSecondary}>
            {item.secondaryCta ?? 'Detalles'}
            <Arrow />
          </button>
        )}
      </div>
    </article>
  );
}

function Arrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
