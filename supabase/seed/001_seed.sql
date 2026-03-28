update users
set
  name = 'Діана Гуцуляк',
  slug = 'diana-developer',
  email = 'diana@itblog.local',
  bio = 'Project Manager в ІТ з практичним досвідом ведення продуктових і сервісних команд. У блозі ділиться підходами до планування, пріоритезації та командної комунікації.',
  avatar_url = 'https://media.licdn.com/dms/image/v2/D4D03AQGJS5PXvoqs2w/profile-displayphoto-scale_400_400/B4DZp0VkVzGkAg-/0/1762888403375?e=1774483200&v=beta&t=GniDbM6pzQ0jYF-UUg7sPY34ZDkJ4if3u2x6SUuyr8M',
  linkedin_url = 'https://www.linkedin.com/in/diana-hutsuliak-0616622bb/',
  github_url = 'https://github.com/diana-developer',
  is_admin = false
where slug = 'andrii-developer' or email = 'andrii@itblog.local';

update users
set
  name = 'Віталіна Корчова',
  slug = 'vitalina-korchova',
  email = 'vitalina@itblog.local',
  bio = 'Backend-розробниця, спеціалізується на API, PostgreSQL і cloud-інфраструктурі. Пише практичні матеріали про надійні серверні рішення для продакшену.',
  avatar_url = 'https://media.licdn.com/dms/image/v2/D4D03AQGBAX8rR5Q9Hg/profile-displayphoto-shrink_400_400/B4DZS9a7z6HYAg-/0/1738344743341?e=1774483200&v=beta&t=AMixqWooNquNSL14-r7u14kCyeKsV9uBCkoKYDyqCww',
  linkedin_url = 'https://www.linkedin.com/in/vitalina-korchova-085196304/',
  github_url = null,
  is_admin = false
where slug = 'vitalina-korchova' or email = 'vitalina@itblog.local';

insert into users (name, slug, email, password, bio, avatar_url, linkedin_url, github_url, is_admin)
values
  (
    'Ira Maryshchak',
    'ira-maryshchak',
    'admin@itblog.local',
    '$2b$10$FfUz8to1feczZAICfI7X9eoHc07AnieJRWsQYMS3MvKWuxdoL1iE2',
    'Маркетолог в ІТ та контент-стратегиня. Пише про SEO, контент-маркетинг, аналітику та зростання технологічних продуктів.',
    'https://media.licdn.com/dms/image/v2/D4E03AQGiNart2J3dHw/profile-displayphoto-shrink_400_400/B4EZPWJM2LHAAs-/0/1734464557206?e=1774483200&v=beta&t=P4z5UzdijM598jRU2XZnN4F-YwY3UhO_sz-cJWaalws',
    'https://www.linkedin.com/in/ira-maryshchak-01151b300/',
    'https://github.com/iramaryshchak',
    true
  ),
  (
    'Діана Гуцуляк',
    'diana-developer',
    'diana@itblog.local',
    '$2b$10$FfUz8to1feczZAICfI7X9eoHc07AnieJRWsQYMS3MvKWuxdoL1iE2',
    'Project Manager в ІТ з практичним досвідом ведення продуктових і сервісних команд. У блозі ділиться підходами до планування, пріоритезації та командної комунікації.',
    'https://media.licdn.com/dms/image/v2/D4D03AQGJS5PXvoqs2w/profile-displayphoto-scale_400_400/B4DZp0VkVzGkAg-/0/1762888403375?e=1774483200&v=beta&t=GniDbM6pzQ0jYF-UUg7sPY34ZDkJ4if3u2x6SUuyr8M',
    'https://www.linkedin.com/in/diana-hutsuliak-0616622bb/',
    'https://github.com/diana-developer',
    false
  ),
  (
    'Віталіна Корчова',
    'vitalina-korchova',
    'vitalina@itblog.local',
    '$2b$10$FfUz8to1feczZAICfI7X9eoHc07AnieJRWsQYMS3MvKWuxdoL1iE2',
    'Backend-розробниця, спеціалізується на API, PostgreSQL і cloud-інфраструктурі. Пише практичні матеріали про надійні серверні рішення для продакшену.',
    'https://media.licdn.com/dms/image/v2/D4D03AQGBAX8rR5Q9Hg/profile-displayphoto-shrink_400_400/B4DZS9a7z6HYAg-/0/1738344743341?e=1774483200&v=beta&t=AMixqWooNquNSL14-r7u14kCyeKsV9uBCkoKYDyqCww',
    'https://www.linkedin.com/in/vitalina-korchova-085196304/',
    null,
    false
  )
on conflict (email) do update
set
  name = excluded.name,
  slug = excluded.slug,
  password = excluded.password,
  bio = excluded.bio,
  avatar_url = excluded.avatar_url,
  linkedin_url = excluded.linkedin_url,
  github_url = excluded.github_url,
  is_admin = excluded.is_admin;

