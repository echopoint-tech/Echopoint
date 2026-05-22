import type { Metadata } from "next";
import ServiceDetailView from "@/components/Views/ServiceDetailView";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocalizedPath, buildPageAlternates } from "@/i18n/routing";

export async function generateStaticParams() {
  const langs = ["en", "fr"] as const;
  const params: { lang: string; slug: string }[] = [];

  langs.forEach(lang => {
    const dict = dictionaries[lang.toUpperCase() as keyof typeof dictionaries];
    const slugs = [
      ...Object.values(dict.services).map((s: any) => s?.slug),
      ...Object.values(dict.pbi).map((p: any) => p?.slug)
    ].filter(Boolean);

    slugs.forEach(slug => {
      params.push({ lang, slug });
    });
  });

  return params;
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
