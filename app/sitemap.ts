import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-config";

const sitemapRoutes = [
  "/",
  "/guides",
  "/multiplayer-guide",
  "/staff-guide",
  "/console-platforms-guide",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return sitemapRoutes.map((route, index) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: "2026-08-12",
    changeFrequency: index < 2 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : index === 1 ? 0.8 : 0.7,
  }));
}
