import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/content/posts';
import { getLocalizedPath } from '@/i18n/routing';

export const dynamic = 'force-static';

const SITE_UPDATED = new Date('2026-05-26');

const BLOG_DATE_MAP: Record<string, number> = {
  'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
  'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11,
};

function parseBlogDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split(' ');
  return new Date(parseInt(year), BLOG_DATE_MAP[month] ?? 0, parseInt(day));
}

const locales = ['es', 'en', 'fr', 'pt'] as const;
type Locale = typeof locales[number];

const localeHreflang: Record<Locale, string> = {
  es: 'es-MX',
  en: 'en-US',
  fr: 'fr-FR',
  pt: 'pt-BR',
};

function buildAlternates(baseUrl: string, internalPath: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const locale of locales) {
    langs[localeHreflang[locale]] = `${baseUrl}${getLocalizedPath(locale, internalPath)}`;
  }
  langs['x-default'] = `${baseUrl}${getLocalizedPath('es', internalPath)}`;
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://echopoint-intsolutions.com';

  const mainPages = [
    { internal: '/',          priority: 1.0, freq: 'weekly'  as const, date: SITE_UPDATED },
    { internal: '/servicios', priority: 0.9, freq: 'monthly' as const, date: SITE_UPDATED },
    { internal: '/nosotros',  priority: 0.8, freq: 'monthly' as const, date: SITE_UPDATED },
    { internal: '/contacto',  priority: 0.8, freq: 'monthly' as const, date: SITE_UPDATED },
    { internal: '/blog',      priority: 0.7, freq: 'weekly'  as const, date: SITE_UPDATED },
  ];

  const serviceSlugs = [
    'estrategia-crecimiento',
    'desarrollo-alianzas',
    'generacion-ventas',
    'expansion-internacional',
    'nuevos-productos',
    'inteligencia-comercial',
    'dashboards-ejecutivos',
    'reportes-financieros',
    'analisis-ventas',
    'optimizacion-operaciones',
    'estrategia-datos',
    'analisis-predictivo',
  ];

  const allUrls: MetadataRoute.Sitemap = [];

  for (const { internal, priority, freq, date } of mainPages) {
    const langs = buildAlternates(baseUrl, internal);
    for (const locale of locales) {
      allUrls.push({
        url: `${baseUrl}${getLocalizedPath(locale, internal)}`,
        lastModified: date,
        changeFrequency: freq,
        priority,
        alternates: { languages: langs },
      });
    }
  }

  for (const slug of serviceSlugs) {
    const internalPath = `/servicios/${slug}`;
    const langs = buildAlternates(baseUrl, internalPath);
    for (const locale of locales) {
      allUrls.push({
        url: `${baseUrl}${getLocalizedPath(locale, internalPath)}`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages: langs },
      });
    }
  }

  for (const post of blogPosts) {
    const internalPath = `/blog/${post.slug}`;
    const langs = buildAlternates(baseUrl, internalPath);
    for (const locale of locales) {
      allUrls.push({
        url: `${baseUrl}${getLocalizedPath(locale, internalPath)}`,
        lastModified: parseBlogDate(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: langs },
      });
    }
  }

  return allUrls;
}
