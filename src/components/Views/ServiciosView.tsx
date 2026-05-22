"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/i18n/routing";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Layers, 
  PieChart, 
  Bot, 
  Briefcase, 
  Gauge, 
  Coins, 
  ShoppingCart, 
  Settings, 
  TrendingUp, 
  LineChart, 
  Handshake, 
  Target, 
  Globe, 
  Lightbulb, 
  Brain,
  ChevronRight
} from "lucide-react";
import { 
  MotionReveal, 
  MotionStagger, 
  MotionStaggerItem 
} from "@/components/common/MotionReveal";
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


  return (
    <>
      <AnimationObserver />
      <Navbar />

      {/* ── Hero Banner ── */}
      <MotionReveal className={styles.svcHero} yOffset={16} duration={1}>
        <h1>{t('services.heroTitle')}</h1>
        <div className={styles.svcHeroLine}></div>
      </MotionReveal>

      <main id="main-content" className="container section" style={{ paddingTop: "0" }}>

        {/* ── Catalog: Sidebar + Products ── */}
        <div className={styles.pbiCatalog}>

          <aside className={styles.pbiSidebar}>
            <MotionReveal>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>{t('services.filterTitle') || 'Categorías'}</h2>
            </MotionReveal>
            <nav aria-label="Filtrar servicios">
              <ul className={styles.pbiCatList} role="list">
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "all" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("all")}
                    aria-pressed={activeFilter === "all"}
                  >
                    <Layers size={16} />
                    {t('pbi.cat.all')}
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "pbi" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("pbi")}
                    aria-pressed={activeFilter === "pbi"}
                  >
                    <PieChart size={16} />
                    Power BI
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "ai" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("ai")}
                    aria-pressed={activeFilter === "ai"}
                  >
                    <Bot size={16} />
                    {t('pbi.cat.ai')}
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "consulting" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("consulting")}
                    aria-pressed={activeFilter === "consulting"}
                  >
                    <Briefcase size={16} />
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
              <div className={styles.pbiSectionBlock}>
                <MotionReveal>
                  <div className={styles.pbiSectionTitle}>
                    <h2 dangerouslySetInnerHTML={{__html: t('pbi.title')}}></h2>
                    <p>{t('pbi.desc')}</p>
                  </div>
                </MotionReveal>

                <MotionStagger className={styles.pbiGrid}>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><Gauge size={20} /></div>
                    <h3>{t('pbi.p1.title')}</h3>
                    <p>{t('pbi.p1.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p1.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconBlue}`}><Coins size={20} /></div>
                    <h3>{t('pbi.p2.title')}</h3>
                    <p>{t('pbi.p2.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p2.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><ShoppingCart size={20} /></div>
                    <h3>{t('pbi.p3.title')}</h3>
                    <p>{t('pbi.p3.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p3.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><Settings size={20} /></div>
                    <h3>{t('pbi.p4.title')}</h3>
                    <p>{t('pbi.p4.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p4.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><TrendingUp size={20} /></div>
                    <h3>{t('pbi.p5.title')}</h3>
                    <p>{t('pbi.p5.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p5.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                </MotionStagger>
              </div>
            )}

            {/* Section: Inteligencia Artificial */}
            {showAi && (
              <div className={styles.pbiSectionBlock} style={{marginTop: (showPbi) ? '3rem' : '0'}}>
                <MotionReveal>
                  <div className={styles.pbiSectionTitle}>
                    <h2 dangerouslySetInnerHTML={{ __html: t('pbi.aiTitle') }}></h2>
                    <p>{t('pbi.aiDesc')}</p>
                  </div>
                </MotionReveal>

                <MotionStagger className={styles.pbiGrid}>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconBlue}`}><LineChart size={20} /></div>
                    <h3>{t('pbi.p6.title')}</h3>
                    <p>{t('pbi.p6.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p6.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><Bot size={20} /></div>
                    <h3>{t('pbi.p7.title')}</h3>
                    <p>{t('pbi.p7.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p7.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><TrendingUp size={20} /></div>
                    <h3>{t('pbi.p8.title')}</h3>
                    <p>{t('pbi.p8.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p8.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconBlue}`}><Brain size={20} /></div>
                    <h3>{t('pbi.p9.title')}</h3>
                    <p>{t('pbi.p9.desc')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('pbi.p9.slug')}`)} className={styles.pbiCta}>{t('pbi.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                </MotionStagger>
              </div>
            )}

            {/* Section: Estrategia de Crecimiento */}
            {showConsulting && (
              <div className={styles.pbiSectionBlock} style={{marginTop: (showPbi || showAi) ? '3rem' : '0'}}>
                <MotionReveal>
                  <div className={styles.pbiSectionTitle}>
                    <h2 dangerouslySetInnerHTML={{ __html: t('services.title') }}></h2>
                    <p>{t('services.desc')}</p>
                  </div>
                </MotionReveal>

                <MotionStagger className={styles.pbiGrid}>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><LineChart size={20} /></div>
                    <h3>{t('services.s1.title')}</h3>
                    <p>{t('services.s1.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s1.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><Handshake size={20} /></div>
                    <h3>{t('services.s2.title')}</h3>
                    <p>{t('services.s2.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s2.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><Target size={20} /></div>
                    <h3>{t('services.s3.title')}</h3>
                    <p>{t('services.s3.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s3.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><Globe size={20} /></div>
                    <h3>{t('services.s4.title')}</h3>
                    <p>{t('services.s4.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s4.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={styles.pbiIcon}><Lightbulb size={20} /></div>
                    <h3>{t('services.s5.title')}</h3>
                    <p>{t('services.s5.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s5.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                  <MotionStaggerItem className={styles.pbiCard}>
                    <div className={`${styles.pbiIcon} ${styles.pbiIconAmber}`}><Brain size={20} /></div>
                    <h3>{t('services.s6.title')}</h3>
                    <p>{t('services.s6.i1')}</p>
                    <Link href={getLocalizedPath(lang, `/servicios/${t('services.s6.slug')}`)} className={styles.pbiCta}>{t('services.cta')} <ChevronRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }} /></Link>
                  </MotionStaggerItem>
                </MotionStagger>
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
