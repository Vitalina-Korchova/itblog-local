import Link from "next/link";
import { ArticleViewTracker } from "../../../components/article-view-tracker";
import { ArticleCard } from "../../../components/article-card";
import { getArticle, getRelatedArticles } from "../../../lib/api";
import { buildMetadata } from "../../../lib/seo";
import { ArticlePreview, Tag } from "../../../types/types.front";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return buildMetadata({
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? article.excerpt ?? article.title,
    path: `/articles/${article.slug}`,
    image: article.cover_url,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, related] = await Promise.all([
    getArticle(slug),
    getRelatedArticles(slug),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author?.name,
    image: article.cover_url,
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
                  <Link href={`/authors/${article.author.slug}`}>{article.author.name}</Link>
                </p>
              </div>
              {article.author.bio ? <p className="author-signature-bio">{article.author.bio}</p> : null}
              <div className="author-signature-dates">
                <span className="date-badge published-date">
                  Опубліковано:{" "}
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString("uk-UA")
                    : "Без дати"}
                </span>
                <span className="date-badge updated-date">
                  Оновлено: {new Date(article.updated_at).toLocaleDateString("uk-UA")}
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
        <div className="article-content">{article.content}</div>
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
