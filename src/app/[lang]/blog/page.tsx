import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import AnimationObserver from "@/components/AnimationObserver";
import { getBlogPosts } from "@/lib/content/posts";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/lib/translator";
import styles from "./BlogPage.module.css";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  const t = createTranslator(dictionary);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://echopoint-intsolutions.com';
  return {
    title: `${t("insights.title")} - Echopoint AI`,
    description: t("insights.pageDesc"),
    alternates: {
      canonical: `${baseUrl}/${lang}/blog/`,
      languages: {
        'es-MX': `${baseUrl}/es/blog/`,
        'en-US': `${baseUrl}/en/blog/`,
        'fr-FR': `${baseUrl}/fr/blog/`,
        'pt-BR': `${baseUrl}/pt/blog/`,
        'x-default': `${baseUrl}/es/blog/`,
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  const t = createTranslator(dictionary);

  return (
    <>
      <AnimationObserver />
      <Navbar />

      <main id="main-content" className={`container section ${styles.blogContainer}`}>
        <div className={`${styles.blogHeader} reveal`}>
          <span className="subtitle">{t("insights.pageSubtitle")}</span>
          <h1 className="reveal-delay-1">{t("insights.title")}</h1>
          <p className="reveal-delay-2">{t("insights.pageDesc")}</p>
        </div>

        <BlogList initialPosts={getBlogPosts(lang)} />
      </main>

      <Footer />
    </>
  );
}
