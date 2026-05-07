"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBullseye,
  faChartLine,
  faFingerprint,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./Nosotros.module.css";

export default function NosotrosPage() {
  const { t } = useLanguage();

  return (
    <>
      <AnimationObserver />
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className={`${styles.aboutHero} reveal`}>
        <div className={styles.aboutHeroBg}>
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Corporate office" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority
            className={styles.aboutHeroImg}
          />
          <div className={styles.aboutHeroOverlay}></div>
        </div>
        <div className={`container ${styles.aboutHeroContent}`}>
          <h1 className={styles.aboutHeroTitle}>
            {t('about.headerDesc')}
          </h1>
          <div className={`svc-hero-line ${styles.aboutHeroLine}`}></div>
        </div>
      </section>

      <main id="main-content" className="container section">
        
        {/* ── The Vision ── */}
        <div className={styles.splitSection} style={{ marginTop: "2rem" }}>
          <div className={`${styles.splitText} reveal`}>
            <span className="subtitle">{t('about.essSub') || "Nuestra Visión"}</span>
            <h2 dangerouslySetInnerHTML={{__html: t('about.essTitle')}}></h2>
            <p>{t('about.essDesc')}</p>
            <ul className={styles.aboutFeatures} style={{ marginTop: "2rem" }}>
              <li>
                <FontAwesomeIcon icon={faBolt} className="text-accent" />
                <span>{t('about.essF1')}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faBullseye} className="text-accent" />
                <span>{t('about.essF2')}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faInfinity} className="text-accent" />
                <span>{t('about.essF3')}</span>
              </li>
            </ul>
          </div>
          <div className={`${styles.splitImage} reveal reveal-delay-1`}>
            <Image 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Team strategy meeting" 
              width={600} 
              height={500} 
              className={`${styles.roundedImage} ${styles.shadowPremium}`}
            />
          </div>
        </div>

        {/* ── Pillars ── */}
        <div className={styles.aboutGrid} style={{ marginTop: "6rem" }}>
          <div className={`${styles.aboutCard} reveal reveal-delay-1`}>
            <div className={styles.aboutIcon}>
              <FontAwesomeIcon icon={faFingerprint} />
            </div>
            <h3>{t('about.whoTitle')}</h3>
            <p>{t('about.whoDesc')}</p>
          </div>
          <div className={`${styles.aboutCard} reveal reveal-delay-2`}>
            <div className={`${styles.aboutIcon} pbi-icon-blue`}>
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <h3>{t('about.whatTitle')}</h3>
            <p>{t('about.whatDesc')}</p>
          </div>
        </div>

        {/* ── Leadership Team ── */}
        <div className={`${styles.teamSection} reveal`} style={{ marginTop: "8rem", textAlign: "center" }}>
          <span className="subtitle">Liderazgo</span>
          <h2 style={{ marginBottom: "3rem" }}>{t('about.teamTitle')}</h2>
          <div className={`team-grid ${styles.executiveGrid}`}>
            <a href="https://linkedin.com" title="Ver perfil de LinkedIn de Elena R." target="_blank" rel="noopener noreferrer" className={styles.teamMemberLink}>
              <div className={`${styles.teamMemberPremium} reveal reveal-delay-1`}>
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Elena R." 
                  fill
                  className={styles.memberBg}
                />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberInfo}>
                    <h3>Elena R.</h3>
                    <span>{t('about.role1')}</span>
                    <div className={styles.memberSocial}>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <a href="https://linkedin.com" title="Ver perfil de LinkedIn de Marc T." target="_blank" rel="noopener noreferrer" className={styles.teamMemberLink}>
              <div className={`${styles.teamMemberPremium} reveal reveal-delay-2`}>
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Marc T." 
                  fill
                  className={styles.memberBg}
                />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberInfo}>
                    <h3>Marc T.</h3>
                    <span>{t('about.role2')}</span>
                    <div className={styles.memberSocial}>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <a href="https://linkedin.com" title="Ver perfil de LinkedIn de David K." target="_blank" rel="noopener noreferrer" className={styles.teamMemberLink}>
              <div className={`${styles.teamMemberPremium} reveal reveal-delay-3`}>
                <Image 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="David K." 
                  fill
                  className={styles.memberBg}
                />
                <div className={styles.memberOverlay}>
                  <div className={styles.memberInfo}>
                    <h3>David K.</h3>
                    <span>VP of Operations</span>
                    <div className={styles.memberSocial}>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

      </main>


      <Footer />
    </>
  );
}
