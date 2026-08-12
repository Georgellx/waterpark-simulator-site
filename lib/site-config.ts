const defaultSiteUrl = "https://www.waterparksimulatorguide.com";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/+$/, "");
}

export function isIndexingEnabled() {
  return process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true";
}
