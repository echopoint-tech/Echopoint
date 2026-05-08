"use client";

import Link from "next/link";
import Image from "next/image";
import { LanguageProvider } from "@/context/LanguageContext";

export default function NotFoundUI({ lang = "es" }: { lang?: string }) {
  const content = {
    es: { 
      title: "No podemos encontrar la página que buscas.", 
      visit: "Visitar inicio",
      copyright: "© 2026, Echopoint AI. Todos los derechos reservados.",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad"
    },
    en: { 
      title: "We can't seem to find the page you are looking for.", 
      visit: "Visit homepage",
      copyright: "© 2026, Echopoint AI. All Rights Reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy"
    },
    fr: { 
      title: "Nous ne parvenons pas à trouver la page que vous recherchez.", 
      visit: "Visiter l'accueil",
      copyright: "© 2026, Echopoint AI. Tous droits réservés.",
      terms: "Conditions d'Utilisation",
      privacy: "Politique de Confidentialité"
    },
    pt: { 
      title: "Não conseguimos encontrar a página que você está procurando.", 
      visit: "Visitar o início",
      copyright: "© 2026, Echopoint AI. Todos os direitos reservados.",
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade"
    }
  }[lang.toLowerCase()] || { 
    title: "No podemos encontrar la página que buscas.", 
    visit: "Visitar inicio",
    copyright: "© 2026, Echopoint AI. Todos los derechos reservados.",
    terms: "Términos de Servicio",
    privacy: "Política de Privacidad"
  };

  return (
    <LanguageProvider initialLang={lang as any}>
      {/* CSS para Ocultar el Chat solo en esta página */}

      <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#050a14",
        color: "white",
        fontFamily: "'Space Grotesk', sans-serif",
        margin: 0,
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        padding: "0 5%"
      }}>
        {/* Header - Logo bien en la esquina */}
        <header style={{ 
          padding: "2rem 0", 
          position: "absolute", 
          top: "20px", 
          left: "5%",
          zIndex: 10 
        }}>
          <Link href={`/${lang}`} title="Volver al inicio">
            <Image 
              src="/logo.webp" 
              alt="Echopoint AI" 
              width={180} 
              height={50} 
              style={{ objectFit: "contain", filter: "brightness(1.2)" }} 
            />
          </Link>
        </header>

        {/* Contenido Principal Centrado Correctamente */}
        <main style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5vw",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          paddingTop: "60px" // Espacio para el header
        }}>
          {/* Lado Izquierdo: Texto */}
          <div style={{ flex: 1.2, maxWidth: "650px" }}>
            <h1 style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "2rem",
              color: "#ffffff",
              letterSpacing: "-1.5px"
            }}>
              {content.title}
            </h1>
            <Link href={`/${lang}`} title="Volver al inicio" style={{
              color: "#06b6d4",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: 600,
              borderBottom: "2px solid rgba(6, 182, 212, 0.4)",
              paddingBottom: "4px",
              transition: "all 0.3s ease",
              display: "inline-block"
            }}>
              {content.visit}
            </Link>
          </div>

          {/* Lado Derecho: Signo de Admiración */}
          <div style={{ 
            flex: 1, 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{
              position: "relative",
              width: "clamp(250px, 30vw, 400px)",
              height: "clamp(250px, 30vw, 400px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ 
                fontSize: "clamp(8rem, 15vw, 15rem)", 
                fontWeight: 800, 
                color: "#06b6d4", 
                zIndex: 2,
                textShadow: "0 0 40px rgba(6, 182, 212, 0.4)" 
              }}>!</span>
              
              <div style={{ position: "absolute", width: "100%", height: "100%", border: "1.5px solid rgba(6, 182, 212, 0.15)", borderRadius: "50%" }}></div>
              <div style={{ position: "absolute", width: "135%", height: "135%", border: "1px solid rgba(6, 182, 212, 0.08)", borderRadius: "50%" }}></div>
              <div style={{ position: "absolute", width: "170%", height: "170%", border: "1px solid rgba(6, 182, 212, 0.04)", borderRadius: "50%" }}></div>
            </div>
          </div>
        </main>

        {/* Footer - Pegado abajo pero con aire */}
        <footer style={{
          padding: "2rem 0",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.8rem",
          color: "#475569",
          width: "100%",
          position: "relative",
          zIndex: 10
        }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <span>{content.terms}</span>
            <span>{content.privacy}</span>
          </div>
          <div style={{ fontWeight: 500 }}>{content.copyright}</div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
