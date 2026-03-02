"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "../types/types.front";

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div className="filter-row">
      <button
        className={!params.get("category") ? "active-chip" : "chip"}
        onClick={() => router.push("/")}
        type="button"
      >
        Всі
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={
            params.get("category") === category.slug ? "active-chip" : "chip"
          }
          onClick={() => router.push(`/?category=${category.slug}`)}
          type="button"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
