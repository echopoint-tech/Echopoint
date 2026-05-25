import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import NeuralCanvas from "@/components/NeuralCanvas/NeuralCanvasLoader";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedPath, buildPageAlternates } from "@/i18n/routing";
import Link from "next/link";
import { MotionReveal } from "@/components/common/MotionReveal";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import SectionSnap from "@/components/SectionSnap/SectionSnap";
import Button from "@/components/common/Button/Button";
import AutoCarousel from "@/components/AutoCarousel/AutoCarousel";


import { createTranslator } from "@/lib/translator";
import styles from "./Home.module.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://echopoint-intsolutions.com';
  return {
    alternates: {
      canonical: `${baseUrl}${getLocalizedPath(lang, '/')}`,
      languages: buildPageAlternates(baseUrl, '/'),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang.toLowerCase();
  const dictionary = getDictionary(locale);
  const t = createTranslator(dictionary);

  return (
    <>
      <AnimationObserver />
      <SectionSnap />
      <Navbar />

      <main id="main-content">
        {/* Hero Section */}
        <section id="inicio" className={styles.heroSection}>
          <NeuralCanvas />
          <div className={styles.heroOverlay}></div>
          
          <div className={`container ${styles.heroContainer}`}>
            <div className={`${styles.heroContent} hero-intro`}>
              <span className="subtitle">{t('hero.subtitle')}</span>
              <h1 dangerouslySetInnerHTML={{__html: t('hero.title')}}></h1>
              <p>{t('hero.desc')}</p>
              <div className={`${styles.heroActions} hero-actions`}>
                <Button href={getLocalizedPath(lang, "/servicios")} variant="primary">{t('hero.btn.discover')}</Button>
                <Button href={getLocalizedPath(lang, "/contacto")} variant="secondary">{t('hero.btn.demo')}</Button>
              </div>
            </div>
          </div>

          <div className={`${styles.heroTrustStrip} hero-trust-strip`}>
            <p className={styles.trustText}>{t('trust')}</p>
            <div className={styles.logoGrid}>
              <div className={styles.partnerLogo}>Google</div>
              <div className={styles.partnerLogo}>Microsoft</div>
              <div className={styles.partnerLogo}>Amazon</div>
              <div className={styles.partnerLogo}>Meta</div>
              <div className={styles.partnerLogo}>Salesforce</div>
            </div>
          </div>

        </section>

        {/* Popular Services Section */}
        <section id="popular-services" className={`section ${styles.popularServicesSection}`}>
          <div className="container">
            <MotionReveal className="section-header" style={{ marginBottom: '0' }}>
              <span className="subtitle">{t('popularServices.subtitle')}</span>
              <h2>{t('popularServices.title')}</h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <AutoCarousel>

                {/* Slide 1 — Business Intelligence */}
                <article className={styles.diagCard}>
                  <div className={styles.diagCardLeft}>
                    <div className={styles.diagCardIndex}>
                      <span className={styles.diagCardNum}>01</span>
                      <span className={styles.diagCardBar}></span>
                      <span>Business Intelligence</span>
                    </div>
                    <h2
                      className={styles.diagCardTitle}
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const raw = t('pbi.title');
                          if (raw.includes('<span')) return raw;
                          const parts = raw.split(' ');
                          return parts.length > 1
                            ? parts.slice(0, -1).join(' ') + ' <span class="text-accent">' + parts[parts.length - 1] + '</span>'
                            : raw;
                        })()
                      }}
                    />
                    <p className={styles.diagCardDesc}>{t('pbi.desc')}</p>
                    <div className={styles.diagRule}></div>
                    <ul className={styles.diagBullets}>
                      <li>{t('pbi.p1.title')}</li>
                      <li>{t('pbi.p2.title')}</li>
                      <li>{t('pbi.p3.title')}</li>
                    </ul>
                    <Link href={`${getLocalizedPath(lang, '/servicios')}?cat=pbi`} className={styles.diagInnerCta}>
                      {t('popularServices.viewAll')}
                      <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="8" x2="22" y2="8" /><polyline points="16 2 22 8 16 14" />
                      </svg>
                    </Link>
                  </div>
                  <div className={styles.diagCardRight}>
                    <div className={styles.diagKpi}>
                      <div className={styles.diagKpiNum}>38<small>%</small></div>
                      <div className={styles.diagKpiRule}></div>
                      <div className={styles.diagKpiLabel}>Decisiones más rápidas</div>
                    </div>
                    <div className={styles.diagMask}></div>
                    <div className={styles.diagVisual}>
                      <svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="20" y="20" width="340" height="280" stroke="#1d2532" strokeWidth="1" fill="none" />
                        <text x="36" y="48" fontFamily="Sora,sans-serif" fontSize="9" fill="#e7ebf1" fontWeight="500" letterSpacing="1">Performance · Q3</text>
                        <text x="36" y="62" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">REVENUE / USERS / CONVERSION</text>
                        <line x1="20" y1="76" x2="360" y2="76" stroke="#1d2532" strokeWidth="1" />
                        <text x="36" y="100" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">REVENUE</text>
                        <text x="36" y="122" fontFamily="Sora,sans-serif" fontSize="22" fontWeight="600" fill="#e7ebf1">$2.4M</text>
                        <line x1="148" y1="86" x2="148" y2="138" stroke="#1d2532" strokeWidth="1" />
                        <text x="160" y="100" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">USERS</text>
                        <text x="160" y="122" fontFamily="Sora,sans-serif" fontSize="22" fontWeight="600" fill="#4eaac0">14.2k</text>
                        <line x1="252" y1="86" x2="252" y2="138" stroke="#1d2532" strokeWidth="1" />
                        <text x="264" y="100" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">CONV.</text>
                        <text x="264" y="122" fontFamily="Sora,sans-serif" fontSize="22" fontWeight="600" fill="#e7ebf1">38%</text>
                        <line x1="20" y1="148" x2="360" y2="148" stroke="#1d2532" strokeWidth="1" />
                        <line x1="40" y1="180" x2="340" y2="180" stroke="#1d2532" strokeWidth="1" strokeDasharray="2 4" />
                        <line x1="40" y1="220" x2="340" y2="220" stroke="#1d2532" strokeWidth="1" strokeDasharray="2 4" />
                        <line x1="40" y1="260" x2="340" y2="260" stroke="#1d2532" strokeWidth="1" strokeDasharray="2 4" />
                        <text x="32" y="183" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="end">300</text>
                        <text x="32" y="223" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="end">200</text>
                        <text x="32" y="263" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="end">100</text>
                        <path d="M50 250 L80 235 L112 240 L146 215 L180 220 L214 195 L250 200 L284 175 L320 180 L340 165" stroke="#2c384a" strokeWidth="1.3" fill="none" />
                        <path d="M284 175 L320 180 L340 165" stroke="#4eaac0" strokeWidth="1.6" fill="none" />
                        <circle cx="340" cy="165" r="3.5" fill="#4eaac0" />
                        <circle cx="340" cy="165" r="7" fill="none" stroke="#4eaac0" strokeWidth=".8" opacity=".55" />
                        <line x1="340" y1="160" x2="340" y2="148" stroke="#4eaac0" strokeWidth=".6" />
                        <text x="340" y="142" fontFamily="Sora,sans-serif" fontSize="9" fontWeight="500" fill="#4eaac0" letterSpacing="1.5" textAnchor="end">PEAK</text>
                        <line x1="20" y1="280" x2="360" y2="280" stroke="#1d2532" strokeWidth="1" />
                        {(['L','M','X','J','V','S','D','L','M'] as const).map((d, i) => (
                          <text key={i} x={[50,84,116,150,184,216,250,284,318][i]} y="294" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="middle">{d}</text>
                        ))}
                      </svg>
                    </div>
                  </div>
                </article>

                {/* Slide 2 — Inteligencia Artificial */}
                <article className={styles.diagCard}>
                  <div className={styles.diagCardLeft}>
                    <div className={styles.diagCardIndex}>
                      <span className={styles.diagCardNum}>02</span>
                      <span className={styles.diagCardBar}></span>
                      <span>Machine Learning</span>
                    </div>
                    <h2
                      className={styles.diagCardTitle}
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const raw = t('pbi.p6.title');
                          if (raw.includes('<span')) return raw;
                          const parts = raw.split(' ');
                          return parts.length > 1
                            ? parts.slice(0, -1).join(' ') + ' <span class="text-accent">' + parts[parts.length - 1] + '</span>'
                            : raw;
                        })()
                      }}
                    />
                    <p className={styles.diagCardDesc}>{t('pbi.p6.longDesc')}</p>
                    <div className={styles.diagRule}></div>
                    <ul className={styles.diagBullets}>
                      <li>{t('pbi.p6.i1')}</li>
                      <li>{t('pbi.p6.i2')}</li>
                      <li>{t('pbi.p6.i3')}</li>
                    </ul>
                    <Link href={`${getLocalizedPath(lang, '/servicios')}?cat=ai`} className={styles.diagInnerCta}>
                      {t('popularServices.viewAll')}
                      <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="8" x2="22" y2="8" /><polyline points="16 2 22 8 16 14" />
                      </svg>
                    </Link>
                  </div>
                  <div className={styles.diagCardRight}>
                    <div className={styles.diagKpi}>
                      <div className={styles.diagKpiNum}>92<small>%</small></div>
                      <div className={styles.diagKpiRule}></div>
                      <div className={styles.diagKpiLabel}>Precisión predictiva</div>
                    </div>
                    <div className={styles.diagMask}></div>
                    <div className={styles.diagVisual}>
                      <svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="20" y="20" width="340" height="280" stroke="#1d2532" strokeWidth="1" fill="none" />
                        <text x="36" y="48" fontFamily="Sora,sans-serif" fontSize="9" fill="#e7ebf1" fontWeight="500" letterSpacing="1">forecast_v2.4</text>
                        <text x="36" y="62" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">3-LAYER NETWORK · TRAINED 14h 22m</text>
                        <line x1="20" y1="76" x2="360" y2="76" stroke="#1d2532" strokeWidth="1" />
                        <text x="68" y="100" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">INPUT</text>
                        <text x="156" y="100" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">HIDDEN</text>
                        <text x="246" y="100" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">HIDDEN</text>
                        <text x="320" y="100" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">OUTPUT</text>
                        <g stroke="#1d2532" strokeWidth=".7" fill="none">
                          <line x1="80" y1="140" x2="170" y2="130" /><line x1="80" y1="140" x2="170" y2="180" /><line x1="80" y1="140" x2="170" y2="230" />
                          <line x1="80" y1="200" x2="170" y2="130" /><line x1="80" y1="200" x2="170" y2="230" /><line x1="80" y1="200" x2="170" y2="260" />
                          <line x1="80" y1="260" x2="170" y2="180" /><line x1="80" y1="260" x2="170" y2="230" /><line x1="80" y1="260" x2="170" y2="260" />
                          <line x1="170" y1="130" x2="260" y2="150" /><line x1="170" y1="130" x2="260" y2="210" />
                          <line x1="170" y1="180" x2="260" y2="150" /><line x1="170" y1="180" x2="260" y2="210" /><line x1="170" y1="180" x2="260" y2="260" />
                          <line x1="170" y1="230" x2="260" y2="210" /><line x1="170" y1="230" x2="260" y2="260" />
                          <line x1="170" y1="260" x2="260" y2="260" />
                          <line x1="260" y1="150" x2="330" y2="200" /><line x1="260" y1="210" x2="330" y2="200" /><line x1="260" y1="260" x2="330" y2="200" />
                        </g>
                        <g stroke="#4eaac0" strokeWidth="1.4" fill="none">
                          <line x1="80" y1="200" x2="170" y2="180" />
                          <line x1="170" y1="180" x2="260" y2="210" />
                          <line x1="260" y1="210" x2="330" y2="200" />
                        </g>
                        <circle cx="80" cy="140" r="6" fill="#0b0f15" stroke="#2c384a" strokeWidth="1.2" />
                        <circle cx="80" cy="200" r="6" fill="#0b0f15" stroke="#4eaac0" strokeWidth="1.5" />
                        <circle cx="80" cy="260" r="6" fill="#0b0f15" stroke="#2c384a" strokeWidth="1.2" />
                        <circle cx="170" cy="130" r="6" fill="#0b0f15" stroke="#2c384a" strokeWidth="1.2" />
                        <circle cx="170" cy="180" r="6" fill="#0b0f15" stroke="#4eaac0" strokeWidth="1.5" />
                        <circle cx="170" cy="230" r="6" fill="#0b0f15" stroke="#2c384a" strokeWidth="1.2" />
                        <circle cx="170" cy="260" r="6" fill="#0b0f15" stroke="#2c384a" strokeWidth="1.2" />
                        <circle cx="260" cy="150" r="6" fill="#0b0f15" stroke="#2c384a" strokeWidth="1.2" />
                        <circle cx="260" cy="210" r="6" fill="#0b0f15" stroke="#4eaac0" strokeWidth="1.5" />
                        <circle cx="260" cy="260" r="6" fill="#0b0f15" stroke="#2c384a" strokeWidth="1.2" />
                        <circle cx="330" cy="200" r="8" fill="#0b0f15" stroke="#4eaac0" strokeWidth="1.6" />
                        <circle cx="330" cy="200" r="2.5" fill="#4eaac0" />
                        <line x1="20" y1="280" x2="360" y2="280" stroke="#1d2532" strokeWidth="1" />
                        <text x="36" y="296" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">accuracy</text>
                        <text x="92" y="296" fontFamily="Sora,sans-serif" fontSize="9" fill="#e7ebf1" fontWeight="500" letterSpacing="1">0.924</text>
                        <text x="150" y="296" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">loss</text>
                        <text x="180" y="296" fontFamily="Sora,sans-serif" fontSize="9" fill="#e7ebf1" fontWeight="500" letterSpacing="1">0.018</text>
                        <text x="232" y="296" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">epoch</text>
                        <text x="270" y="296" fontFamily="Sora,sans-serif" fontSize="9" fill="#e7ebf1" fontWeight="500" letterSpacing="1">142 / 150</text>
                      </svg>
                    </div>
                  </div>
                </article>

                {/* Slide 3 — Growth Strategy */}
                <article className={styles.diagCard}>
                  <div className={styles.diagCardLeft}>
                    <div className={styles.diagCardIndex}>
                      <span className={styles.diagCardNum}>03</span>
                      <span className={styles.diagCardBar}></span>
                      <span>Growth Strategy</span>
                    </div>
                    <h2
                      className={styles.diagCardTitle}
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const raw = t('services.s1.title');
                          if (raw.includes('<span')) return raw;
                          const parts = raw.split(' ');
                          return parts.length > 1
                            ? parts.slice(0, -1).join(' ') + ' <span class="text-accent">' + parts[parts.length - 1] + '</span>'
                            : raw;
                        })()
                      }}
                    />
                    <p className={styles.diagCardDesc}>{t('services.s1.longDesc')}</p>
                    <div className={styles.diagRule}></div>
                    <ul className={styles.diagBullets}>
                      <li>{t('services.s1.i1')}</li>
                      <li>{t('services.s1.i2')}</li>
                      <li>{t('services.s1.i3')}</li>
                    </ul>
                    <Link href={`${getLocalizedPath(lang, '/servicios')}?cat=consulting`} className={styles.diagInnerCta}>
                      {t('popularServices.viewAll')}
                      <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="8" x2="22" y2="8" /><polyline points="16 2 22 8 16 14" />
                      </svg>
                    </Link>
                  </div>
                  <div className={styles.diagCardRight}>
                    <div className={styles.diagKpi}>
                      <div className={styles.diagKpiNum}>2.4<small>×</small></div>
                      <div className={styles.diagKpiRule}></div>
                      <div className={styles.diagKpiLabel}>ROI promedio</div>
                    </div>
                    <div className={styles.diagMask}></div>
                    <div className={styles.diagVisual}>
                      <svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="20" y="20" width="340" height="280" stroke="#1d2532" strokeWidth="1" fill="none" />
                        <text x="36" y="48" fontFamily="Sora,sans-serif" fontSize="9" fill="#e7ebf1" fontWeight="500" letterSpacing="1">Proyección 2024 — 2028</text>
                        <text x="36" y="62" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">REVENUE FORECAST</text>
                        <line x1="20" y1="76" x2="360" y2="76" stroke="#1d2532" strokeWidth="1" />
                        <line x1="218" y1="94" x2="232" y2="94" stroke="#2c384a" strokeWidth="1.3" />
                        <text x="236" y="98" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">REAL</text>
                        <line x1="278" y1="94" x2="292" y2="94" stroke="#4eaac0" strokeWidth="1.3" strokeDasharray="3 3" />
                        <text x="296" y="98" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1">PROY.</text>
                        <line x1="40" y1="130" x2="340" y2="130" stroke="#1d2532" strokeWidth="1" strokeDasharray="2 4" />
                        <line x1="40" y1="180" x2="340" y2="180" stroke="#1d2532" strokeWidth="1" strokeDasharray="2 4" />
                        <line x1="40" y1="230" x2="340" y2="230" stroke="#1d2532" strokeWidth="1" strokeDasharray="2 4" />
                        <text x="32" y="133" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="end">$5M</text>
                        <text x="32" y="183" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="end">$3M</text>
                        <text x="32" y="233" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="end">$1M</text>
                        <path d="M52 250 L114 234 L176 210 L238 180" stroke="#2c384a" strokeWidth="1.5" fill="none" />
                        <path d="M238 180 L298 140 L334 108" stroke="#4eaac0" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                        <circle cx="52" cy="250" r="3.5" fill="#0b0f15" stroke="#44516a" strokeWidth="1.2" />
                        <circle cx="114" cy="234" r="3.5" fill="#0b0f15" stroke="#44516a" strokeWidth="1.2" />
                        <circle cx="176" cy="210" r="3.5" fill="#0b0f15" stroke="#44516a" strokeWidth="1.2" />
                        <circle cx="238" cy="180" r="4" fill="#4eaac0" />
                        <circle cx="238" cy="180" r="8" fill="none" stroke="#4eaac0" strokeWidth=".7" opacity=".5" />
                        <circle cx="298" cy="140" r="3.5" fill="#0b0f15" stroke="#4eaac0" strokeWidth="1.2" />
                        <circle cx="334" cy="108" r="3.5" fill="#0b0f15" stroke="#4eaac0" strokeWidth="1.2" />
                        <line x1="334" y1="100" x2="334" y2="88" stroke="#4eaac0" strokeWidth=".6" />
                        <text x="334" y="84" fontFamily="Sora,sans-serif" fontSize="11" fontWeight="500" fill="#4eaac0" textAnchor="end">$5.2M</text>
                        <line x1="238" y1="100" x2="238" y2="180" stroke="#4eaac0" strokeWidth=".6" strokeDasharray="2 3" opacity=".7" />
                        <text x="238" y="95" fontFamily="Sora,sans-serif" fontSize="9" fontWeight="500" fill="#4eaac0" letterSpacing="1.5" textAnchor="middle">HOY</text>
                        <line x1="20" y1="270" x2="360" y2="270" stroke="#1d2532" strokeWidth="1" />
                        {(['2024','2025','2026','2027','2028'] as const).map((yr, i) => (
                          <text key={yr} x={[52,114,176,238,298][i]} y="288" fontFamily="Sora,sans-serif" fontSize="9" fill="#525c6d" letterSpacing="1" textAnchor="middle">{yr}</text>
                        ))}
                      </svg>
                    </div>
                  </div>
                </article>

              </AutoCarousel>
            </MotionReveal>

          </div>
        </section>

        {/* Video Manifiesto Section */}
        <section className={`section ${styles.manifestoSection}`}>
          <div className="container">
            <div className={styles.manifestoWrapper}>
              <MotionReveal className="manifesto-content" yOffset={20}>
                <span className="subtitle">{t('manifesto.subtitle')}</span>
                <h2 dangerouslySetInnerHTML={{__html: t('manifesto.title')}}></h2>
                <p>{t('manifesto.desc')}</p>
                <p className="legal-note" style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '-1rem', marginBottom: '2rem'}}>{t('manifesto.legal')}</p>
              </MotionReveal>
              <MotionReveal delay={0.15} className={styles.manifestoImageContainer} yOffset={20}>
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet="/photo-1551288049-bebda4e38f71-400.webp"
                    type="image/webp"
                    width={400}
                    height={226}
                  />
                  <img
                    src="/photo-1551288049-bebda4e38f71.webp"
                    alt="Visualización de datos e inteligencia artificial impulsando el crecimiento empresarial"
                    title="Visualización de datos e inteligencia artificial impulsando el crecimiento empresarial"
                    className={styles.responsiveImage}
                    width={800}
                    height={451}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </MotionReveal>
            </div>
          </div>
        </section>


        <div id="footer-group" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', scrollMarginTop: '70px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100dvh - 70px)', justifyContent: 'center' }}>
          {/* Lead Magnet CTA */}
          <LeadMagnetForm
            title={t('magnet.title')}
            description={t('magnet.desc')}
            placeholder={t('magnet.placeholder')}
            submitLabel={t('magnet.btn')}
            successMessage={t('magnet.success')}
            errorMessage={t('magnet.error')}
          />
          <Footer />
        </div>
      </main>
    </>
  );
}
