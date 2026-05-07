import ServiceDetailView from "@/components/Views/ServiceDetailView";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateStaticParams() {
  const lang = "pt";
  const dict = dictionaries.PT;
  const slugs = [
    ...Object.values(dict.services).map((s: any) => s?.slug),
    ...Object.values(dict.pbi).map((p: any) => p?.slug)
  ].filter(Boolean);

  return slugs.map(slug => ({ lang, slug }));
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <ServiceDetailView lang={lang} slug={slug} />;
}
