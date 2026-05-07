"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faCommentDots,
  faPaperPlane,
  faRobot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type Message = {
  text: string;
  sender: "bot" | "user";
};

// Knowledge base for the chatbot â€” keyword matching approach
const knowledgeBase: Record<string, Record<string, string>> = {
  ES: {
    _greeting: "¡Hola! Soy el asistente de Echopoint. ¿En qué puedo ayudarte? Puedes preguntar sobre nuestros servicios, precios, IA, o agendar una reunión.",
    servicios: "Ofrecemos 6 pilares: Estrategia de Crecimiento, Desarrollo de Alianzas, Generación de Ventas, Expansión Internacional, Nuevos Productos e Inteligencia Comercial. ¿Sobre cuál te gustaría saber más?",
    precio: "Nuestras tarifas dependen del alcance del proyecto. Te invitamos a agendar una consulta gratuita en /contacto para darte una cotización personalizada.",
    ia: "Utilizamos IA para análisis predictivo, cualificación de leads y optimización de procesos. No reemplazamos humanos, amplificamos su talento.",
    reunion: "Puedes agendar una demo o reunión desde nuestra página de contacto: /contacto. Te responderemos en menos de 24 horas.",
    contacto: "Puedes escribirnos a contacto@echopointmx.com o llamar al +52 55 25056854. También puedes usar el formulario en /contacto.",
    crecimiento: "Nuestra Estrategia de Crecimiento incluye análisis Porter, SWOT cuantitativo, planes de expansión con proyecciones a 5 años y validación A/B.",
    ventas: "Generamos ventas B2B mediante prospección segmentada, scoring MQL-SQL con criterios BANT, y apertura de cuentas Enterprise.",
    expansion: "Te ayudamos a expandir internacionalmente con estudios PESTEL, adaptación de modelo de negocio, due diligence y planes de lanzamiento de 90 días.",
    _fallback: "Interesante pregunta. Te recomiendo hablar con nuestro equipo directamente para una respuesta más detallada. Puedes agendar una cita en /contacto o escribir a contacto@echopointmx.com."
  },
  EN: {
    _greeting: "Hello! I'm the Echopoint assistant. How can I help? You can ask about our services, pricing, AI capabilities, or scheduling a meeting.",
    servicios: "We offer 6 pillars: Growth Strategy, Alliance Development, Sales Generation, International Expansion, New Products, and Commercial Intelligence. Which would you like to learn about?",
    services: "We offer 6 pillars: Growth Strategy, Alliance Development, Sales Generation, International Expansion, New Products, and Commercial Intelligence. Which would you like to learn about?",
    pricing: "Our pricing depends on the project scope. We invite you to schedule a free consultation at /contacto for a personalized quote.",
    price: "Our pricing depends on the project scope. We invite you to schedule a free consultation at /contacto for a personalized quote.",
    ai: "We use AI for predictive analysis, lead qualification, and process optimization. We don't replace humans â€” we amplify their talent.",
    meeting: "You can schedule a demo or meeting from our contact page: /contacto. We'll respond within 24 hours.",
    contact: "You can email us at contacto@echopointmx.com or call +52 55 25056854. You can also use the form at /contacto.",
    growth: "Our Growth Strategy includes Porter's analysis, quantitative SWOT, 5-year expansion plans, and A/B validation.",
    sales: "We generate B2B sales through segmented prospecting, MQL-SQL scoring with BANT criteria, and Enterprise account opening.",
    expansion: "We help you expand internationally with PESTEL studies, business model adaptation, due diligence, and 90-day launch plans.",
    _fallback: "Great question. I'd recommend talking to our team directly for a more detailed answer. You can schedule a meeting at /contacto or email contacto@echopointmx.com."
  },
  FR: {
    _greeting: "Bonjour ! Je suis l'assistant d'Echopoint. Comment puis-je vous aider ? Vous pouvez poser des questions sur nos services, tarifs, IA ou planifier une réunion.",
    services: "Nous offrons 6 piliers : Stratégie de Croissance, Développement d'Alliances, Génération de Ventes, Expansion Internationale, Nouveaux Produits et Intelligence Commerciale.",
    prix: "Nos tarifs dépendent de la portée du projet. Planifiez une consultation gratuite sur /contacto.",
    ia: "Nous utilisons l'IA pour l'analyse prédictive, la qualification des prospects et l'optimisation des processus.",
    reunion: "Vous pouvez planifier une démo depuis notre page de contact : /contacto.",
    contact: "Écrivez-nous Ã  contacto@echopointmx.com ou appelez le +52 55 25056854.",
    _fallback: "Excellente question. Je vous recommande de contacter directement notre équipe via /contacto ou contacto@echopointmx.com."
  },
  PT: {
    _greeting: "Olá! Sou o assistente da Echopoint. Como posso ajudar? Pergunte sobre nossos serviços, preços, IA ou agendar uma reunião.",
    servicos: "Oferecemos 6 pilares: Estratégia de Crescimento, Desenvolvimento de Alianças, Geração de Vendas, Expansão Internacional, Novos Produtos e Inteligência Comercial.",
    preco: "Nossos preços dependem do escopo do projeto. Agende uma consulta gratuita em /contacto.",
    ia: "Usamos IA para análise preditiva, qualificação de leads e otimização de processos.",
    reuniao: "Você pode agendar uma demo na nossa página de contato: /contacto.",
    contato: "Escreva para contacto@echopointmx.com ou ligue para +52 55 25056854.",
    _fallback: "Ótima pergunta. Recomendo falar diretamente com nossa equipe via /contacto ou contacto@echopointmx.com."
  }
};

