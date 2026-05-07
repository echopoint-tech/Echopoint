"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/content/posts";

const CATEGORY_KEYS: Record<string, string> = {
  "Estrategia": "estrategia",
  "Tecnología": "tecnologia",
  "Ventas": "ventas",
  "Expansión": "expansion",
};
import BlogCard from "../BlogCard";
import { useLanguage } from "@/context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./BlogList.module.css";

export default function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { t } = useLanguage();

  const filteredPosts = initialPosts.filter(post => {
    const matchesFilter = filter === "all" || post.category === filter;
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Re-trigger reveal animations when filter or search changes
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.active)');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filter, search]);

  return (
    <>
      <div className={`${styles.blogControls} fade-in-up`}>
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrap}>
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            <input 
              type="text" 
              placeholder={t('insights.search') || "Buscar artículos..."} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t('insights.search') || "Buscar artículos..."}
            />
          </div>
        </div>
        <div className={styles.categoryFilters}>
          {["all", "Estrategia", "Tecnología", "Ventas", "Expansión"].map(cat => (
            <button 
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ""}`} 
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? t("insights.filterAll") : t(`insights.categories.${CATEGORY_KEYS[cat] ?? cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.blogGridFeed}>
        {filteredPosts.map((post, i) => (
          <BlogCard key={post.id} post={post} delay={(i % 3) + 1} isPriority={i === 0} />
        ))}
        {filteredPosts.length === 0 && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem" }}>
            {t('insights.noResults') || "No se encontraron artículos que coincidan con la búsqueda."}
          </p>
        )}
      </div>
    </>
  );
}
