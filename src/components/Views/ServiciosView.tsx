"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/i18n/routing";
import Link from "next/link";
import { 
  Layers, 
  PieChart, 
  Bot, 
  Briefcase,
  Cloud
} from "lucide-react";
import { 
  MotionReveal, 
  MotionStagger, 
  MotionStaggerItem 
} from "@/components/common/MotionReveal";
import styles from "./ServiciosView.module.css";
import ServiceCard, { type ServiceItem } from "./ServiceCard";

const statsTranslations: Record<string, Record<string, string>> = {
  ES: {
    "Tiempo ahorrado": "Tiempo ahorrado",
    "Time-to-value": "Time-to-value",
    "Precisión": "Precisión",
    "Implementación": "Implementación",
    "ROI 18m": "ROI 18m",
    "Setup": "Setup",
    "Reducción costo": "Reducción costo",
    "Despliegue": "Despliegue",
    "Plan completo": "Plan completo",
    "Equipo Echo": "Equipo Echo",
    "Mejora forecast": "Mejora forecast",
    "Producción": "Producción",
    "Tareas auto.": "Tareas auto.",
    "MVP": "MVP",
    "Llamadas": "Llamadas",
    "Horizon": "Horizonte",
    "Entrega": "Entrega",
    "Partners /trim": "Socios /trim",
    "Activación": "Activación",
    "Pipeline": "Pipeline",
    "Arranque": "Arranque",
    "Mercados/yr": "Mercados/año",
    "Plan": "Plan",
    "Idea→MVP": "Idea→MVP",
    "Survival": "Supervivencia",
    "Cadencia": "Cadencia",
    "Cobertura": "Cobertura",
    "sem": "sem",
    "yr": "a",
    "/y": "/a",
    "sectores": "sectores"
  },
  EN: {
    "Tiempo ahorrado": "Time saved",
    "Time-to-value": "Time-to-value",
    "Precisión": "Accuracy",
    "Implementación": "Implementation",
    "ROI 18m": "18m ROI",
    "Setup": "Setup",
    "Reducción costo": "Cost reduction",
    "Despliegue": "Deployment",
    "Plan completo": "Full plan",
    "Equipo Echo": "Echo team",
    "Mejora forecast": "Forecast improvement",
    "Producción": "Production",
    "Tareas auto.": "Auto tasks",
    "MVP": "MVP",
    "Llamadas": "Calls",
    "Horizon": "Horizon",
    "Entrega": "Delivery",
    "Partners /trim": "Partners /qtr",
    "Activación": "Activation",
    "Pipeline": "Pipeline",
    "Arranque": "Start-up",
    "Mercados/yr": "Markets/yr",
    "Plan": "Plan",
    "Idea→MVP": "Idea→MVP",
    "Survival": "Survival",
    "Cadencia": "Cadence",
    "Cobertura": "Coverage",
    "sem": "wks",
    "yr": "yr",
    "/y": "/yr",
    "sectores": "sectors"
  },
  FR: {
    "Tiempo ahorrado": "Temps gagné",
    "Time-to-value": "Time-to-value",
    "Precisión": "Précision",
    "Implementación": "Implémentation",
    "ROI 18m": "ROI 18m",
    "Setup": "Configuration",
    "Reducción costo": "Réduction coût",
    "Despliegue": "Déploiement",
    "Plan completo": "Plan complet",
    "Equipo Echo": "Équipe Echo",
    "Mejora forecast": "Amélioration prévision",
    "Producción": "Production",
    "Tareas auto.": "Tâches auto.",
    "MVP": "MVP",
    "Llamadas": "Appels",
    "Horizon": "Horizon",
    "Entrega": "Livraison",
    "Partners /trim": "Partenaires /trim",
    "Activación": "Activation",
    "Pipeline": "Pipeline",
    "Arranque": "Démarrage",
    "Mercados/yr": "Marchés/an",
    "Plan": "Plan",
    "Idea→MVP": "Idée→MVP",
    "Survival": "Survie",
    "Cadencia": "Cadence",
    "Cobertura": "Couverture",
    "sem": "sem",
    "yr": "an",
    "/y": "/an",
    "sectores": "secteurs"
  },
  PT: {
    "Tiempo ahorrado": "Tempo economizado",
    "Time-to-value": "Time-to-value",
    "Precisión": "Precisão",
    "Implementación": "Implementação",
    "ROI 18m": "ROI 18m",
    "Setup": "Setup",
    "Reducción de costo": "Redução de custo",
    "Despliegue": "Implantação",
    "Plan completo": "Plano completo",
    "Equipo Echo": "Equipe Echo",
    "Mejora forecast": "Melhoria forecast",
    "Producción": "Produção",
    "Tareas auto.": "Tarefas auto.",
    "MVP": "MVP",
    "Llamadas": "Chamadas",
    "Horizon": "Horizonte",
    "Entrega": "Entrega",
    "Partners /trim": "Parceiros /trim",
    "Activación": "Ativação",
    "Pipeline": "Pipeline",
    "Arranque": "Inicialização",
    "Mercados/yr": "Mercados/ano",
    "Plan": "Plano",
    "Idea→MVP": "Ideia→MVP",
    "Survival": "Sobrevivência",
    "Cadencia": "Cadência",
    "Cobertura": "Cobertura",
    "sem": "sem",
    "yr": "ano",
    "/y": "/ano",
    "sectores": "setores"
  }
};

