"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Category } from "../types/types.front";

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const params = useSearchParams();
  const currentCategory = params.get("category");

  return (
    <div className="filter-row">
      <Link
        href="/"
        className={!currentCategory ? "active-chip" : "chip"}
      >
        Всі
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/?category=${category.slug}`}
          className={
            currentCategory === category.slug ? "active-chip" : "chip"
          }
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
