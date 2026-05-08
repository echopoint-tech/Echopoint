import type { Metadata } from "next";
import { LanguageProvider, type Language } from "@/context/LanguageContext";
import ChatbotReveal from "@/components/Chatbot/ChatbotReveal";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import LangSetter from "@/components/LangSetter/LangSetter";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }, { lang: "fr" }, { lang: "pt" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://echopointmx.com";

  return {
    title: {
      default: "Echopoint AI - Consultoría Empresarial Estratégica",
      template: "%s | Echopoint AI",
    },
    description:
      "Echopoint fusiona intuición humana y potencia de IA para estrategias B2B transformadoras. Consultoría empresarial, análisis predictivo y expansión internacional.",
    keywords: [
      "consultoría empresarial", "estrategia B2B", "inteligencia artificial",
      "crecimiento empresarial", "expansión internacional", "análisis predictivo", "Echopoint AI"
    ],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        "es-MX": `${baseUrl}/es`,
        "en-US": `${baseUrl}/en`,
        "fr-FR": `${baseUrl}/fr`,
        "pt-BR": `${baseUrl}/pt`,
      },
    },
    openGraph: {
      title: "Echopoint AI - Consultoría Empresarial Estratégica",
      description: "Echopoint fusiona intuición humana y potencia de IA para estrategias B2B transformadoras.",
      url: `${baseUrl}/${lang}`,
      siteName: "Echopoint AI",
      images: [{ url: "/logo.webp", width: 800, height: 600, alt: "Echopoint AI Logo" }],
      locale: lang === 'es' ? 'es_MX' : lang === 'en' ? 'en_US' : lang === 'fr' ? 'fr_FR' : 'pt_BR',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Echopoint AI - Consultoría Empresarial Estratégica",
      description: "Fusión de inteligencia artificial y creatividad humana para estrategias B2B.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// JSON-LD Structured Data
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://echopointmx.com";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@echopointmx.com";
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+52-55-25056854";

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#organization`,
  "@type": "Organization",
  name: "Echopoint AI",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  description: "Consultoría empresarial estratégica que fusiona inteligencia artificial y creatividad humana para estrategias B2B transformadoras.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Ricardo Margain Zozaya 335-Piso 4 y 5",
    addressLocality: "San Pedro Garza García",
    addressRegion: "N.L.",
    postalCode: "66265",
    addressCountry: "MX",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT_PHONE,
    contactType: "sales",
    email: CONTACT_EMAIL,
    availableLanguage: ["Spanish", "English", "French", "Portuguese"],
  },
  sameAs: [],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#website`,
  "@type": "WebSite",
  name: "Echopoint AI",
  url: SITE_URL,
};

const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <>
      <LangSetter lang={lang} />
      <link
        rel="preload"
        href="/logo.webp"
        as="image"
        fetchPriority="high"
        imageSrcSet="/logo-mobile.webp 200w, /logo.webp 400w"
        imageSizes="(max-width: 768px) 200px, 400px"
      />
      <link
        rel="preload"
        href="/photo-1551288049-bebda4e38f71.webp"
        as="image"
        fetchPriority="high"
        media="(max-width: 768px)"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdWebSite) }}
      />
      <LanguageProvider initialLang={lang.toUpperCase() as Language}>
        <ScrollToTop />
        <a
          href="#main-content"
          title="Skip to content"
          className="sr-only"
          style={{
            position: "absolute",
            top: "-100px",
            left: 0,
            background: "var(--tech-cyan)",
            color: "var(--bg-dark)",
            padding: "0.5rem 1rem",
            zIndex: 9999,
          }}
        >
          Skip to content
        </a>
        {children}
        <ChatbotReveal />
      </LanguageProvider>
    </>
  );
}
