import type { Metadata } from "next";
import { siteUrl } from "./env";

function joinUrl(base: string, path: string) {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");

  return normalizedPath ? `${normalizedBase}/${normalizedPath}` : `${normalizedBase}/`;
}

export function buildMetadata({
  title,
  description,
  path,
  image
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
}): Metadata {
  const url = joinUrl(siteUrl, path);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : []
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : []
    }
  };
}

