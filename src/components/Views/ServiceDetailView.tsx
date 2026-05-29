"use client";

import Link from "next/link";
import { 
  ArrowLeft,
  ShoppingBag,
  Zap,
  LineChart,
  Compass,
  CheckCircle2,
  Database,
  Globe,
  Settings,
  Handshake,
  Lightbulb,
  TrendingUp,
  Cpu,
  Smartphone,
  FlaskConical,
  Rocket,
  Shield
} from "lucide-react";
import { 
  MotionReveal, 
  MotionStagger, 
  MotionStaggerItem 
} from "@/components/common/MotionReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ServiceDetailView.module.css";

interface ServiceDetailClientProps {
  lang: string;
  slug: string;
}

export default function ServiceDetailClient({ lang, slug }: ServiceDetailClientProps) {
  const { t, dictionary } = useLanguage();

  interface ServiceEntry {
    slug: string; title: string; heroTitle: string; longDesc: string;
    i1: string; i2: string; i3: string; i4: string; i5?: string;
  }

  const servicesData = Object.values(dictionary.services) as unknown[];
  const pbiData = Object.values(dictionary.pbi) as unknown[];
  const saasData = dictionary.saas ? (Object.values(dictionary.saas) as unknown[]) : [];

  const findBySlug = (entries: unknown[]): ServiceEntry | undefined =>
    entries.find((v): v is ServiceEntry =>
      v !== null && typeof v === 'object' && 'slug' in v && (v as ServiceEntry).slug === slug
    );

  let service = findBySlug(servicesData) ?? findBySlug(pbiData) ?? findBySlug(saasData);

  if (!service) {
    return null;
  }

  const getIcon = (text: string) => {
    if (!text) return CheckCircle2;
    const t = text.toLowerCase();
    if (t.includes("marca") || t.includes("logotipo") || t.includes("personalización") || t.includes("dominio")) return Settings;
    if (t.includes("gráfico") || t.includes("terminal") || t.includes("trading") || t.includes("posición") || t.includes("órdenes")) return LineChart;
    if (t.includes("crm") || t.includes("agente") || t.includes("lead")) return Handshake;
    if (t.includes("kpi") || t.includes("métrica") || t.includes("metrica")) return LineChart;
    if (t.includes("datos") || t.includes("data") || t.includes("base de datos") || t.includes("big data")) return Database;
    if (t.includes("mercado") || t.includes("investigación") || t.includes("investigacion")) return TrendingUp;
    if (t.includes("estrategia") || t.includes("plan") || t.includes("hoja de ruta")) return Compass;
    if (t.includes("venta") || t.includes("comercial") || t.includes("pipeline") || t.includes("mql")) return ShoppingBag;
    if (t.includes("internacional") || t.includes("global") || t.includes("país") || t.includes("pais") || t.includes("localización")) return Globe;
    if (t.includes("seguro") || t.includes("seguridad") || t.includes("privacidad") || t.includes("cumplimiento")) return Shield;
    if (t.includes("móvil") || t.includes("movil") || t.includes("acceso")) return Smartphone;
    if (t.includes("alerta") || t.includes("inteligente") || t.includes("desviación")) return Zap;
    if (t.includes("validación") || t.includes("validacion") || t.includes("test") || t.includes("mvp")) return FlaskConical;
    if (t.includes("alianza") || t.includes("socio") || t.includes("partner") || t.includes("joint venture")) return Handshake;
    if (t.includes("innovación") || t.includes("producto") || t.includes("desarrollo")) return Lightbulb;
    if (t.includes("operaciones") || t.includes("proceso") || t.includes("logística") || t.includes("logistica")) return Settings;
    if (t.includes("financiero") || t.includes("caja") || t.includes("p&l") || t.includes("rentabilidad")) return TrendingUp;
    return CheckCircle2;
  };

  return (
    <>
      <AnimationObserver />
      <Navbar />

      <main id="main-content" className="svc-detail-page">
        <section className={styles.svcHeroDetail}>
          <div className={`container ${styles.svcHeroGrid}`}>
            <MotionReveal className={styles.svcHeroText} yOffset={20}>
              <Link href={`/${lang.toLowerCase()}/servicios`} title={t('nav.backToServices')} className={styles.backLink}>
                <ArrowLeft size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> {t('nav.backToServices')}
              </Link>
              <span className="subtitle">{service.title}</span>
              <h1 dangerouslySetInnerHTML={{ __html: service.heroTitle }}></h1>
              <p className={styles.longDesc}>{service.longDesc}</p>
              
              <div className={styles.svcFeaturesList}>
                <h3>{t('pbi.common.featuresTitle')}</h3>
                <ul>
                  {[service.i1, service.i2, service.i3, service.i4, service.i5].filter(Boolean).map((feat, i) => {
                    const Icon = getIcon(feat!);
                    return (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <Icon size={16} className="text-accent" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{feat}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </MotionReveal>

            <MotionReveal className={styles.svcHeroForm} delay={0.15} yOffset={20}>
              <div className={styles.formCard}>
                <h3>{t('pbi.common.formTitle')}</h3>
                <p>{t('pbi.common.formDesc')} <strong dangerouslySetInnerHTML={{ __html: service.title }}></strong>.</p>
                <ContactForm isCompact />
              </div>
            </MotionReveal>
          </div>
        </section>

        <section className={`section container ${styles.whySection}`}>
          <MotionReveal className="section-header">
            <h2>{t('pbi.common.whyTitle')}</h2>
            <p>{t('pbi.common.whyDesc')}</p>
          </MotionReveal>
          
          <MotionStagger className={styles.servicesGrid} style={{marginTop: '3rem'}}>
             <MotionStaggerItem className={`${styles.serviceCard} ${styles.noClick} ${styles.centeredCard}`}>
                <div className={styles.iconBox}><Rocket size={24} /></div>
                <h3>{t('pbi.common.card1Title')}</h3>
                <p>{t('pbi.common.card1Desc')}</p>
             </MotionStaggerItem>
             <MotionStaggerItem className={`${styles.serviceCard} ${styles.noClick} ${styles.centeredCard}`}>
                <div className={styles.iconBox}><Cpu size={24} /></div>
                <h3>{t('pbi.common.card2Title')}</h3>
                <p>{t('pbi.common.card2Desc')}</p>
             </MotionStaggerItem>
             <MotionStaggerItem className={`${styles.serviceCard} ${styles.noClick} ${styles.centeredCard}`}>
                <div className={styles.iconBox}><Shield size={24} /></div>
                <h3>{t('pbi.common.card3Title')}</h3>
                <p>{t('pbi.common.card3Desc')}</p>
             </MotionStaggerItem>
          </MotionStagger>
        </section>
      </main>

      <Footer />
    </>
  );
}
