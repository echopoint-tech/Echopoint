import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import NeuralCanvas from "@/components/NeuralCanvas/NeuralCanvasLoader";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedPath } from "@/i18n/routing";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowRight,
  faChartLine,
  faBullseye,
  faLightbulb,
  faGaugeHigh,
  faCartShopping,
  faBrain
} from "@fortawesome/free-solid-svg-icons";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import SectionSnap from "@/components/SectionSnap/SectionSnap";
import Button from "@/components/common/Button/Button";
import AutoCarousel from "@/components/AutoCarousel/AutoCarousel";


import { createTranslator } from "@/lib/translator";
import styles from "./Home.module.css";

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
            <div className="section-header reveal" style={{ marginBottom: '0' }}>
              <span className="subtitle">{t('popularServices.subtitle')}</span>
              <h2>{t('popularServices.title')}</h2>
            </div>
            <AutoCarousel className={styles.servicesPreviewGrid}>
              {([
                { sKey: 'title', section: 'pbi', icon: faGaugeHigh, cta: 'pbi.cta', anchor: 'power-bi' },
                { sKey: 'p6', section: 'pbi', icon: faBrain, cta: 'pbi.cta', anchor: 'ia' },
                { sKey: 's1', section: 'services', icon: faChartLine, cta: 'services.cta', anchor: 'estrategia' },
              ] as const).map(({ sKey, section, icon, cta, anchor }, i) => {
                const titleKey = sKey === 'title' ? `${section}.${sKey}` : `${section}.${sKey}.title`;
                const descKey = sKey === 'title' ? `${section}.desc` : `${section}.${sKey}.longDesc`;
                return (
                  <div key={sKey} className={`${styles.servicePreviewCard} reveal reveal-delay-${i + 1}`}>
                    <div className={styles.servicePreviewIcon}>
                      <FontAwesomeIcon icon={icon} />
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
                          <li><span className={styles.bulletIcon}><FontAwesomeIcon icon={faCheckCircle} /></span>{t('pbi.p1.title')}</li>
                          <li><span className={styles.bulletIcon}><FontAwesomeIcon icon={faCheckCircle} /></span>{t('pbi.p2.title')}</li>
                          <li><span className={styles.bulletIcon}><FontAwesomeIcon icon={faCheckCircle} /></span>{t('pbi.p3.title')}</li>
                        </>
                      ) : (
                        <>
                          <li><span className={styles.bulletIcon}><FontAwesomeIcon icon={faCheckCircle} /></span>{t(`${section}.${sKey}.i1`)}</li>
                          <li><span className={styles.bulletIcon}><FontAwesomeIcon icon={faCheckCircle} /></span>{t(`${section}.${sKey}.i2`)}</li>
                          <li><span className={styles.bulletIcon}><FontAwesomeIcon icon={faCheckCircle} /></span>{t(`${section}.${sKey}.i3`)}</li>
                        </>
                      )}
                    </ul>
                    <Link 
                      href={`${getLocalizedPath(lang, "/servicios")}?cat=${sKey === 'title' ? 'pbi' : sKey === 'p6' ? 'ai' : 'consulting'}`}
                      className={styles.servicePreviewAction}
                    >
                      {t('popularServices.viewAll')} <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                );
              })}
            </AutoCarousel>
            <div className={styles.popularServicesCta}>
              <Button href={getLocalizedPath(lang, "/servicios")} title={t('popularServices.cta')} variant="primary">{t('popularServices.cta')}</Button>
            </div>
          </div>
        </section>

        {/* Video Manifiesto Section */}
        <section className={`section ${styles.manifestoSection} reveal`}>
          <div className="container">
            <div className={styles.manifestoWrapper}>
              <div className="manifesto-content reveal reveal-delay-1">
                <span className="subtitle">{t('manifesto.subtitle')}</span>
                <h2 dangerouslySetInnerHTML={{__html: t('manifesto.title')}}></h2>
                <p>{t('manifesto.desc')}</p>
                <p className="legal-note" style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '-1rem', marginBottom: '2rem'}}>{t('manifesto.legal')}</p>
              </div>
              <div className={`${styles.manifestoImageContainer} reveal reveal-delay-2`}>
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  alt="Visualización de datos e inteligencia artificial impulsando el crecimiento empresarial"
                  title="Visualización de datos e inteligencia artificial impulsando el crecimiento empresarial"
                  className={styles.responsiveImage}
                  width={1470}
                  height={827}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
              </div>
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
