Посилання на репорти:
- Lab 1: https://docs.google.com/document/d/1oKp3IO_JLganvRo_wgywbPyGLYd8i8s3tjSllRSjhMw/edit?usp=sharing
- Lab 2: https://docs.google.com/document/d/1kgbaLYyMtGTh_esCwoTW5-eqErJSKWSFKBOt_GXDNvY/edit?usp=sharing
- Lab 3: https://docs.google.com/document/d/1uCf4XQVxcBBGDRs9nGfoT-7xTnW2Q-YLRDEl3QJNJGo/edit?usp=sharing
- Lab 4: https://docs.google.com/document/d/1sc8IP6AWW8JEXmJe07miCUZreKrY_WDP-iSl5_q0ia4/edit?usp=sharing




# IT Blog

Монорепозиторій для SEO-орієнтованого IT-блогу зі стеком:

- `apps/web`: Next.js App Router + React + SSR/SSG
- `apps/api`: Express API + JWT + PostgreSQL/Supabase
- `packages/shared`: спільні типи
- `supabase`: SQL-схема, індекси та seed

## Швидкий старт:

Встанови залежності: `npm install`
Запуск: `npm run dev`

Тестовий адміністратор:

- Email: `admin@itblog.local`
- Password: `admin123`

## Структура

- Публічні сторінки: `/`, `/articles/[slug]`, `/categories/[slug]`, `/authors/[slug]`, `/tags/[slug]`, `/search`
- SEO-сторінки: `/sitemap.xml`, `/robots.txt`, `/rss.xml`
- Адмінка: `/admin`, `/admin/articles`, `/admin/categories`, `/admin/tags`, `/admin/authors`
