import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/content/posts';

export const dynamic = 'force-static';

const SITE_UPDATED = new Date('2026-03-15');

const BLOG_DATE_MAP: Record<string, number> = {
  'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
  'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11,
};

function parseBlogDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split(' ');
  return new Date(parseInt(year), BLOG_DATE_MAP[month] ?? 0, parseInt(day));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://echopoint.vercel.app';

  const locales = ['es', 'en', 'fr', 'pt'];
  const allUrls: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    allUrls.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/servicios`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/nosotros`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/contacto`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    );

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

    serviceSlugs.forEach((slug) => {
      allUrls.push({
        url: `${baseUrl}/${locale}/servicios/${slug}`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });

    blogPosts.forEach((post) => {
      allUrls.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: parseBlogDate(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return allUrls;
}
