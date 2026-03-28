import { ArticleDetail } from "../types/types.front";

type ArticlePageOverride = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  content?: string;
  publishedAt?: string;
  updatedAt?: string;
  schema?: {
    headline?: string;
    authorName?: string;
    datePublished?: string;
    dateModified?: string;
  };
};

const emailMarketingSaasContent = `## Що таке email-маркетинг для SaaS

Email-маркетинг для SaaS - це системна комунікація з користувачем на кожному етапі життєвого циклу: від реєстрації до повторних оплат і зниження відтоку. Його завданням є не лише інформування, а й активація, утримання та повернення користувачів у продукт.

## Основні етапи email-воронки

Для SaaS email-воронка зазвичай складається з welcome-етапу, активації, регулярної підтримки цінності продукту та retention-комунікації. На кожному етапі листи мають підштовхувати користувача до наступної цільової дії: завершити онбординг, спробувати ключову функцію, оформити підписку або повернутися після зниження активності.

## Сегментація користувачів у SaaS

Сегментація дає змогу не надсилати однакові листи всім підряд. Для SaaS-команди базовими сегментами є нові реєстрації, trial-користувачі, активні платні клієнти, неактивні акаунти та користувачі з ризиком churn. Додатково варто враховувати роль користувача, тариф, джерело залучення та події всередині продукту.

## Типи email-кампаній (welcome, activation, retention)

Welcome-листи знайомлять із цінністю продукту та скорочують шлях до першого успіху. Activation-сценарії підказують, які кроки треба пройти, щоб користувач швидше відчув користь від сервісу. Retention-кампанії допомагають утримувати інтерес, нагадують про ключові функції, повертають неактивних користувачів і знижують відтік.

## Ключові метрики (open rate, click rate, churn)

Open rate показує, наскільки тема листа та репутація домену мотивують відкрити повідомлення. Click rate допомагає оцінити, чи достатньо релевантними є контент і заклик до дії. Для SaaS важливо також відстежувати activation rate, конверсію в оплату та churn, щоб бачити реальний вплив email-каналу на продуктове зростання.

## Типові помилки в email-маркетингу

Серед поширених помилок - відсутність сегментації, надто часті розсилки, слабкі сценарії онбордингу та фокус лише на open rate без зв'язку з бізнес-метриками. Ще одна типова проблема - надсилання листів без урахування поведінки користувача, через що комунікація втрачає релевантність і не підтримує продуктову воронку.`;

const overrides: Record<string, ArticlePageOverride> = {
  "email-marketing-saas-it": {
    metaTitle: "Email-маркетинг для SaaS: воронка, сегментація та метрики",
    metaDescription:
      "Дізнайтесь, як побудувати ефективну email-воронку для SaaS. Сегментація, сценарії та метрики для росту продукту. Почніть оптимізацію вже сьогодні!",
    canonicalUrl: "https://mynewsitseoblog.pp.ua/articles/email-marketing-saas-it",
    content: emailMarketingSaasContent,
    publishedAt: "2026-03-03T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z",
    schema: {
      headline: "Email-маркетинг для SaaS: воронка для IT-команди",
      authorName: "Ira Maryshchak",
      datePublished: "2026-03-03",
      dateModified: "2026-03-10",
    },
  },
};

export function getArticlePageOverride(slug: string) {
  return overrides[slug];
}

export function applyArticlePageOverride(article: ArticleDetail): ArticleDetail {
  const override = getArticlePageOverride(article.slug);

  if (!override) {
    return article;
  }

  return {
    ...article,
    meta_title: override.metaTitle ?? article.meta_title,
    meta_description: override.metaDescription ?? article.meta_description,
    content: override.content ?? article.content,
    published_at: override.publishedAt ?? article.published_at,
    updated_at: override.updatedAt ?? article.updated_at,
  };
}
