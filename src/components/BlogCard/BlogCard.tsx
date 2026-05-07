"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/content/posts";

const CATEGORY_KEYS: Record<string, string> = {
  "Estrategia": "estrategia",
  "Tecnología": "tecnologia",
  "Ventas": "ventas",
  "Expansión": "expansion",
};
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/i18n/routing";
import styles from "./BlogCard.module.css";

export default function BlogCard({ post, isPriority = false, delay = 0 }: { post: BlogPost; delay?: number; isPriority?: boolean }) {
  const { lang, t } = useLanguage();
  const readMinutes = Math.max(3, Math.round(post.excerpt.trim().split(/\s+/).filter(Boolean).length / 24));

  return (
    <Link 
      href={getLocalizedPath(lang, `/blog/${post.slug}`)}
      className={`group block w-full h-full reveal reveal-delay-${delay} focus:outline-none ${styles.cardLink} ${isPriority ? styles.featured : ""}`}
    >
      <article className={styles.card}>
        <div className={styles.visualShell}>
          <div className={styles.imageFrame}>
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              priority={isPriority}
              className={styles.image}
              quality={90}
              sizes={isPriority ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
            <div className={styles.imageOverlay} />
            <div className={styles.imageGlow} />
          </div>

          <div className={styles.ribbonRow}>
            <span className={styles.categoryPill}>{t(`insights.categories.${CATEGORY_KEYS[post.category] ?? post.category}`)}</span>
            <span className={styles.readChip}>{readMinutes} {t("insights.minRead")}</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.metaRow}>
            <span className={styles.date}>{post.date}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span className={styles.author}>{post.author}</span>
          </div>

          <h3 className={styles.title}>{post.title}</h3>

          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.footerRow}>
            <span className={styles.ctaText}>{t("insights.readArticle")}</span>
            <span className={styles.arrow} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
