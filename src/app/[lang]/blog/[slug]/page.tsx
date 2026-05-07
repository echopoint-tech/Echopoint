import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import { blogPosts, getBlogPosts } from "@/lib/content/posts";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedPath } from "@/i18n/routing";
import styles from "./BlogPost.module.css";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

function createTranslator(dictionary: Record<string, any>) {
  return (key: string): string => {
    const value = key.split(".").reduce<any>((current, part) => current?.[part], dictionary);
    return typeof value === "string" ? value : key;
  };
}

export async function generateStaticParams() {
  const langs = ["es", "en", "fr", "pt"];
  const params = [];
  
  for (const lang of langs) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "No encontrado" };
  }

  return {
    title: `${post.title} - Echopoint AI`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const posts = getBlogPosts(lang);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const dictionary = getDictionary(lang);
  const t = createTranslator(dictionary);

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <AnimationObserver />
      <Navbar />

      <main id="main-content" className="container section" style={{ paddingTop: "8rem" }}>
        <article className={`${styles.blogPost} fade-in-up`}>
          <header className={styles.articleHeader}>
            <Link
              href={getLocalizedPath(lang, "/blog")}
              style={{ display: "inline-block", marginBottom: "2rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> {t("insights.backToBlog")}
            </Link>
            <br />
            <span className={styles.articleCategory}>{post.category}</span>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <div className={styles.articleMeta}>
              <span><FontAwesomeIcon icon={faCalendarDays} /> {post.date}</span>
              <span><FontAwesomeIcon icon={faClock} /> 5 {t("insights.minRead")}</span>
            </div>
          </header>

          <div className={styles.articleFeaturedImageContainer}>
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              className={styles.articleFeaturedImage}
              priority
            />
          </div>

          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{
              __html: post.content || `<p class="lead" style="font-size: 1.3rem; font-weight: 500; color: var(--text-primary); margin-bottom: 3rem;">${post.excerpt}</p><p>${t("insights.comingSoon")}</p>`,
            }}
          />

          <div className={styles.articleAuthor}>
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt={post.author}
              className={styles.authorAvatar}
              width={100}
              height={100}
            />
            <div className={styles.authorInfo}>
              <h3>{post.author}</h3>
              <p>{t("insights.authorBio")}</p>
            </div>
          </div>

          <div className={styles.articleNav}>
            <div className={styles.navItem}></div>
            <div className={`${styles.navItem} ${styles.navItemNext}`}>
              {nextPost && (
                <>
                  <span>{t("insights.nextArticle")}</span>
                  <Link href={getLocalizedPath(lang, `/blog/${nextPost.slug}`)} title={nextPost.title}>
                    {nextPost.title} <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
