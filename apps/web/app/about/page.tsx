import Link from "next/link";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Про нас",
  description: "Команда IT Blog, редакційна політика, контакти та соціальні канали.",
  path: "/about"
});

const foundedAt = "20 лютого 2026 року";
const founders = [
  {
    name: "Ira Maryshchak",
    linkedin: "https://www.linkedin.com/in/ira-maryshchak-01151b300/",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQGiNart2J3dHw/profile-displayphoto-shrink_400_400/B4EZPWJM2LHAAs-/0/1734464557206?e=1774483200&v=beta&t=P4z5UzdijM598jRU2XZnN4F-YwY3UhO_sz-cJWaalws"
  },
  {
    name: "Діана Гуцуляк",
    linkedin: "https://www.linkedin.com/in/diana-hutsuliak-0616622bb/",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGJS5PXvoqs2w/profile-displayphoto-scale_400_400/B4DZp0VkVzGkAg-/0/1762888403375?e=1774483200&v=beta&t=GniDbM6pzQ0jYF-UUg7sPY34ZDkJ4if3u2x6SUuyr8M"
  },
  {
    name: "Віталіна Корчова",
    linkedin: "https://www.linkedin.com/in/vitalina-korchova-085196304/",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQGBAX8rR5Q9Hg/profile-displayphoto-shrink_400_400/B4DZS9a7z6HYAg-/0/1738344743341?e=1774483200&v=beta&t=AMixqWooNquNSL14-r7u14kCyeKsV9uBCkoKYDyqCww"
  }
];

export default function AboutPage() {
  return (
    <section className="stack">
      <article className="hero">
        <p>Проєкт</p>
        <h1>IT Blog</h1>
        <p>
          IT Blog - український блог про веброзробку, AI, DevOps та кібербезпеку для
          розробників, студентів і технічних команд, яким потрібні практичні, перевірені матеріали.
        </p>
      </article>

      <article className="card">
        <h2>Місія та редакційна політика</h2>
        <p>
          Наша місія - створювати практичний український контент для ІТ-спільноти, який
          допомагає швидше приймати технічні та продуктові рішення в реальних проєктах.
        </p>
        <p>
          Ми фокусуємось на матеріалах, що мають прикладну цінність: покрокові інструкції,
          перевірені підходи, порівняння інструментів та типові помилки, які варто уникати
          під час розробки, менеджменту та маркетингу в ІТ.
        </p>
        <p>
          Перед публікацією кожен матеріал проходить редакційну перевірку: факти звіряємо
          з офіційною документацією та надійними джерелами, уточнюємо терміни й формулювання,
          додаємо дату публікації та дату останнього оновлення для прозорості.
        </p>
        <p>
          Якщо в статті зʼявляється застаріла інформація, ми оновлюємо контент і фіксуємо
          зміни, щоб читачі завжди отримували актуальні рекомендації. Окрема увага приділяється
          етиці: не публікуємо маніпулятивний контент і чітко позначаємо авторство матеріалів.
        </p>
      </article>

      <article className="card">
        <h2>Контакти</h2>
        <p>
          Email редакції:{" "}
          <a href="mailto:editor@mynewsitseoblog.pp.ua">editor@mynewsitseoblog.pp.ua</a>
        </p>
        <p>Дата заснування: {foundedAt}</p>
      </article>

      <article className="card">
        <h2>Засновниці проєкту (LinkedIn)</h2>
        <div className="founder-list">
          {founders.map((founder) => (
            <a
              key={founder.linkedin}
              className="founder-card"
              href={founder.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              {founder.avatar ? (
                <img
                  src={founder.avatar}
                  alt={`Фото ${founder.name}`}
                  className="founder-avatar"
                />
              ) : null}
              <span>{founder.name}</span>
            </a>
          ))}
        </div>
        <p>
          Дивіться також сторінки авторів у розділі{" "}
          <Link href="/authors/ira-maryshchak">профілів команди</Link>.
        </p>
      </article>
    </section>
  );
}
