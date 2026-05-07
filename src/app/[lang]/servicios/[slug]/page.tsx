import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  const langs = ["es", "en", "fr", "pt"];
  const slugs = [
    "estrategia-crecimiento",
    "desarrollo-alianzas",
    "generacion-ventas",
    "expansion-internacional",
    "nuevos-productos",
    "inteligencia-comercial",
    "dashboards-ejecutivos",
    "reportes-financieros",
    "analisis-ventas",
    "optimizacion-operaciones",
    "estrategia-datos",
    "analisis-predictivo"
  ];
  
  const params = [];
  for (const lang of langs) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <ServiceDetailClient lang={lang} slug={slug} />;
}
