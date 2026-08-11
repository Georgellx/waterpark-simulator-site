import type { MetadataRoute } from "next";

const indexingEnabled =
  process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(indexingEnabled ? { allow: "/" } : { disallow: "/" }),
    },
  };
}
