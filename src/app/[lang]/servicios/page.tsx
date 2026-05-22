import type { Metadata } from "next";
import ServiciosView from "@/components/Views/ServiciosView";
import { getLocalizedPath, buildPageAlternates } from "@/i18n/routing";

export async function generateStaticParams() {
  return [{ lang: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://echopoint-intsolutions.com';
  return {
    alternates: {
      canonical: `${baseUrl}${getLocalizedPath(lang, '/servicios')}`,
      languages: buildPageAlternates(baseUrl, '/servicios'),
    },
  };
}

export default function Page() {
  return <ServiciosView />;
}