update users
set
  bio = coalesce(
    bio,
    'Автор IT Blog. Публікує практичні матеріали на основі реального досвіду в розробці та підтримці веб-проєктів.'
  ),
  linkedin_url = coalesce(linkedin_url, 'https://www.linkedin.com/in/' || slug),
  github_url = coalesce(github_url, 'https://github.com/' || slug);

insert into categories (name, slug, description)
values
  ('JavaScript / Frontend', 'javascript-frontend', 'Новини та практики frontend-розробки.'),
  ('Backend та DevOps', 'backend-devops', 'Серверна розробка, хостинг та автоматизація.'),
  ('Штучний інтелект та ML', 'ai-ml', 'Моделі, інструменти та AI-практика.'),
  ('Кібербезпека', 'cybersecurity', 'Новини та огляди з безпеки.'),
  ('Огляди інструментів', 'tooling', 'Порівняння сервісів та стеків.')
on conflict (slug) do nothing;

insert into tags (name, slug)
values
  ('React', 'react'),
  ('Next.js', 'nextjs'),
  ('Supabase', 'supabase'),
  ('PostgreSQL', 'postgresql'),
  ('SEO', 'seo'),
  ('Node.js', 'nodejs'),
  ('Маркетинг в ІТ', 'it-marketing'),
  ('Project Management', 'project-management'),
  ('Розробка', 'development')
on conflict (slug) do update
set name = excluded.name;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Як побудувати SSR-блог на Next.js та Supabase',
  'ssr-blog-nextjs-supabase',
  'Покроковий розбір архітектури блогу з фокусом на SEO.',
  'У цій статті показую покрокову архітектуру SEO-блогу на Next.js App Router, Express API та Supabase PostgreSQL.

Спочатку визначаємо відповідальність кожного шару: Next.js відповідає за SSR, metadata і швидкий рендер сторінок, Express - за бізнес-логіку та адмінські ендпоінти, Supabase - за надійне зберігання даних і файлів.

Далі розбираємо структуру таблиць, індекси для публікацій і тегів, а також підхід до кешування запитів, щоб головна сторінка відкривалась швидко навіть при рості кількості статей.

Окремо даю чек-ліст продакшен-підготовки: sitemap, robots, canonical, OpenGraph, коректний CORS і контроль помилок у API.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  u.id,
  c.id,
  'published',
  128,
  'SSR блог на Next.js та Supabase',
  'Архітектура SEO-блогу з React, Express та Supabase.',
  now() - interval '2 days'
from users u, categories c
where u.slug = 'ira-maryshchak' and c.slug = 'javascript-frontend'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'SEO Optimization Guide for Beginners',
  'seo-optimization-guide',
  'Learn SEO optimization step by step and improve your website ranking with practical tips, tools, and beginner-friendly strategies.',
  'SEO optimization helps search engines understand your content and helps people find your website faster. This guide explains the basics you need to build stronger rankings without getting lost in jargon.

## What is SEO Optimization

SEO optimization is the process of improving your pages so they appear more clearly in search results. It combines content quality, search intent, page structure, and technical performance.

## On-Page SEO Basics

Start with a clear title, one strong H1, descriptive meta tags, and content that answers the main query directly. Use related keywords naturally and keep internal links helpful for readers.

## Technical SEO Tips

Make sure your pages load quickly, work well on mobile, and include canonical URLs, structured data, and clean site architecture. Search engines reward pages that are easy to crawl and easy to trust.

## Common SEO Mistakes

Avoid keyword stuffing, duplicate titles, missing meta descriptions, and weak page hierarchy. Small technical issues can limit strong content if they are left unresolved.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  u.id,
  c.id,
  'published',
  0,
  'SEO Optimization Guide: Improve Your Website Ranking Fast',
  'Learn SEO optimization step by step and improve your website ranking. Practical tips, tools, and strategies for beginners. Start optimizing today!',
  timestamp '2026-03-20 00:00:00'
from users u, categories c
where u.slug = 'diana-developer' and c.slug = 'tooling'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Підключення PostgreSQL у Supabase для командного блогу',
  'postgresql-supabase-it-blog',
  'Що потрібно налаштувати для стабільної роботи бази даних у студентському проєкті.',
  'Цей матеріал присвячений практичному підключенню PostgreSQL через Supabase для командного IT-блогу.

Розбираємо, як побудувати схему users, articles, categories, tags та article_tags так, щоб вона залишалась простою для команди і масштабованою для майбутніх задач.

Пояснюю, навіщо потрібні індекси по slug, status, published_at і author_id, та як вони впливають на швидкість фільтрів на публічній частині сайту.

