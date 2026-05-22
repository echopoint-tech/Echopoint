"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import { Mail, Phone, MapPin } from "lucide-react";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@/components/common/MotionReveal";
import ProtectedEmail from "@/components/ProtectedEmail/ProtectedEmail";

import { useLanguage } from "@/context/LanguageContext";
import NeuralCanvas from "@/components/NeuralCanvas/NeuralCanvasLoader";
import styles from "./ContactoView.module.css";

export default function ContactoPage() {
  const { t } = useLanguage();

  return (
    <>
      <AnimationObserver />
      <Navbar />

      <main id="main-content" className={`${styles.contactMain} container`} style={{ position: 'relative' }}>
        <NeuralCanvas />
        <div style={{ position: 'relative', zIndex: 2 }}>
        <MotionReveal className="section-header">
          <span className="subtitle">{t('contact.subtitle') || 'Conexión Directa'}</span>
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.desc')}</p>
        </MotionReveal>

        <div className={styles.contactGrid}>
          <MotionReveal className={styles.contactInfo} yOffset={20}>
            <h2>{t('contact.infoTitle')}</h2>
            <p>{t('contact.infoDesc')}</p>
            
            <MotionStagger className={styles.infoList}>
              <MotionStaggerItem className={styles.infoItem}>
                <div className={styles.iconWrapper}><Mail size={18} /></div>
                <div className={styles.infoText}>
                  <h3>{t('contact.email') || 'Email'}</h3>
                  <ProtectedEmail email="contacto@echopointmx.com" title="Enviar correo a contacto@echopointmx.com" />
                </div>
              </MotionStaggerItem>
              <MotionStaggerItem className={styles.infoItem}>
                <div className={styles.iconWrapper}><Phone size={18} /></div>
                <div className={styles.infoText}>
                  <h3>{t('contact.phone') || 'Teléfono'}</h3>
                  <a href="tel:+525525056854" title="Llamar a +52 55 25056854">+52 55 25056854</a>
                </div>
              </MotionStaggerItem>
              <MotionStaggerItem className={styles.infoItem}>
                <div className={styles.iconWrapper}><MapPin size={18} /></div>
                <div className={styles.infoText}>
                  <h3>{t('contact.address') || 'Ubicación'}</h3>
                  <span>Av. Ricardo Margain Zozaya 335-Piso 4 y 5,<br/>Zona Santa Engracia, 66265<br/>San Pedro Garza García, N.L.</span>
                </div>
              </MotionStaggerItem>
            </MotionStagger>
          </MotionReveal>
          
          <MotionReveal className={styles.formWrapper} delay={0.15} yOffset={20}>
            <ContactForm />
          </MotionReveal>
        </div>
        </div>
      </main>

      <section className={`${styles.faqSection} section`}>
        <div className="container">
          <MotionReveal className="section-header">
            <h2>{t('contact.faqTitle')}</h2>
            <p>{t('contact.faqDesc')}</p>
          </MotionReveal>
          <MotionReveal delay={0.15}>
            <FaqAccordion />
          </MotionReveal>
        </div>
      </section>


      <Footer />
    </>
  );
}
