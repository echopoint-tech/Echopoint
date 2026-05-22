import type { Metadata } from "next";
import ContactoView from "@/components/Views/ContactoView";
import { getLocalizedPath, buildPageAlternates } from "@/i18n/routing";

export async function generateStaticParams() {
  return [{ lang: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://echopoint-intsolutions.com';
  return {
    alternates: {
      canonical: `${baseUrl}${getLocalizedPath(lang, '/contacto')}`,
      languages: buildPageAlternates(baseUrl, '/contacto'),
    },
  };
}

export default function Page() {
  return <ContactoView />;
}
