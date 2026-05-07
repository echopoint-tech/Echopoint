export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: string;
  content?: string;
};

type PostTranslations = {
  en: { title: string; excerpt: string };
  fr: { title: string; excerpt: string };
  pt: { title: string; excerpt: string };
};

type BlogPostData = BlogPost & { translations: PostTranslations };

const data: BlogPostData[] = [
  {
    id: 1,
    title: "5 Estrategias de Crecimiento B2B para 2026",
    slug: "5-estrategias-de-crecimiento-b2b",
    excerpt: "Descubre las tácticas probadas que están redefiniendo cómo las empresas escalan en mercados saturados.",
    category: "Estrategia",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "15 Mar 2026",
    author: "Marc T.",
    translations: {
      en: {
        title: "5 B2B Growth Strategies for 2026",
        excerpt: "Discover the proven tactics redefining how companies scale in saturated markets.",
      },
      fr: {
        title: "5 Stratégies de Croissance B2B pour 2026",
        excerpt: "Découvrez les tactiques éprouvées qui redéfinissent la façon dont les entreprises se développent sur des marchés saturés.",
      },
      pt: {
        title: "5 Estratégias de Crescimento B2B para 2026",
        excerpt: "Descubra as táticas comprovadas que estão redefinindo como as empresas escalam em mercados saturados.",
      },
    },
  },
  {
    id: 2,
    title: "IA en B2B: Más allá del Hype",
    slug: "ia-en-b2b-mas-alla-del-hype",
    excerpt: "Cómo implementar inteligencia artificial pragmática para optimizar procesos y no solo para seguir tendencias.",
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "20 Mar 2026",
    author: "Elena R.",
    translations: {
      en: {
        title: "AI in B2B: Beyond the Hype",
        excerpt: "How to implement pragmatic artificial intelligence to optimize processes, not just follow trends.",
      },
      fr: {
        title: "L'IA en B2B : Au-delà du Buzz",
        excerpt: "Comment mettre en œuvre une intelligence artificielle pragmatique pour optimiser les processus, et non pas seulement suivre les tendances.",
      },
      pt: {
        title: "IA no B2B: Além do Hype",
        excerpt: "Como implementar inteligência artificial pragmática para otimizar processos e não apenas seguir tendências.",
      },
    },
  },
  {
    id: 3,
    title: "El Poder de las Alianzas Estratégicas",
    slug: "el-poder-de-las-alianzas-estrategicas",
    excerpt: "Por qué competir es cosa del pasado. Aprende a estructurar joint ventures que multipliquen tu alcance.",
    category: "Estrategia",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "25 Mar 2026",
    author: "Marc T.",
    translations: {
      en: {
        title: "The Power of Strategic Alliances",
        excerpt: "Why competing alone is a thing of the past. Learn to structure joint ventures that multiply your reach.",
      },
      fr: {
        title: "Le Pouvoir des Alliances Stratégiques",
        excerpt: "Pourquoi la concurrence seule appartient au passé. Apprenez à structurer des coentreprises qui multiplient votre portée.",
      },
      pt: {
        title: "O Poder das Alianças Estratégicas",
        excerpt: "Por que competir sozinho é coisa do passado. Aprenda a estruturar joint ventures que multipliquem seu alcance.",
      },
    },
  },
  {
    id: 4,
    title: "Guía de Expansión Internacional",
    slug: "guia-de-expansion-internacional",
    excerpt: "Claves culturales y operativas para llevar tu negocio a nuevos territorios sin morir en el intento.",
    category: "Expansión",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "28 Mar 2026",
    author: "Sarah J.",
    translations: {
      en: {
        title: "International Expansion Guide",
        excerpt: "Cultural and operational keys to taking your business to new territories without failing along the way.",
      },
      fr: {
        title: "Guide d'Expansion Internationale",
        excerpt: "Clés culturelles et opérationnelles pour emmener votre entreprise dans de nouveaux territoires sans échouer.",
      },
      pt: {
        title: "Guia de Expansão Internacional",
        excerpt: "Chaves culturais e operacionais para levar seu negócio a novos territórios sem fracassar no caminho.",
      },
    },
  },
  {
    id: 5,
    title: "Psicología de Ventas B2B: ABM",
    slug: "psicologia-de-ventas-b2b-abm",
    excerpt: "Cómo personalizar tu enfoque para cerrar cuentas Enterprise utilizando principios psicológicos y datos.",
    category: "Ventas",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "02 Abr 2026",
    author: "Roberto M.",
    translations: {
      en: {
        title: "B2B Sales Psychology: ABM",
        excerpt: "How to personalize your approach to close Enterprise accounts using psychological principles and data.",
      },
      fr: {
        title: "Psychologie des Ventes B2B : ABM",
        excerpt: "Comment personnaliser votre approche pour conclure des comptes Enterprise en utilisant des principes psychologiques et des données.",
      },
      pt: {
        title: "Psicologia de Vendas B2B: ABM",
        excerpt: "Como personalizar sua abordagem para fechar contas Enterprise usando princípios psicológicos e dados.",
      },
    },
  },
];

export const blogPosts: BlogPost[] = data;

export function getBlogPosts(lang: string): BlogPost[] {
  const normalizedLang = lang.toLowerCase();
  if (normalizedLang === "es") return data;

  const key = normalizedLang as keyof PostTranslations;
  return data.map(({ translations, ...post }) => ({
    ...post,
    ...(translations[key] ?? {}),
  }));
}
