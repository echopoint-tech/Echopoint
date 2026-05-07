import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import AnimationObserver from "@/components/AnimationObserver";
import { getBlogPosts } from "@/lib/content/posts";
import { getDictionary } from "@/i18n/dictionaries";
import styles from "./BlogPage.module.css";

type Props = {
  params: Promise<{ lang: string }>;
};

function createTranslator(dictionary: Record<string, any>) {
  return (key: string): string => {
    const value = key.split(".").reduce<any>((current, part) => current?.[part], dictionary);
    return typeof value === "string" ? value : key;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = getDictionary(lang);
  const t = createTranslator(dictionary);
  return {
    title: `${t("insights.title")} - Echopoint AI`,
    description: t("insights.pageDesc"),
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

      <main id="main-content" className={`container section ${styles.blogContainer}`} style={{ paddingTop: "8rem" }}>
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
