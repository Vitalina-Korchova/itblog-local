import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleViewTracker } from "../../../components/article-view-tracker";
import { ArticleCard } from "../../../components/article-card";
import { getArticle, getRelatedArticles } from "../../../lib/api";
import {
  applyArticlePageOverride,
  getArticlePageOverride,
} from "../../../lib/article-page-overrides";
import { buildMetadata } from "../../../lib/seo";
import { ArticlePreview, Tag } from "../../../types/types.front";

function renderArticleContent(content: string) {
  return content
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index): ReactNode => {
      if (block.startsWith("## ")) {
        return <h2 key={index}>{block.slice(3).trim()}</h2>;
      }

      if (block.startsWith("### ")) {
        return <h3 key={index}>{block.slice(4).trim()}</h3>;
      }

      return <p key={index}>{block}</p>;
    });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = applyArticlePageOverride(await getArticle(slug));
  const override = getArticlePageOverride(article.slug);

  return buildMetadata({
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? article.excerpt ?? article.title,
    path: `/articles/${article.slug}`,
    image: article.cover_url,
    canonicalUrl: override?.canonicalUrl,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [rawArticle, related] = await Promise.all([
    getArticle(slug),
    getRelatedArticles(slug),
  ]);
  const article = applyArticlePageOverride(rawArticle);
  const override = getArticlePageOverride(article.slug);
  const authorName =
    override?.schema?.authorName ??
    (article.slug === "seo-optimization-guide"
      ? "Diana Hutsuliak"
      : article.author?.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: override?.schema?.headline ?? article.title,
    description: article.meta_description ?? article.excerpt ?? article.title,
    datePublished:
      override?.schema?.datePublished ?? article.published_at ?? undefined,
    dateModified: override?.schema?.dateModified ?? article.updated_at,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
          ...(article.author?.slug && {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/authors/${article.author.slug}`,
          }),
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "SEO-оптимізований блог про технології з SSR.",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.slug}`,
    },
    ...(article.cover_url && { image: article.cover_url }),
  };

  return (
    <div className="stack">
      <article className="card">
        <ArticleViewTracker articleId={article.id} />
        <div className="article-meta">
          <span>{article.category?.name}</span>
          <span>
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString("uk-UA")
              : ""}
          </span>
          <span>{article.views} переглядів</span>
        </div>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        {article.author ? (
          <section className="author-signature">
            {article.author.avatar_url ? (
              <img
                src={article.author.avatar_url}
                alt={`Фото автора ${article.author.name}`}
                className="author-avatar"
              />
            ) : null}
            <div className="stack">
              <div className="author-signature-head">
                <p className="author-signature-title">Автор матеріалу</p>
                <p className="author-signature-name">
                  <Link href={`/authors/${article.author.slug}`}>
                    {article.author.name}
                  </Link>
                </p>
              </div>
              {article.author.bio ? (
                <p className="author-signature-bio">{article.author.bio}</p>
              ) : null}
              <div className="author-signature-dates">
                <span className="date-badge published-date">
                  Опубліковано:{" "}
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString("uk-UA")
                    : "Без дати"}
                </span>
                <span className="date-badge updated-date">
                  Оновлено:{" "}
                  {new Date(article.updated_at).toLocaleDateString("uk-UA")}
                </span>
              </div>
            </div>
          </section>
        ) : null}
        <div className="tag-list">
          {article.tags.map((tag: Tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`} className="tag">
              #{tag.name}
            </Link>
          ))}
        </div>
        <div className="article-content">
          {renderArticleContent(article.content)}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>

      <section className="stack">
        <h2>Пов'язані статті</h2>
        {related.map((item: ArticlePreview) => (
          <ArticleCard key={item.id} article={item} />
        ))}
      </section>
    </div>
  );
}
