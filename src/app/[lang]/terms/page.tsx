"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "60vh", padding: "8rem 1.5rem 4rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          {t("footer.terms")}
        </h1>
        <p style={{ color: "var(--text-muted, #94a3b8)", lineHeight: 1.7 }}>
          Próximamente publicaremos nuestros términos de servicio completos.
          Si tienes preguntas, contáctanos en{" "}
          <a href="mailto:contacto@echopointmx.com" style={{ color: "var(--tech-cyan, #06b6d4)" }}>
            contacto@echopointmx.com
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
