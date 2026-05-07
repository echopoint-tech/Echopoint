"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/i18n/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navbar}`}>
        <Link href={getLocalizedPath(lang, "/")} className={styles.logo} title="Echopoint AI - Inicio" onClick={() => setMobileOpen(false)}>
          <img 
            src="/logo.webp" 
            srcSet="/logo-mobile.webp 200w, /logo.webp 400w"
            sizes="(max-width: 768px) 200px, 400px"
            alt="Echopoint AI" 
            title="Echopoint AI - Inicio"
            className={styles.logoImg} 
            width="164"
            height="88"
            decoding="sync"
            fetchPriority="high"
          />
        </Link>

        {/* Desktop nav */}
        <nav className={styles.navDesktop}>
          <ul className={styles.navList}>
            <li><Link href={getLocalizedPath(lang, "/servicios")} title={t('nav.services')} className={`${styles.navLink} ${pathname.includes("servicios") || pathname.includes("services") || pathname.includes("servicos") ? styles.active : ""}`}>{t('nav.services')}</Link></li>
            <li><Link href={getLocalizedPath(lang, "/nosotros")} title={t('nav.about')} className={`${styles.navLink} ${pathname.includes("nosotros") || pathname.includes("about") || pathname.includes("a-propos") || pathname.includes("sobre-nos") ? styles.active : ""}`}>{t('nav.about')}</Link></li>
            <li><Link href={getLocalizedPath(lang, "/blog")} title={t('nav.blog')} className={`${styles.navLink} ${pathname.includes("blog") ? styles.active : ""}`}>{t('nav.blog')}</Link></li>
            <li className={styles.langDropdownContainer}>
              <button className={styles.langToggle} aria-haspopup="true" aria-expanded="false" aria-label="Cambiar idioma">
                <FontAwesomeIcon icon={faGlobe} /> {lang}
              </button>
              <ul className={styles.langMenu} role="menu">
                <li role="none"><button onClick={() => setLang("ES")} role="menuitem">Español (ES)</button></li>
                <li role="none"><button onClick={() => setLang("EN")} role="menuitem">English (EN)</button></li>
                <li role="none"><button onClick={() => setLang("FR")} role="menuitem">Français (FR)</button></li>
                <li role="none"><button onClick={() => setLang("PT")} role="menuitem">Português (PT)</button></li>
              </ul>
            </li>
            <li><Link href={getLocalizedPath(lang, "/contacto")} title={t('nav.contact')} className={styles.navCta}>{t('nav.contact')}</Link></li>
          </ul>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.open : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.active : ""}`}>
        <nav className={styles.mobileNav}>
          <Link href={getLocalizedPath(lang, "/servicios")} title={t('nav.services')} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('nav.services')}</Link>
          <Link href={getLocalizedPath(lang, "/nosotros")} title={t('nav.about')} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('nav.about')}</Link>
          <Link href={getLocalizedPath(lang, "/blog")} title={t('nav.blog')} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('nav.blog')}</Link>
          <Link href={getLocalizedPath(lang, "/contacto")} title={t('nav.contact')} className={`${styles.mobileLink} ${styles.mobileCta}`} onClick={() => setMobileOpen(false)}>{t('nav.contact')}</Link>

          <div className={styles.mobileLangSelector}>
            {(["ES", "EN", "FR", "PT"] as const).map((code) => (
              <button
                key={code}
                className={`${styles.mobileLangBtn} ${lang === code ? styles.active : ""}`}
                onClick={() => { setLang(code); setMobileOpen(false); }}
              >
                {code}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
