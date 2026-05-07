import ServiceDetailView from "@/components/Views/ServiceDetailView";
import { dictionaries } from "@/i18n/dictionaries";

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

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <ServiceDetailView lang={lang} slug={slug} />;
}
