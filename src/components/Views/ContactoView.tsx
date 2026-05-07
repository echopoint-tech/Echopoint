"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

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
        <div className="section-header reveal">
          <span className="subtitle">{t('contact.subtitle') || 'Conexión Directa'}</span>
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.desc')}</p>
        </div>

        <div className={styles.contactGrid}>
          <div className={`${styles.contactInfo} reveal reveal-delay-1`}>
            <h2>{t('contact.infoTitle')}</h2>
            <p>{t('contact.infoDesc')}</p>
            
            <div className={styles.infoList}>
              <div className={`${styles.infoItem} reveal reveal-delay-1`}>
                <div className={styles.iconWrapper}><FontAwesomeIcon icon={faEnvelope} /></div>
                <div className={styles.infoText}>
                  <h3>{t('contact.email') || 'Email'}</h3>
                  <a href="mailto:contacto@echopointmx.com" title="Enviar correo a contacto@echopointmx.com">contacto@echopointmx.com</a>
                </div>
              </div>
              <div className={`${styles.infoItem} reveal reveal-delay-2`}>
                <div className={styles.iconWrapper}><FontAwesomeIcon icon={faPhone} /></div>
                <div className={styles.infoText}>
                  <h3>{t('contact.phone') || 'Teléfono'}</h3>
                  <a href="tel:+525525056854" title="Llamar a +52 55 25056854">+52 55 25056854</a>
                </div>
              </div>
              <div className={`${styles.infoItem} reveal reveal-delay-3`}>
                <div className={styles.iconWrapper}><FontAwesomeIcon icon={faLocationDot} /></div>
                <div className={styles.infoText}>
                  <h3>{t('contact.address') || 'Ubicación'}</h3>
                  <span>Av. Ricardo Margain Zozaya 335-Piso 4 y 5,<br/>Zona Santa Engracia, 66265<br/>San Pedro Garza García, N.L.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`${styles.formWrapper} reveal reveal-delay-2`}>
            <ContactForm />
          </div>
        </div>
        </div>
      </main>

      <section className={`${styles.faqSection} section`}>
        <div className="container">
          <div className="section-header reveal">
            <h2>{t('contact.faqTitle')}</h2>
            <p>{t('contact.faqDesc')}</p>
          </div>
          <div className="reveal reveal-delay-1">
            <FaqAccordion />
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
}
