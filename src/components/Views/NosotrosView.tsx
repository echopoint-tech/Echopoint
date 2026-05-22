"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Zap, 
  Target, 
  Infinity as InfinityIcon, 
  Fingerprint, 
  LineChart 
} from "lucide-react";
import { 
  MotionReveal, 
  MotionStagger, 
  MotionStaggerItem 
} from "@/components/common/MotionReveal";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./NosotrosView.module.css";

function Linkedin({ size = 24 }: { size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function NosotrosPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      {/* ── Hero Banner ── */}
      <MotionReveal yOffset={16} duration={1.2} className={styles.aboutHero}>
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
      </MotionReveal>

      <main id="main-content" className="container section">
        
        {/* ── The Vision ── */}
        <div className={styles.splitSection} style={{ marginTop: "2rem" }}>
          <MotionReveal className={styles.splitText}>
            <span className="subtitle">{t('about.essSub') || "Nuestra Visión"}</span>
            <h2 dangerouslySetInnerHTML={{__html: t('about.essTitle')}}></h2>
            <p>{t('about.essDesc')}</p>
            <ul className={styles.aboutFeatures} style={{ marginTop: "2rem" }}>
              <li>
                <Zap size={18} className="text-accent" />
                <span>{t('about.essF1')}</span>
              </li>
              <li>
                <Target size={18} className="text-accent" />
                <span>{t('about.essF2')}</span>
              </li>
              <li>
                <InfinityIcon size={18} className="text-accent" />
                <span>{t('about.essF3')}</span>
              </li>
            </ul>
          </MotionReveal>
          <MotionReveal delay={0.15} className={styles.splitImage}>
            <Image 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Team strategy meeting" 
              width={600} 
              height={500} 
              className={`${styles.roundedImage} ${styles.shadowPremium}`}
            />
          </MotionReveal>
        </div>

        {/* ── Pillars ── */}
        <div style={{ marginTop: "6rem" }}>
          <MotionStagger className={styles.aboutGrid}>
            <MotionStaggerItem className={styles.aboutCard}>
              <div className={styles.aboutIcon}>
                <Fingerprint size={24} />
              </div>
              <h3>{t('about.whoTitle')}</h3>
              <p>{t('about.whoDesc')}</p>
            </MotionStaggerItem>
            <MotionStaggerItem className={styles.aboutCard}>
              <div className={`${styles.aboutIcon} pbi-icon-blue`}>
                <LineChart size={24} />
              </div>
              <h3>{t('about.whatTitle')}</h3>
              <p>{t('about.whatDesc')}</p>
            </MotionStaggerItem>
          </MotionStagger>
        </div>

        {/* ── Leadership Team ── */}
        <div style={{ marginTop: "8rem", textAlign: "center" }}>
          <MotionReveal>
            <span className="subtitle">Liderazgo</span>
            <h2 style={{ marginBottom: "3rem" }}>{t('about.teamTitle')}</h2>
          </MotionReveal>
          
          <MotionStagger className={`team-grid ${styles.executiveGrid}`}>
            <a href="https://linkedin.com" title="Ver perfil de LinkedIn de Elena R." target="_blank" rel="noopener noreferrer" className={styles.teamMemberLink}>
              <MotionStaggerItem className={styles.teamMemberPremium}>
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
                      <Linkedin size={18} />
                    </div>
                  </div>
                </div>
              </MotionStaggerItem>
            </a>
            <a href="https://linkedin.com" title="Ver perfil de LinkedIn de Marc T." target="_blank" rel="noopener noreferrer" className={styles.teamMemberLink}>
              <MotionStaggerItem className={styles.teamMemberPremium}>
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
                      <Linkedin size={18} />
                    </div>
                  </div>
                </div>
              </MotionStaggerItem>
            </a>
            <a href="https://linkedin.com" title="Ver perfil de LinkedIn de David K." target="_blank" rel="noopener noreferrer" className={styles.teamMemberLink}>
              <MotionStaggerItem className={styles.teamMemberPremium}>
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
                      <Linkedin size={18} />
                    </div>
                  </div>
                </div>
              </MotionStaggerItem>
            </a>
          </MotionStagger>
        </div>

      </main>

      <Footer />
    </>
  );
}

