"use client";

import { useEffect } from "react";
import { incrementView } from "../lib/api";

export function ArticleViewTracker({ articleId }: { articleId: number }) {
  useEffect(() => {
    void incrementView(articleId).catch(() => {
      // Ignore view tracking errors in UI to avoid runtime crash overlay.
    });
  }, [articleId]);

  return null;
}
