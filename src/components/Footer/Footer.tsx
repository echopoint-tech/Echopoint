"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/i18n/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ProtectedEmail from "@/components/ProtectedEmail/ProtectedEmail";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t, lang } = useLanguage();
  const footerRef = useRef<HTMLElement | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBackToTop(entry.isIntersecting);
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link href={getLocalizedPath(lang, "/")} className="logo" title="Echopoint AI - Inicio">
              <img
                src="/logo.webp"
                srcSet="/logo-mobile.webp 200w, /logo.webp 400w"
                sizes="(max-width: 768px) 200px, 400px"
                alt="Echopoint AI"
                title="Echopoint AI - Inicio"
                className={styles.logoImg}
                width={113}
                height={60}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p>
              {t('footer.desc')}
            </p>
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com/company/echopoint-ai" title="LinkedIn de Echopoint AI" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="https://x.com/echopoint_ai" title="X de Echopoint AI" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
              <a href="https://instagram.com/echopoint_ai" title="Instagram de Echopoint AI" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
          
          <div className={styles.footerNav}>
            <h3>{t('nav.services')}</h3>
            <ul>
              <li><Link href={getLocalizedPath(lang, "/servicios")} title="Power BI">Power BI</Link></li>
              <li><Link href={getLocalizedPath(lang, "/servicios")} title={t('services.s1.title')}>{t('services.s1.title')}</Link></li>
              <li><Link href={getLocalizedPath(lang, "/servicios")} title={t('services.s3.title')}>{t('services.s3.title')}</Link></li>
              <li><Link href={getLocalizedPath(lang, "/servicios")} title={t('services.s4.title')}>{t('services.s4.title')}</Link></li>
            </ul>
          </div>

          <div className={styles.footerContact}>
            <h3>{t('footer.contact')}</h3>
            <ul className={styles.contactLinks}>
              <li><span className={styles.contactIcon} aria-hidden="true">✉</span> <ProtectedEmail email="contacto@echopointmx.com" title="Enviar correo a contacto@echopointmx.com" /></li>
              <li><a href="tel:+525525056854" title="Llamar a +52 55 25056854"><span className={styles.contactIcon} aria-hidden="true">☎</span> +52 55 25056854</a></li>
              <li>
                <span>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" className={styles.contactIconSvg} focusable="false" aria-hidden="true">
                      <path d="M12 2.75A7.25 7.25 0 0 0 4.75 10c0 5.6 6.48 10.65 6.76 10.86a.8.8 0 0 0 .98 0c.28-.21 6.76-5.26 6.76-10.86A7.25 7.25 0 0 0 12 2.75Zm0 16.43C10.5 17.9 6.25 13.9 6.25 10A5.75 5.75 0 1 1 17.75 10c0 3.9-4.25 7.9-5.75 9.18Zm0-12.93A3.25 3.25 0 1 0 15.25 9.5 3.25 3.25 0 0 0 12 6.25Zm0 5A1.75 1.75 0 1 1 13.75 9.5 1.75 1.75 0 0 1 12 11.25Z" />
                    </svg>
                  </span>
                  Av. Ricardo Margain Zozaya 335, N.L.
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Echopoint AI. {t('footer.rights')}</p>
          <div className={styles.legalLinks}>
            <Link href={getLocalizedPath(lang, "/privacy")} title={t('footer.privacy')}>{t('footer.privacy')}</Link>
            <Link href={getLocalizedPath(lang, "/terms")} title={t('footer.terms')}>{t('footer.terms')}</Link>
          </div>
        </div>

      </div>

      <button
        type="button"
        className={`${styles.backToTopButton} ${showBackToTop ? styles.backToTopVisible : ""}`}
        onClick={handleBackToTop}
        aria-label={t('footer.backToTop')}
      >
        <FontAwesomeIcon icon={faArrowUp} />
        <span>{t('footer.backToTop')}</span>
      </button>
    </footer>

  );
}
