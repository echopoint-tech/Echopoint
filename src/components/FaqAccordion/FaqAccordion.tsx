"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./FaqAccordion.module.css";

const faqData: Record<string, Array<{ q: string; a: string }>> = {
  ES: [
    { q: "¿Qué hace exactamente Echopoint AI?", a: "Echopoint fusiona consultoría estratégica tradicional con herramientas de IA para optimizar la toma de decisiones y acelerar el crecimiento B2B." },
    { q: "¿En cuánto tiempo se ven resultados?", a: "Nuestros proyectos suelen mostrar KPIs positivos en los primeros 90 días, dependiendo del mercado y el alcance definido." },
    { q: "¿Trabajan con empresas fuera de México?", a: "Sí, tenemos experiencia liderando expansiones en Latinoamérica, Estados Unidos y Europa." },
    { q: "¿Es necesario tener conocimientos técnicos?", a: "No. Nosotros nos encargamos de la complejidad tecnológica para que tú te enfoques en liderar tu negocio." }
  ],
  EN: [
    { q: "What exactly does Echopoint AI do?", a: "Echopoint merges traditional strategic consulting with AI tools to optimize decision-making and accelerate B2B growth." },
    { q: "How long until we see results?", a: "Our projects typically show positive KPIs within the first 90 days, depending on the market and defined scope." },
    { q: "Do you work with companies outside Mexico?", a: "Yes, we have experience leading expansions in Latin America, the United States, and Europe." },
    { q: "Is technical knowledge required?", a: "No. We handle the technological complexity so you can focus on leading your business." }
  ],
  FR: [
    { q: "Que fait exactement Echopoint AI ?", a: "Echopoint fusionne le conseil stratégique traditionnel avec des outils d'IA pour optimiser la prise de décision et accélérer la croissance B2B." },
    { q: "Combien de temps avant de voir des résultats ?", a: "Nos projets affichent généralement des indicateurs positifs au cours des 90 premiers jours." },
    { q: "Travaillez-vous avec des entreprises hors du Mexique ?", a: "Oui, nous avons de l'expérience dans les expansions en Amérique Latine, aux États-Unis et en Europe." },
    { q: "Des connaissances techniques sont-elles nécessaires ?", a: "Non. Nous gérons la complexité technologique pour que vous puissiez vous concentrer sur votre entreprise." }
  ],
  PT: [
    { q: "O que exatamente a Echopoint AI faz?", a: "A Echopoint funde consultoria estratégica tradicional com ferramentas de IA para otimizar a tomada de decisão e acelerar o crescimento B2B." },
    { q: "Quanto tempo até vermos resultados?", a: "Nossos projetos normalmente mostram KPIs positivos nos primeiros 90 dias." },
    { q: "Vocês trabalham com empresas fora do México?", a: "Sim, temos experiência liderando expansões na América Latina, Estados Unidos e Europa." },
    { q: "É necessário ter conhecimentos técnicos?", a: "Não. Nós cuidamos da complexidade tecnológica para que você possa focar em liderar seu negócio." }
  ]
};

export default function FaqAccordion() {
  const { lang } = useLanguage();
  const faqs = faqData[lang] || faqData.ES;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqAccordion}>
      {faqs.map((faq, i) => (
        <div key={i} className={`${styles.faqItem} ${activeIndex === i ? styles.itemActive : ""}`}>
          <button 
            className={`${styles.faqQuestion} ${activeIndex === i ? styles.active : ""}`}
            onClick={() => toggleFaq(i)}
            aria-expanded={activeIndex === i}
          >
            {faq.q}
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </button>
          <div className={`${styles.faqAnswer} ${activeIndex === i ? styles.active : ""}`}>
            <p>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

