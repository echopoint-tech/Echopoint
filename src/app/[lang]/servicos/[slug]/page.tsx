import type { Metadata } from "next";
import ServiceDetailView from "@/components/Views/ServiceDetailView";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocalizedPath, buildPageAlternates } from "@/i18n/routing";

export async function generateStaticParams() {
  const lang = "pt";
  const dict = dictionaries.PT;
  const slugs = [
    ...Object.values(dict.services).map((s: any) => s?.slug),
    ...Object.values(dict.pbi).map((p: any) => p?.slug)
  ].filter(Boolean);

  return slugs.map(slug => ({ lang, slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://echopoint-intsolutions.com';
  const internalPath = `/servicios/${slug}`;
  return {
    alternates: {
      canonical: `${baseUrl}${getLocalizedPath(lang, internalPath)}`,
      languages: buildPageAlternates(baseUrl, internalPath),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <ServiceDetailView lang={lang} slug={slug} />;
}
