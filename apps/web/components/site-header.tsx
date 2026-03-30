"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="shell site-header">
      {isHome ? (
        <span className="brand">IT Blog</span>
      ) : (
        <Link href="/" className="brand">
          IT Blog
        </Link>
      )}
      <nav className="nav">
        {isHome ? (
          <span className="active-nav-item">Головна</span>
        ) : (
          <Link href="/">Головна</Link>
        )}
        <Link href="/about">Про нас</Link>
        <Link href="/search">Пошук</Link>
        <Link href="/admin">Адмінка</Link>
      </nav>
    </header>
  );
}
