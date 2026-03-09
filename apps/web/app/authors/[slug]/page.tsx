import { ArticleCard } from "../../../components/article-card";
import { getAuthor, getAuthorArticles } from "../../../lib/api";
import { buildMetadata } from "../../../lib/seo";
import { ArticlePreview } from "../../../types/types.front";

const fallbackLinkedinBySlug: Record<string, string> = {
  "ira-maryshchak": "https://www.linkedin.com/in/ira-maryshchak-01151b300/",
  "diana-developer": "https://www.linkedin.com/in/diana-hutsuliak-0616622bb/",
  "vitalina-korchova": "https://www.linkedin.com/in/vitalina-korchova-085196304/",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  return buildMetadata({
    title: author.name,
    description: author.bio ?? `Профіль автора ${author.name}`,
    path: `/authors/${slug}`,
    image: author.avatar_url,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [author, articles] = await Promise.all([
    getAuthor(slug),
    getAuthorArticles(slug),
  ]);
  const linkedinUrl = author.linkedin_url ?? fallbackLinkedinBySlug[author.slug];
  const githubUrl = author.github_url;

  return (
    <section className="stack">
      <article className="hero author-hero">
        {author.avatar_url ? (
          <img
            src={author.avatar_url}
            alt={`Фото автора ${author.name}`}
            className="author-avatar"
          />
        ) : null}
        <div className="stack">
          <p>Автор</p>
          <h1>{author.name}</h1>
          <p>{author.bio}</p>
          <div className="article-meta">
            <span>{author.articles_count ?? articles.meta.total} опублікованих статей</span>
            <span>
              У команді з{" "}
              {new Date(author.created_at).toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="tag-list">
            {linkedinUrl ? (
              <a className="tag" href={linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
            {githubUrl ? (
              <a className="tag" href={githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </article>
      {articles.data.length === 0 ? (
        <article className="card">
          <h2>Ще немає опублікованих матеріалів</h2>
          <p>Цей автор поки готує нові статті.</p>
        </article>
      ) : null}
      {articles.data.map((article: ArticlePreview) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
}
