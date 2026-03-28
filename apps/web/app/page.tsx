import Link from "next/link";
import { ArticleCard } from "../components/article-card";
import { CategoryFilter } from "../components/category-filter";
import { Pagination } from "../components/pagination";
import { getArticles, getCategories } from "../lib/api";
import { buildMetadata } from "../lib/seo";
import { ArticlePreview } from "../types/types.front";

type StructuredTopic = {
  title: string;
  matchSlugs?: string[];
};

type StructuredSection = {
  title: string;
  topics: StructuredTopic[];
};

const structuredSections: StructuredSection[] = [
  {
    title: "Frontend розробка",
    topics: [
      { title: "Tailwind чи Bootstrap: що краще у 2026" },
      { title: "Що таке вкладені маршрути в App Router" },
      {
        title: "Як побудувати SSR-блог на Next.js",
        matchSlugs: ["ssr-blog-nextjs-supabase"],
      },
    ],
  },
  {
    title: "Backend розробка",
    topics: [
      {
        title: "Підключення PostgreSQL у Supabase",
        matchSlugs: ["postgresql-supabase-it-blog"],
      },
      { title: "TypeScript у backend: практичні правила" },
      { title: "Архітектура REST API на Node.js" },
    ],
  },
  {
    title: "DevOps та інфраструктура",
    topics: [{ title: "Vercel vs Netlify: порівняння хостингів" }],
  },
  {
    title: "Project Management",
    topics: [
      { title: "Комунікація PM і розробки" },
      { title: "Roadmap Project Manager в IT" },
    ],
  },
  {
    title: "Digital Marketing",
    topics: [{ title: "Email-маркетинг для SaaS" }],
  },
];

function findArticleByTopic(articles: ArticlePreview[], topic: StructuredTopic) {
  return articles.find((article) => topic.matchSlugs?.includes(article.slug));
}

export const revalidate = 120;
export const metadata = buildMetadata({
  title: "IT Blog",
  description:
    "РћСЃС‚Р°РЅРЅС– РЅРѕРІРёРЅРё Р·С– СЃРІС–С‚Сѓ frontend, backend, AI, DevOps С‚Р° РєС–Р±РµСЂР±РµР·РїРµРєРё.",
  path: "/",
});

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page ?? "1");
  const [categories, articles, allArticles] = await Promise.all([
    getCategories(),
    getArticles({
      category: resolvedSearchParams.category,
      page,
    }),
    getArticles({
      page: 1,
      pageSize: 100,
    }),
  ]);

  return (
    <>
      <section className="hero">
        <p>РќРѕРІРёРЅРё, Р°РЅР°Р»С–С‚РёРєР° С‚Р° РїСЂР°РєС‚РёС‡РЅС– РјР°С‚РµСЂС–Р°Р»Рё РґР»СЏ СЃСѓС‡Р°СЃРЅРѕС— IT-РєРѕРјР°РЅРґРё.</p>
        <h1>SEO-РѕРїС‚РёРјС–Р·РѕРІР°РЅРёР№ Р±Р»РѕРі РїСЂРѕ С‚РµС…РЅРѕР»РѕРіС–С— Р· SSR.</h1>
      </section>
      <section className="topic-outline stack" aria-label="Структура контенту блогу">
        {structuredSections.map((section) => (
          <section key={section.title} className="card topic-section">
            <h2>{section.title}</h2>
            <div className="topic-list">
              {section.topics.map((topic) => {
                const article = findArticleByTopic(allArticles.data, topic);

                return (
                  <article key={topic.title} className="topic-item">
                    <h3>
                      {article ? (
                        <Link href={`/articles/${article.slug}`}>{topic.title}</Link>
                      ) : (
                        topic.title
                      )}
                    </h3>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </section>
      <CategoryFilter categories={categories} />
      <section className="stack">
        <h2>Останні статті</h2>
        <div className="grid">
          {articles.data.map((article: ArticlePreview) => (
            <ArticleCard key={article.id} article={article} headingLevel={3} />
          ))}
        </div>
      </section>
      <Pagination
        page={articles.meta.page}
        pageCount={articles.meta.pageCount}
        basePath={
          resolvedSearchParams.category
            ? `/?category=${resolvedSearchParams.category}&page=`
            : "/?page="
        }
      />
    </>
  );
}