Також показую використання Supabase Storage для обкладинок, політики доступу та seed-скрипт для стабільного локального і staging-середовища.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
  u.id,
  c.id,
  'published',
  94,
  'PostgreSQL у Supabase для IT Blog',
  'Структура бази даних і практика інтеграції Supabase у блог.',
  now() - interval '1 day'
from users u, categories c
where u.slug = 'vitalina-korchova' and c.slug = 'backend-devops'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Контент-маркетинг для IT-продукту: з чого почати',
  'content-marketing-it-start',
  'Практичний план запуску контент-маркетингу для IT-команди без зайвих витрат.',
  'Стаття дає базову систему контент-маркетингу для IT-продукту з нуля.

Починаємо з формування портрета аудиторії: хто читає матеріали, які запити вводить у пошук та які проблеми хоче закрити.

Потім збираємо контент-матрицю за етапами воронки, плануємо редакційний календар і визначаємо KPI для кожного формату: стаття, кейс, інтервю, гайд.

У фіналі описано регулярний цикл оновлення: аналізуємо CTR, depth, конверсію і на основі цього пріоритезуємо нові теми.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  u.id,
  c.id,
  'published',
  73,
  'Контент-маркетинг для IT-продукту',
  'Як запустити контент-маркетинг у технологічному проєкті та виміряти результат.',
  now() - interval '10 days'
from users u, categories c
where u.slug = 'ira-maryshchak' and c.slug = 'tooling'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Як просувати IT-блог через SEO-кластери',
  'seo-clusters-it-blog',
  'Розбираємо кластерну структуру контенту, яка приводить цільовий органічний трафік.',
  'У цьому гайді показую, як формувати SEO-кластери для IT-блогу без хаотичного створення статей.

Ми групуємо теми навколо ключових напрямів продукту, визначаємо pillar-сторінки і підтримуючі матеріали, які закривають суміжні запити користувачів.

Окремий акцент на внутрішній перелінковці: як лінкувати статті між собою, щоб посилювати релевантність і збільшувати час взаємодії на сайті.

Наприкінці - шаблон ревізії контенту кожні 60-90 днів для збереження позицій у пошуку.',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  u.id,
  c.id,
  'published',
  81,
  'SEO-кластери для IT-блогу',
  'Практика побудови SEO-кластерів для технологічного блогу.',
  now() - interval '8 days'
from users u, categories c
where u.slug = 'ira-maryshchak' and c.slug = 'javascript-frontend'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Email-маркетинг для SaaS: воронка для IT-команди',
  'email-marketing-saas-it',
  'Гайд по email-воронці для SaaS-продукту: сегментація, сценарії та метрики.',
  'У статті розбираємо email-маркетинг для SaaS-продукту з акцентом на реальні бізнес-метрики.

Пояснюю, як побудувати welcome-ланцюжок для нових реєстрацій, education-серію для активації ключових фіч та retention-сценарії для зниження відтоку.

Також описую підхід до сегментації бази за поведінкою: активні користувачі, неактивні, trial, клієнти з ризиком churn.

Окремо розглядаємо метрики open rate, click rate, activation rate і як інтерпретувати їх для покращення сценаріїв.',
  'https://images.unsplash.com/photo-1557838923-2985c318be48',
  u.id,
  c.id,
  'published',
  67,
  'Email-маркетинг для IT SaaS',
  'Стратегія email-маркетингу для SaaS-проєкту у сфері IT.',
  now() - interval '6 days'
from users u, categories c
where u.slug = 'ira-maryshchak' and c.slug = 'tooling'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Roadmap Project Manager в IT: процеси і пріоритети',
  'roadmap-project-manager-it',
  'Що має бути у roadmap PM: від бізнес-цілей до квартального плану команди.',
  'Ця стаття про те, як Project Manager в IT створює практичний roadmap, який працює в реальній команді.

Розбираємо перехід від бізнес-цілей до квартальних ініціатив, а далі - до конкретних епіків і задач у backlog.

Пояснюю, як оцінювати ризики, залежності між командами та обмеження по ресурсах, щоб план не руйнувався на першому ж спринті.

Додаю підхід до регулярного перегляду roadmap: щомісячний review, оновлення пріоритетів і прозора комунікація зі стейкхолдерами.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978',
  u.id,
  c.id,
  'published',
  58,
  'Roadmap для PM в IT',
  'Практика планування roadmap для project manager у технологічній команді.',
  now() - interval '5 days'
from users u, categories c
where u.slug = 'diana-developer' and c.slug = 'tooling'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Комунікація PM і розробки: як уникати зривів спринту',
  'pm-dev-communication-sprint',
  'Практичні правила комунікації між PM і розробниками для стабільного delivery.',
  'Матеріал присвячений комунікації між PM і розробниками, яка прямо впливає на стабільність delivery.