const detailsTranslation: Record<string, string> = {
  ES: "Detalles",
  EN: "Details",
  FR: "Détails",
  PT: "Detalhes"
};

type CategoryFilter = "all" | "pbi" | "consulting" | "ai" | "saas";

function ServiciosContent() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  useEffect(() => {
    const match = window.location.hash.match(/^#cat=(.+)/);
    const catParam = match ? match[1] : null;
    if (catParam === 'pbi' || catParam === 'consulting' || catParam === 'ai' || catParam === 'saas') {
      setActiveFilter(catParam as CategoryFilter);
    }
  }, []);

  const showPbi = activeFilter === "all" || activeFilter === "pbi";
  const showConsulting = activeFilter === "all" || activeFilter === "consulting";
  const showAi = activeFilter === "all" || activeFilter === "ai";
  const showSaas = activeFilter === "all" || activeFilter === "saas";

  const pbiItems: ServiceItem[] = [
    {
      id: "bi-1",
      cat: "bi",
      viz: "bi",
      badge: `BI · 01`,
      title: t('pbi.p1.title'),
      desc: t('pbi.p1.desc'),
      stats: [
        { v: "40", u: "%", k: statsTranslations[lang]?.["Tiempo ahorrado"] || "Tiempo ahorrado" },
        { v: "4", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Time-to-value"] || "Time-to-value" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p1.slug')}`)
    },
    {
      id: "bi-2",
      cat: "bi",
      viz: "bi",
      badge: `BI · 02`,
      title: t('pbi.p2.title'),
      desc: t('pbi.p2.desc'),
      stats: [
        { v: "99.9", u: "%", k: statsTranslations[lang]?.["Precisión"] || "Precisión" },
        { v: "6", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Implementación"] || "Implementación" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p2.slug')}`)
    },
    {
      id: "bi-3",
      cat: "bi",
      viz: "sales",
      badge: `BI · 03`,
      title: t('pbi.p3.title'),
      desc: t('pbi.p3.desc'),
      stats: [
        { v: "3.2", u: "×", k: statsTranslations[lang]?.["ROI 18m"] || "ROI 18m" },
        { v: "5", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Setup"] || "Setup" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p3.slug')}`)
    },
    {
      id: "bi-4",
      cat: "bi",
      viz: "ops",
      badge: `BI · 04`,
      title: t('pbi.p4.title'),
      desc: t('pbi.p4.desc'),
      stats: [
        { v: "22", u: "%", k: statsTranslations[lang]?.["Reducción costo"] || "Reducción costo" },
        { v: "8", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Despliegue"] || "Despliegue" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p4.slug')}`)
    },
    {
      id: "bi-5",
      cat: "bi",
      viz: "data",
      badge: `BI · 05`,
      title: t('pbi.p5.title'),
      desc: t('pbi.p5.desc'),
      stats: [
        { v: "12", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Plan completo"] || "Plan completo" },
        { v: "5", u: "FTE", k: statsTranslations[lang]?.["Equipo Echo"] || "Equipo Echo" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p5.slug')}`)
    }
  ];

  const aiItems: ServiceItem[] = [
    {
      id: "ai-1",
      cat: "ai",
      viz: "ai",
      badge: `${lang === 'EN' || lang === 'FR' ? 'AI' : 'IA'} · 01`,
      title: t('pbi.p6.title'),
      desc: t('pbi.p6.desc'),
      stats: [
        { v: "31", u: "%", k: statsTranslations[lang]?.["Mejora forecast"] || "Mejora forecast" },
        { v: "10", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Producción"] || "Producción" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p6.slug')}`)
    },
    {
      id: "ai-2",
      cat: "ai",
      viz: "agents",
      badge: `${lang === 'EN' || lang === 'FR' ? 'AI' : 'IA'} · 02`,
      title: t('pbi.p7.title'),
      desc: t('pbi.p7.desc'),
      stats: [
        { v: "60", u: "%", k: statsTranslations[lang]?.["Tareas auto."] || "Tareas auto." },
        { v: "8", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["MVP"] || "MVP" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p7.slug')}`)
    },
    {
      id: "ai-3",
      cat: "ai",
      viz: "vision",
      badge: `${lang === 'EN' || lang === 'FR' ? 'AI' : 'IA'} · 03`,
      title: t('pbi.p8.title'),
      desc: t('pbi.p8.desc'),
      stats: [
        { v: "96", u: "%", k: statsTranslations[lang]?.["Precisión"] || "Precisión" },
        { v: "12", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Producción"] || "Producción" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p8.slug')}`)
    },
    {
      id: "ai-4",
      cat: "ai",
      viz: "voice",
      badge: `${lang === 'EN' || lang === 'FR' ? 'AI' : 'IA'} · 04`,
      title: t('pbi.p9.title'),
      desc: t('pbi.p9.desc'),
      stats: [
        { v: "5", u: "K/d", k: statsTranslations[lang]?.["Llamadas"] || "Llamadas" },
        { v: "6", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Setup"] || "Setup" }
      ],
      primaryCta: t('pbi.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('pbi.p9.slug')}`)
    }
  ];

  const growthItems: ServiceItem[] = [
    {
      id: "gr-1",
      cat: "growth",
      viz: "growth",
      badge: `GR · 01`,
      title: t('services.s1.title'),
      desc: t('services.s1.i1'),
      stats: [
        { v: "5", u: statsTranslations[lang]?.["yr"] || "yr", k: statsTranslations[lang]?.["Horizon"] || "Horizon" },
        { v: "4", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Entrega"] || "Entrega" }
      ],
      primaryCta: t('services.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('services.s1.slug')}`)
    },
    {
      id: "gr-2",
      cat: "growth",
      viz: "alliances",
      badge: `GR · 02`,
      title: t('services.s2.title'),
      desc: t('services.s2.i1'),
      stats: [
        { v: "12", u: "+", k: statsTranslations[lang]?.["Partners /trim"] || "Partners /trim" },
        { v: "6", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Activación"] || "Activación" }
      ],
      primaryCta: t('services.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('services.s2.slug')}`)
    },
    {
      id: "gr-3",
      cat: "growth",
      viz: "sales",
      badge: `GR · 03`,
      title: t('services.s3.title'),
      desc: t('services.s3.i1'),
      stats: [
        { v: "2.4", u: "×", k: statsTranslations[lang]?.["Pipeline"] || "Pipeline" },
        { v: "4", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Arranque"] || "Arranque" }
      ],
      primaryCta: t('services.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('services.s3.slug')}`)
    },
    {
      id: "gr-4",
      cat: "growth",
      viz: "global",
      badge: `GR · 04`,
      title: t('services.s4.title'),
      desc: t('services.s4.i1'),
      stats: [
        { v: "3", u: "+", k: statsTranslations[lang]?.["Mercados/yr"] || "Mercados/yr" },
        { v: "10", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Plan"] || "Plan" }
      ],
      primaryCta: t('services.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('services.s4.slug')}`)
    },
    {
      id: "gr-5",
      cat: "growth",
      viz: "product",
      badge: `GR · 05`,
      title: t('services.s5.title'),
      desc: t('services.s5.i1'),
      stats: [
        { v: "6", u: statsTranslations[lang]?.["sem"] || "sem", k: statsTranslations[lang]?.["Idea→MVP"] || "Idea→MVP" },
        { v: "82", u: "%", k: statsTranslations[lang]?.["Survival"] || "Survival" }
      ],
      primaryCta: t('services.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('services.s5.slug')}`)
    },
    {
      id: "gr-6",
      cat: "growth",
      viz: "radar",
      badge: `GR · 06`,
      title: t('services.s6.title'),
      desc: t('services.s6.i1'),
      stats: [
        { v: "Q", u: statsTranslations[lang]?.["/y"] || "/y", k: statsTranslations[lang]?.["Cadencia"] || "Cadencia" },
        { v: "4", u: statsTranslations[lang]?.["sectores"] || "sectores", k: statsTranslations[lang]?.["Cobertura"] || "Cobertura" }
      ],
      primaryCta: t('services.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('services.s6.slug')}`)
    }
  ];

  const saasItems: ServiceItem[] = [
    {
      id: "saas-platform",
      cat: "saas",
      viz: "global",
      badge: `SaaS · 01`,
      title: t('saas.platform.title'),
      desc: t('saas.platform.longDesc'),
      stats: [
        { v: "24", u: "h", k: statsTranslations[lang]?.["Despliegue"] || "Despliegue" },
        { v: "120", u: "ms", k: statsTranslations[lang]?.["Time-to-value"] || "Time-to-value" }
      ],
      primaryCta: t('saas.cta'),
      secondaryCta: detailsTranslation[lang] || "Detalles",
      primaryCtaUrl: getLocalizedPath(lang, '/contacto'),
      secondaryCtaUrl: getLocalizedPath(lang, `/servicios/${t('saas.platform.slug')}`)
    }
  ];

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
                    BI
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
                <li>
                  <button
                    className={`${styles.pbiCatItem} ${activeFilter === "saas" ? styles.pbiCatItemActive : ""}`}
                    onClick={() => setActiveFilter("saas")}
                    aria-pressed={activeFilter === "saas"}
                  >
                    <Cloud size={16} />
                    {t('saas.navTitle')}
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
                  {pbiItems.map((item) => (
                    <MotionStaggerItem key={item.id} style={{ height: "100%" }}>
                      <ServiceCard item={item} />
                    </MotionStaggerItem>
                  ))}
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
                  {aiItems.map((item) => (
                    <MotionStaggerItem key={item.id} style={{ height: "100%" }}>
                      <ServiceCard item={item} />
                    </MotionStaggerItem>
                  ))}
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
                  {growthItems.map((item) => (
                    <MotionStaggerItem key={item.id} style={{ height: "100%" }}>
                      <ServiceCard item={item} />
                    </MotionStaggerItem>
                  ))}
                </MotionStagger>
              </div>
            )}

            {/* Section: SaaS */}
            {showSaas && (
              <div className={styles.pbiSectionBlock} style={{marginTop: (showPbi || showAi || showConsulting) ? '3rem' : '0'}}>
                <MotionReveal>
                  <div className={styles.pbiSectionTitle}>
                    <h2 dangerouslySetInnerHTML={{ __html: t('saas.title') }}></h2>
                    <p>{t('saas.desc')}</p>
                  </div>
                </MotionReveal>

                <MotionStagger className={styles.pbiGrid}>
                  {saasItems.map((item) => (
                    <MotionStaggerItem key={item.id} style={{ height: "100%" }}>
                      <ServiceCard item={item} />
                    </MotionStaggerItem>
                  ))}
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
