import Link from "next/link";

interface BreadcrumbsProps {
  category?: {
    name: string;
    slug: string;
  } | null;
  articleTitle?: string;
}

export function Breadcrumbs({ category, articleTitle }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-separator">/</li>
        <li className="breadcrumb-item">
          <Link href="/">Головна</Link>
        </li>
        {category && (
          <>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item">
              <Link href={`/categories/${category.slug}`}>{category.name}</Link>
            </li>
          </>
        )}
        {articleTitle && (
          <>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item active" aria-current="page">
              {articleTitle}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
