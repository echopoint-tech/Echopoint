"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/i18n/routing";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faBriefcase,
  faBullseye,
  faCartShopping,
  faChartLine,
  faChartPie,
  faChevronRight,
  faCoins,
  faGears,
  faGlobe,
  faGaugeHigh,
  faHandshake,
  faLayerGroup,
  faLightbulb,
  faMagnifyingGlassChart,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ServiciosView.module.css";

type CategoryFilter = "all" | "pbi" | "consulting" | "ai";

function ServiciosContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  useEffect(() => {
    if (catParam === 'pbi' || catParam === 'consulting' || catParam === 'ai') {
      setActiveFilter(catParam as CategoryFilter);
    }
  }, [catParam]);

  const showPbi = activeFilter === "all" || activeFilter === "pbi";
  const showConsulting = activeFilter === "all" || activeFilter === "consulting";
  const showAi = activeFilter === "all" || activeFilter === "ai";

  // Re-trigger reveal animations when filter changes
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
  }, [activeFilter]);

  return (
    <>
      <AnimationObserver />
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className={`${styles.svcHero} reveal`}>
        <h1 className="reveal-delay-1">{t('services.heroTitle')}</h1>
        <div className={`${styles.svcHeroLine} reveal-delay-2`}></div>
      </section>

      <main id="main-content" className="container section" style={{ paddingTop: "0" }}>

        {/* ── Catalog: Sidebar + Products ── */}
        <div className={styles.pbiCatalog}>

          <aside className={`${styles.pbiSidebar} reveal`}>
            <h2 className="reveal-delay-1" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>{t('services.filterTitle') || 'Categorías'}</h2>
            <nav aria-label="Filtrar servicios">
              <ul className={styles.pbiCatList} role="list">
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "all" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("all")}
                    aria-pressed={activeFilter === "all"}
                  >
                    <FontAwesomeIcon icon={faLayerGroup} />
                    {t('pbi.cat.all')}
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "pbi" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("pbi")}
                    aria-pressed={activeFilter === "pbi"}
                  >
                    <FontAwesomeIcon icon={faChartPie} />
                    Power BI
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "ai" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("ai")}
                    aria-pressed={activeFilter === "ai"}
                  >
                    <FontAwesomeIcon icon={faRobot} />
                    {t('pbi.cat.ai')}
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "consulting" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("consulting")}
                    aria-pressed={activeFilter === "consulting"}
                  >
                    <FontAwesomeIcon icon={faBriefcase} />
                    {t('services.navTitle')}
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <div className={styles.pbiProducts}>

            {/* Section: Power BI */}
            {showPbi && (
              <div className={`${styles.pbiSectionBlock} reveal`}>
                <div className={styles.pbiSectionTitle}>
                  <h2 dangerouslySetInnerHTML={{__html: t('pbi.title')}}></h2>
                  <p>{t('pbi.desc')}</p>
                </div>

                <div className={styles.pbiGrid}>
                  <div className={`${styles.pbiCard} reveal reveal-delay-1`}>
                    <div className={styles.pbiIcon}><FontAwesomeIcon icon={faGaugeHigh} /></div>
                    <h3>{t('pbi.p1.title')}</h3>
                    <p>{t('pbi.p1.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p1.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={`${styles.pbiCard} reveal reveal-delay-2`}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconBlue}`}><FontAwesomeIcon icon={faCoins} /></div>
                    <h3>{t('pbi.p2.title')}</h3>
                    <p>{t('pbi.p2.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p2.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={`${styles.pbiCard} reveal reveal-delay-3`}>
                    <div className={styles.pbiIcon}><FontAwesomeIcon icon={faCartShopping} /></div>
                    <h3>{t('pbi.p3.title')}</h3>
                    <p>{t('pbi.p3.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p3.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><FontAwesomeIcon icon={faGears} /></div>
                    <h3>{t('pbi.p4.title')}</h3>
                    <p>{t('pbi.p4.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p4.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><FontAwesomeIcon icon={faMagnifyingGlassChart} /></div>
                    <h3>{t('pbi.p5.title')}</h3>
                    <p>{t('pbi.p5.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p5.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                </div>
              </div>
            )}

            {/* Section: Inteligencia Artificial */}
            {showAi && (
              <div className={`${styles.pbiSectionBlock} reveal`} style={{marginTop: (showPbi) ? '3rem' : '0'}}>
                <div className={styles.pbiSectionTitle}>
                  <h2 dangerouslySetInnerHTML={{ __html: t('pbi.aiTitle') }}></h2>
                  <p>{t('pbi.aiDesc')}</p>
                </div>

                <div className={styles.pbiGrid}>
                  <div className={`${styles.pbiCard} reveal reveal-delay-1`}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconBlue}`}><FontAwesomeIcon icon={faChartLine} /></div>
                    <h3>{t('pbi.p6.title')}</h3>
                    <p>{t('pbi.p6.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p6.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={`${styles.pbiCard} reveal reveal-delay-2`}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><FontAwesomeIcon icon={faRobot} /></div>
                    <h3>{t('pbi.p7.title')}</h3>
                    <p>{t('pbi.p7.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p7.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={`${styles.pbiCard} reveal reveal-delay-3`}>
                    <div className={styles.pbiIcon}><FontAwesomeIcon icon={faMagnifyingGlassChart} /></div>
                    <h3>{t('pbi.p8.title')}</h3>
                    <p>{t('pbi.p8.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p8.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={`${styles.pbiCard} reveal reveal-delay-4`}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconBlue}`}><FontAwesomeIcon icon={faBrain} /></div>
                    <h3>{t('pbi.p9.title')}</h3>
                    <p>{t('pbi.p9.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p9.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                </div>
              </div>
            )}

            {/* Section: Estrategia de Crecimiento */}
            {showConsulting && (
              <div className={`${styles.pbiSectionBlock} reveal`} style={{marginTop: (showPbi || showAi) ? '3rem' : '0'}}>
                <div className={styles.pbiSectionTitle}>
                  <h2 dangerouslySetInnerHTML={{ __html: t('services.title') }}></h2>
                  <p>{t('services.desc')}</p>
                </div>

                <div className={styles.pbiGrid}>
                  <div className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><FontAwesomeIcon icon={faChartLine} /></div>
                    <h3>{t('services.s1.title')}</h3>
                    <p>{t('services.s1.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s1.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><FontAwesomeIcon icon={faHandshake} /></div>
                    <h3>{t('services.s2.title')}</h3>
                    <p>{t('services.s2.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s2.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><FontAwesomeIcon icon={faBullseye} /></div>
                    <h3>{t('services.s3.title')}</h3>
                    <p>{t('services.s3.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s3.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><FontAwesomeIcon icon={faGlobe} /></div>
                    <h3>{t('services.s4.title')}</h3>
                    <p>{t('services.s4.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s4.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><FontAwesomeIcon icon={faLightbulb} /></div>
                    <h3>{t('services.s5.title')}</h3>
                    <p>{t('services.s5.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s5.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                  <div className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><FontAwesomeIcon icon={faBrain} /></div>
                    <h3>{t('services.s6.title')}</h3>
                    <p>{t('services.s6.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s6.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <FontAwesomeIcon icon={faChevronRight} /></Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export default function ServiciosPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }}></div>}>
      <ServiciosContent />
    </Suspense>
  );
}
