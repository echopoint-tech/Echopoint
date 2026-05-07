"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBagShopping,
  faBoltLightning,
  faChartLine,
  faChessKnight,
  faCircleCheck,
  faDatabase,
  faEarthAmericas,
  faGears,
  faHandshake,
  faLightbulb,
  faMagnifyingGlassChart,
  faMicrochip,
  faMobileScreenButton,
  faMoneyBillTrendUp,
  faRocket,
  faShieldHalved,
  faVial,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/common/Button/Button";


import { useLanguage } from "@/context/LanguageContext";

import { dictionaries } from "@/i18n/dictionaries";
import styles from "./ServiceDetail.module.css";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();

  // Find the service by slug in both 'services' and 'pbi' dictionary sections
  const servicesData = dictionaries[lang].services;
  const pbiData = dictionaries[lang].pbi;
  
  let service: any = Object.values(servicesData).find((s: any) => s && typeof s === 'object' && s.slug === slug);
  if (!service) {
    service = Object.values(pbiData).find((p: any) => p && typeof p === 'object' && p.slug === slug);
  }

  if (!service) {
    return (
      <div className="container" style={{paddingTop: '10rem', textAlign: 'center'}}>
        <h1>404 - Servicio no encontrado</h1>
        <Button href="/servicios" title="Volver a servicios" variant="primary">Volver a servicios</Button>
      </div>
    );
  }

  const getIcon = (text: string) => {
    if (!text) return faCircleCheck;
    const t = text.toLowerCase();
    if (t.includes("kpi") || t.includes("métrica") || t.includes("metrica")) return faChartLine;
    if (t.includes("datos") || t.includes("data") || t.includes("base de datos") || t.includes("big data")) return faDatabase;
    if (t.includes("mercado") || t.includes("investigación") || t.includes("investigacion")) return faMagnifyingGlassChart;
    if (t.includes("estrategia") || t.includes("plan") || t.includes("hoja de ruta")) return faChessKnight;
    if (t.includes("venta") || t.includes("comercial") || t.includes("pipeline") || t.includes("mql")) return faBagShopping;
    if (t.includes("internacional") || t.includes("global") || t.includes("país") || t.includes("pais") || t.includes("localización")) return faEarthAmericas;
    if (t.includes("seguro") || t.includes("seguridad") || t.includes("privacidad") || t.includes("cumplimiento")) return faShieldHalved;
    if (t.includes("móvil") || t.includes("movil") || t.includes("acceso")) return faMobileScreenButton;
    if (t.includes("alerta") || t.includes("inteligente") || t.includes("desviación")) return faBoltLightning;
    if (t.includes("validación") || t.includes("validacion") || t.includes("test") || t.includes("mvp")) return faVial;
    if (t.includes("alianza") || t.includes("socio") || t.includes("partner") || t.includes("joint venture")) return faHandshake;
    if (t.includes("innovación") || t.includes("producto") || t.includes("desarrollo")) return faLightbulb;
    if (t.includes("operaciones") || t.includes("proceso") || t.includes("logística") || t.includes("logistica")) return faGears;
    if (t.includes("financiero") || t.includes("caja") || t.includes("p&l") || t.includes("rentabilidad")) return faMoneyBillTrendUp;
    return faCircleCheck;
  };

  return (
    <>
      <AnimationObserver />
      <Navbar />

      <main id="main-content" className="svc-detail-page">
        {/* ── Zoho-style Hero with Form ── */}
        <section className={`${styles.svcHeroDetail} fade-in-up`}>
          <div className={`container ${styles.svcHeroGrid}`}>
            <div className={styles.svcHeroText}>
              <Link href={`/${lang.toLowerCase()}/servicios`} title={t('nav.backToServices')} className={styles.backLink}>
                <FontAwesomeIcon icon={faArrowLeft} /> {t('nav.backToServices')}
              </Link>
              <span className="subtitle">{service.title}</span>
              <h1>{service.heroTitle}</h1>
              <p className={styles.longDesc}>{service.longDesc}</p>
              
              <div className={styles.svcFeaturesList}>
                <h3>{t('pbi.common.featuresTitle')}</h3>
                <ul>
                  <li><FontAwesomeIcon icon={getIcon(service.i1)} /> {service.i1}</li>
                  <li><FontAwesomeIcon icon={getIcon(service.i2)} /> {service.i2}</li>
                  <li><FontAwesomeIcon icon={getIcon(service.i3)} /> {service.i3}</li>
                  <li><FontAwesomeIcon icon={getIcon(service.i4)} /> {service.i4}</li>
                  {service.i5 && <li><FontAwesomeIcon icon={getIcon(service.i5)} /> {service.i5}</li>}
                </ul>
              </div>
            </div>

            <div className={styles.svcHeroForm}>
              <div className={styles.formCard}>
                <h3>{t('pbi.common.formTitle')}</h3>
                <p>{t('pbi.common.formDesc')} <strong>{service.title}</strong>.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Extra Info Section ── */}
        <section className={`section container fade-in-up ${styles.whySection}`}>
          <div className="section-header">
            <h2>{t('pbi.common.whyTitle')}</h2>
            <p>{t('pbi.common.whyDesc')}</p>
          </div>
          
          <div className={styles.servicesGrid} style={{marginTop: '3rem'}}>
             <div className={`${styles.serviceCard} ${styles.noClick} ${styles.centeredCard}`}>
               <div className={styles.iconBox}><FontAwesomeIcon icon={faRocket} /></div>
                <h3>{t('pbi.common.card1Title')}</h3>
                <p>{t('pbi.common.card1Desc')}</p>
             </div>
             <div className={`${styles.serviceCard} ${styles.noClick} ${styles.centeredCard}`}>
               <div className={styles.iconBox}><FontAwesomeIcon icon={faMicrochip} /></div>
                <h3>{t('pbi.common.card2Title')}</h3>
                <p>{t('pbi.common.card2Desc')}</p>
             </div>
             <div className={`${styles.serviceCard} ${styles.noClick} ${styles.centeredCard}`}>
               <div className={styles.iconBox}><FontAwesomeIcon icon={faShieldHalved} /></div>
                <h3>{t('pbi.common.card3Title')}</h3>
                <p>{t('pbi.common.card3Desc')}</p>
             </div>
          </div>
        </section>
      </main>


      <Footer />
    </>
  );
}
