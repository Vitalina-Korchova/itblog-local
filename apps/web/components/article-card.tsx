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
        <span>{article.category?.name ?? "Р‘РµР· РєР°С‚РµРіРѕСЂС–С—"}</span>
        <span>
          {article.published_at
            ? new Date(article.published_at).toLocaleDateString("uk-UA")
            : "Р§РµСЂРЅРµС‚РєР°"}
        </span>
      </div>
      <HeadingTag>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </HeadingTag>
      <p>{article.excerpt}</p>
      <div className="card-footer">
        <span>{article.author?.name ?? "РќРµРІС–РґРѕРјРёР№ Р°РІС‚РѕСЂ"}</span>
        <span>{article.views} РїРµСЂРµРіР»СЏРґС–РІ</span>
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
