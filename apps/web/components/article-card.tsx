import Link from "next/link";
import { ArticlePreview, Tag } from "../types/types.front";

type ArticleCardProps = {
  article: ArticlePreview;
  headingLevel?: 2 | 3;
};

export function ArticleCard({
  article,
  headingLevel = 2,
}: ArticleCardProps) {
  const HeadingTag = `h${headingLevel}` as const;

  return (
    <article className="card">
      <div className="card-meta">
        <span>{article.category?.name ?? "Без категорії"}</span>
        <span>
          {article.published_at
            ? new Date(article.published_at).toLocaleDateString("uk-UA")
            : "Чернетка"}
        </span>
      </div>
      <HeadingTag>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </HeadingTag>
      <p>{article.excerpt}</p>
      <div className="card-footer">
        <span>{article.author?.name ?? "Невідомий автор"}</span>
        <span>{article.views} переглядів</span>
      </div>
      <div className="tag-list">
        {article.tags.map((tag: Tag) => (
          <Link key={tag.id} href={`/tags/${tag.slug}`} className="tag">
            #{tag.name}
          </Link>
        ))}
      </div>
    </article>
  );
}