Показую, як проводити grooming, daily та retro з чіткою структурою, фокусом на рішення і мінімумом шуму.

Розглядаємо типові причини зривів спринту: нечіткі acceptance criteria, зміни scope посеред ітерації, відсутність контексту у команди.

У фіналі - практичний формат статус-комунікації, який допомагає вчасно підсвічувати ризики і не накопичувати технічний борг.',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  u.id,
  c.id,
  'published',
  52,
  'Комунікація PM і dev-команди',
  'Як PM вибудувати ефективну комунікацію з розробниками.',
  now() - interval '4 days'
from users u, categories c
where u.slug = 'diana-developer' and c.slug = 'tooling'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'Архітектура REST API на Node.js для масштабування',
  'rest-api-nodejs-architecture',
  'Патерни проєктування REST API, які спрощують підтримку і масштабування.',
  'У статті розглядаємо архітектуру REST API на Node.js для продуктів, що ростуть.

Починаємо з модульної структури: router, controller, service, repository та окремий шар для валідації вхідних даних.

Пояснюю підхід до єдиного формату помилок, логування, ідемпотентності критичних операцій і версіонування API без болючих міграцій для клієнта.

Окремий блок присвячений продуктивності: індекси, пагінація, обмеження payload та моніторинг повільних запитів.',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
  u.id,
  c.id,
  'published',
  69,
  'REST API на Node.js: архітектура',
  'Практичний підхід до побудови надійного REST API у Node.js.',
  now() - interval '3 days'
from users u, categories c
where u.slug = 'vitalina-korchova' and c.slug = 'backend-devops'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

insert into articles (
  title,
  slug,
  excerpt,
  content,
  cover_url,
  author_id,
  category_id,
  status,
  views,
  meta_title,
  meta_description,
  published_at
)
select
  'TypeScript у backend: практичні правила для чистого коду',
  'typescript-backend-clean-code',
  'Як використовувати TypeScript у backend так, щоб код лишався читабельним і безпечним.',
  'Цей гайд показує, як використовувати TypeScript у backend так, щоб типи реально зменшували кількість помилок.

Покроково розбираємо типізацію DTO, domain-моделей і відповідей API, а також правила для сервісного шару без надмірної складності.

Пояснюю, як підтримувати стабільні контракти між сервером і клієнтом, щоб зміни в backend не ламали фронтенд у продакшені.

Наприкінці даю практичні поради для рефакторингу: strict mode, контроль any, типобезпечні утиліти та перевірки у CI.',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  u.id,
  c.id,
  'published',
  64,
  'TypeScript для backend-розробки',
  'Набір практик TypeScript для backend-команд.',
  now() - interval '2 days'
from users u, categories c
where u.slug = 'vitalina-korchova' and c.slug = 'backend-devops'
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_url = excluded.cover_url,
  author_id = excluded.author_id,
  category_id = excluded.category_id,
  status = excluded.status,
  views = excluded.views,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  published_at = excluded.published_at;

update articles a
set author_id = u.id
from users u, categories c
where u.slug = 'vitalina-korchova'
  and c.slug = 'backend-devops'
  and a.category_id = c.id
  and a.status = 'published';

delete from article_tags
where article_id in (
  select id from articles where slug in (
    'ssr-blog-nextjs-supabase',
    'postgresql-supabase-it-blog',
    'seo-optimization-guide',
    'content-marketing-it-start',
    'seo-clusters-it-blog',
    'email-marketing-saas-it',
    'roadmap-project-manager-it',
    'pm-dev-communication-sprint',
    'rest-api-nodejs-architecture',
    'typescript-backend-clean-code'
  )
);

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'ssr-blog-nextjs-supabase'
  and t.slug in ('react', 'nextjs', 'supabase', 'seo')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'content-marketing-it-start'
  and t.slug in ('it-marketing', 'seo')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'seo-clusters-it-blog'
  and t.slug in ('it-marketing', 'seo')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'email-marketing-saas-it'
  and t.slug in ('it-marketing', 'seo')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'roadmap-project-manager-it'
  and t.slug in ('project-management', 'tooling')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'pm-dev-communication-sprint'
  and t.slug in ('project-management', 'tooling')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'rest-api-nodejs-architecture'
  and t.slug in ('development', 'nodejs')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'typescript-backend-clean-code'
  and t.slug in ('development', 'nodejs')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'postgresql-supabase-it-blog'
  and t.slug in ('supabase', 'postgresql', 'nodejs')
on conflict do nothing;

insert into article_tags (article_id, tag_id)
select a.id, t.id
from articles a
cross join tags t
where a.slug = 'seo-optimization-guide'
  and t.slug in ('seo')
on conflict do nothing;
