import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import styles from "./CardV2.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import NeuralCanvasLoader from "@/components/NeuralCanvas/NeuralCanvasLoader";

interface Props {
  params: Promise<{ lang: string }>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VCardV2Page({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  const contactInfo = {
    name: "Ary Miedzwinsky",
    position: lang === 'es' ? "Estrategia & Crecimiento" : "Strategy & Growth",
    whatsapp: "https://wa.me/5574805532", 
    email: "mailto:ary.m@echopoint.mx.com", 
    website: `/${lang}`
  };

  return (
    <main className={styles.container}>

      {/* Fondo Animado Neural */}
      <div className={styles.canvasWrapper}>
        <NeuralCanvasLoader />
      </div>

      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.webp"
            alt="Echopoint AI Logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{contactInfo.name}</h1>
          <p className={styles.position}>{contactInfo.position}</p>
        </div>

        <div className={styles.actions}>
          <a
            href={contactInfo.whatsapp}
            className={`${styles.btn} ${styles.btnPrimary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} width={20} />
            WhatsApp
          </a>
          
          <a
            href={contactInfo.email}
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            <FontAwesomeIcon icon={faEnvelope} width={18} />
            {dict.footer.contact}
          </a>

          <Link
            href={contactInfo.website}
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            <FontAwesomeIcon icon={faGlobe} width={18} />
            {lang === 'es' ? "Sitio Web" : "Website"}
          </Link>
        </div>

        <div className={styles.footer}>
          <Link href={`/${lang}`} className={styles.footerLogo}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} Echopoint AI
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
