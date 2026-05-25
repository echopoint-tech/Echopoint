import type { Metadata } from "next";
import { LanguageProvider, type Language } from "@/context/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";
import { fontClassNames } from "@/lib/fonts";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import LangSetter from "@/components/LangSetter/LangSetter";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }, { lang: "fr" }, { lang: "pt" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://echopointmx.com";
  const dictionary = getDictionary(lang.toLowerCase());

  return {
    title: {
      default: dictionary.metadata.title,
      template: `%s | ${dictionary.metadata.siteName}`,
    },
    description: dictionary.metadata.description,
    keywords: dictionary.metadata.keywords,
    authors: [{ name: "Echopoint AI", url: baseUrl }],
    other: { publisher: "Echopoint AI" },
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      url: `${baseUrl}/${lang}`,
      siteName: dictionary.metadata.siteName,
      images: [{ url: "/logo.webp", width: 800, height: 600, alt: "Echopoint AI Logo" }],
      locale: lang === "es" ? "es_MX" : lang === "en" ? "en_US" : lang === "fr" ? "fr_FR" : "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      shortcut: "/favicon.ico",
      apple: "/icon-192.png",
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://echopointmx.com";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@echopointmx.com";
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+52-55-25056854";

const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = getDictionary(lang.toLowerCase());

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@id": `${SITE_URL}/#organization`,
    "@type": "Organization",
    name: "Echopoint AI",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    description: dictionary.metadata.orgDescription,
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

  return (
    <html lang={lang.toLowerCase()} className={fontClassNames} data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/logo-mobile.webp"
          as="image"
          fetchPriority="high"
          imageSrcSet="/logo-mobile.webp 200w, /logo.webp 400w"
          imageSizes="(max-width: 768px) 113px, 164px"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdWebSite) }}
        />
      </head>
      <body>
        <LangSetter lang={lang} />
        <LanguageProvider initialLang={lang.toUpperCase() as Language} dictionary={dictionary}>
          <ScrollToTop />
          <a
            href="#main-content"
            title="Skip to content"
            className="sr-only"
          >
            Skip to content
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
