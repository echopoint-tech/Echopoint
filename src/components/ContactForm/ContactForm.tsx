"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleExclamation,
  faUser,
  faEnvelope,
  faPenNib,
  faMessage
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/common/Button/Button";
import styles from "./ContactForm.module.css";

const formLabels: Record<string, Record<string, string>> = {
  ES: {
    name: "Nombre Completo",
    namePh: "Ej. Juan Pérez",
    nameErr: "Por favor ingresa tu nombre completo.",
    email: "Correo Corporativo",
    emailPh: "nombre@empresa.com",
    emailErr: "Por favor ingresa un correo válido.",
    subject: "Asunto",
    subjectPh: "Ej. Solicitud de Consultoría",
    subjectErr: "El asunto es muy corto.",
    message: "Mensaje",
    messagePh: "Cuéntanos sobre tus desafíos...",
    messageErr: "Por favor detalla un poco más tu mensaje.",
    btn: "Enviar Mensaje",
    success: "¡Mensaje enviado con éxito! Te contactaremos en menos de 24 horas.",
    errorFields: "Hubo un error al enviar. Por favor completa todos los campos correctamente.",
    errorServer: "Error del servidor. Intenta de nuevo más tarde."
  },
  EN: {
    name: "Full Name",
    namePh: "e.g. John Doe",
    nameErr: "Please enter your full name.",
    email: "Corporate Email",
    emailPh: "name@company.com",
    emailErr: "Please enter a valid email.",
    subject: "Subject",
    subjectPh: "e.g. Consulting Request",
    subjectErr: "Subject is too short.",
    message: "Message",
    messagePh: "Tell us about your challenges...",
    messageErr: "Please provide more details.",
    btn: "Send Message",
    success: "Message sent successfully! We'll contact you within 24 hours.",
    errorFields: "Error sending. Please fill in all fields correctly.",
    errorServer: "Server error. Please try again later."
  },
  FR: {
    name: "Nom Complet",
    namePh: "Ex. Jean Dupont",
    nameErr: "Veuillez entrer votre nom complet.",
    email: "Email Professionnel",
    emailPh: "nom@entreprise.com",
    emailErr: "Veuillez entrer un email valide.",
    subject: "Sujet",
    subjectPh: "Ex. Demande de Consultation",
    subjectErr: "Le sujet est trop court.",
    message: "Message",
    messagePh: "Parlez-nous de vos défis...",
    messageErr: "Veuillez détailler davantage votre message.",
    btn: "Envoyer le Message",
    success: "Message envoyé avec succès ! Nous vous contacterons sous 24 heures.",
    errorFields: "Erreur d'envoi. Veuillez remplir correctement tous les champs.",
    errorServer: "Erreur serveur. Réessayez plus tard."
  },
  PT: {
    name: "Nome Completo",
    namePh: "Ex. João Silva",
    nameErr: "Por favor, insira seu nome completo.",
    email: "Email Corporativo",
    emailPh: "nome@empresa.com",
    emailErr: "Por favor, insira um email válido.",
    subject: "Assunto",
    subjectPh: "Ex. Solicitação de Consultoria",
    subjectErr: "O asunto é muito curto.",
    message: "Mensagem",
    messagePh: "Conte-nos sobre seus desafios...",
    messageErr: "Por favor, forneça mais detalhes.",
    btn: "Enviar Mensaje",
    success: "Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.",
    errorFields: "Erro ao enviar. Por favor, preencha todos os campos corretamente.",
    errorServer: "Erro do servidor. Tente novamente mais tarde."
  }
};

export default function ContactForm() {
  const { lang } = useLanguage();
  const labels = formLabels[lang] || formLabels.ES;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current); };
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMsg(labels.errorFields);
      return;
    }

    // Check honeypot
    const honeypot = (document.getElementById("website") as HTMLInputElement)?.value;
    if (honeypot) {
      // Bot detected, pretend success
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        statusTimeoutRef.current = setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setErrorMsg(labels.errorServer);
      }
    } catch {
      setStatus("error");
      setErrorMsg(labels.errorServer);
    }
  };

  return (
    <form className={styles.contactForm} id="main-contact-form" onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="name">{labels.name}</label>
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faUser} className={styles.fieldIcon} />
          <input
            type="text"
            id="name"
            placeholder={labels.namePh}
            required
            minLength={2}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <span className={styles.errorMsg}>{labels.nameErr}</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">{labels.email}</label>
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.fieldIcon} />
          <input
            type="email"
            id="email"
            placeholder={labels.emailPh}
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <span className={styles.errorMsg}>{labels.emailErr}</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="subject">{labels.subject}</label>
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faPenNib} className={styles.fieldIcon} />
          <input
            type="text"
            id="subject"
            placeholder={labels.subjectPh}
            required
            minLength={5}
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>
        <span className={styles.errorMsg}>{labels.subjectErr}</span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">{labels.message}</label>
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faMessage} className={`${styles.fieldIcon} ${styles.areaIcon}`} />
          <textarea
            id="message"
            rows={4}
            placeholder={labels.messagePh}
            required
            minLength={10}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>
        <span className={styles.errorMsg}>{labels.messageErr}</span>
      </div>

      {/* Honeypot for Spam Protection */}
      <div style={{ display: "none" }}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={status === "loading"}
      >
        {labels.btn}
      </Button>

      {status === "success" && (
        <div className={`${styles.formStatus} ${styles.successMessage}`}>
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>{labels.success}</p>
        </div>
      )}
      {status === "error" && (
        <div className={`${styles.formStatus} ${styles.errorMessage}`}>
          <FontAwesomeIcon icon={faCircleExclamation} />
          <p>{errorMsg}</p>
        </div>
      )}
    </form>
  );
}
