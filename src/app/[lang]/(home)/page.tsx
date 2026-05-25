import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import NeuralCanvas from "@/components/NeuralCanvas/NeuralCanvasLoader";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedPath, buildPageAlternates } from "@/i18n/routing";
import Link from "next/link";
import { 
  Gauge, 
  Brain, 
  LineChart, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";
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
              <AutoCarousel className={styles.servicesPreviewGrid}>
                {([
                  { sKey: 'title', section: 'pbi', icon: Gauge, cta: 'pbi.cta', anchor: 'power-bi' },
                  { sKey: 'p6', section: 'pbi', icon: Brain, cta: 'pbi.cta', anchor: 'ia' },
                  { sKey: 's1', section: 'services', icon: LineChart, cta: 'services.cta', anchor: 'estrategia' },
                ] as const).map(({ sKey, section, icon: IconComponent, cta, anchor }, i) => {
                  const titleKey = sKey === 'title' ? `${section}.${sKey}` : `${section}.${sKey}.title`;
                  const descKey = sKey === 'title' ? `${section}.desc` : `${section}.${sKey}.longDesc`;
                  return (
                    <div key={sKey} className={styles.servicePreviewCard}>
                      <div className={styles.servicePreviewIcon}>
                        <IconComponent size={24} />
                      </div>
                      <h3 dangerouslySetInnerHTML={{ 
                        __html: t(titleKey).includes('<span') 
                          ? t(titleKey) 
                          : t(titleKey).split(' ').length > 1 
                            ? t(titleKey).substring(0, t(titleKey).lastIndexOf(' ')) + ' <span class="text-accent">' + t(titleKey).split(' ').pop() + '</span>'
                            : t(titleKey)
                      }}></h3>
                      <p>{t(descKey)}</p>
                      <ul className={styles.servicePreviewBullets}>
                        {sKey === 'title' ? (
                          <>
                            <li><span className={styles.bulletIcon}><CheckCircle2 size={12} /></span>{t('pbi.p1.title')}</li>
                            <li><span className={styles.bulletIcon}><CheckCircle2 size={12} /></span>{t('pbi.p2.title')}</li>
                            <li><span className={styles.bulletIcon}><CheckCircle2 size={12} /></span>{t('pbi.p3.title')}</li>
                          </>
                        ) : (
                          <>
                            <li><span className={styles.bulletIcon}><CheckCircle2 size={12} /></span>{t(`${section}.${sKey}.i1`)}</li>
                            <li><span className={styles.bulletIcon}><CheckCircle2 size={12} /></span>{t(`${section}.${sKey}.i2`)}</li>
                            <li><span className={styles.bulletIcon}><CheckCircle2 size={12} /></span>{t(`${section}.${sKey}.i3`)}</li>
                          </>
                        )}
                      </ul>
                      <Link
                        href={`${getLocalizedPath(lang, "/servicios")}?cat=${sKey === 'title' ? 'pbi' : sKey === 'p6' ? 'ai' : 'consulting'}`}
                        className={styles.servicePreviewAction}
                        title={`${t('popularServices.viewAll')}: ${t(titleKey).replace(/<[^>]*>/g, '')}`}
                      >
                        {t('popularServices.viewAll')} <ArrowRight size={14} style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' }} />
                      </Link>
                    </div>
                  );
                })}
              </AutoCarousel>
            </MotionReveal>
            <div className={styles.popularServicesCta}>
              <Button href={getLocalizedPath(lang, "/servicios")} title={t('popularServices.cta')} variant="primary">{t('popularServices.cta')}</Button>
            </div>
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
