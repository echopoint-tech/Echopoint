import type { Metadata } from "next";
import NosotrosView from "@/components/Views/NosotrosView";
import { getLocalizedPath, buildPageAlternates } from "@/i18n/routing";

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://echopoint-intsolutions.com';
  return {
    alternates: {
      canonical: `${baseUrl}${getLocalizedPath(lang, '/nosotros')}`,
      languages: buildPageAlternates(baseUrl, '/nosotros'),
    },
  };
}

export default function Page() {
  return <NosotrosView />;
}