function findResponse(input: string, lang: string): string {
  const lowerInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const kb = knowledgeBase[lang] || knowledgeBase.ES;

  for (const [keyword, response] of Object.entries(kb)) {
    if (keyword.startsWith("_")) continue;
    if (lowerInput.includes(keyword)) {
      return response;
    }
  }

  return kb._fallback;
}

const chatPlaceholders: Record<string, string> = {
  ES: "Escribe tu pregunta...",
  EN: "Type your question...",
  FR: "Écrivez votre question...",
  PT: "Digite sua pergunta...",
};

import styles from "./Chatbot.module.css";

export default function Chatbot() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevLangRef = useRef(lang);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current); };
  }, []);

  // Reset greeting when language changes or on first open
  useEffect(() => {
    if (prevLangRef.current !== lang || messages.length === 0) {
      const kb = knowledgeBase[lang] || knowledgeBase.ES;
      setMessages([{ text: kb._greeting, sender: "bot" }]);
      prevLangRef.current = lang;
    }
  }, [lang]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      const response = findResponse(userMsg, lang);
      setMessages(prev => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className={styles.chatbotWidget}>
      <button
        className={styles.chatToggle}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faCommentDots} />
      </button>

      <div className={`${styles.chatWindow} ${isOpen ? styles.active : ""}`}>
        <div className={styles.chatHeader}>
          <div className={styles.botInfo}>
            <div className={styles.botAvatar}><FontAwesomeIcon icon={faRobot} /></div>
            <span>EchoBot AI</span>
          </div>
          <button className={styles.chatClose} onClick={() => setIsOpen(false)} aria-label="Close chat">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className={styles.chatMessages} id="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.message} ${styles[msg.sender]}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.message} ${styles.bot}`}>
              <p style={{ opacity: 0.6 }}>
                <FontAwesomeIcon icon={faCircleNotch} spin style={{ marginRight: "0.5rem" }} />
                {lang === "EN" ? "Thinking..." : lang === "FR" ? "Réflexion..." : lang === "PT" ? "Pensando..." : "Pensando..."}
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.chatInput}>
          <input
            type="text"
            placeholder={chatPlaceholders[lang] || chatPlaceholders.ES}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} aria-label="Send message"><FontAwesomeIcon icon={faPaperPlane} /></button>
        </div>
      </div>
    </div>
  );
}
