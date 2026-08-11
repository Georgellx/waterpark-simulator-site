import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const expectedRoutes = new Set([
  "/",
  "/guides",
  "/multiplayer-guide",
  "/staff-guide",
  "/console-platforms-guide",
]);

const files = [
  "app/page.tsx",
  "app/guides/page.tsx",
  "app/multiplayer-guide/page.tsx",
  "app/staff-guide/page.tsx",
  "app/console-platforms-guide/page.tsx",
  "app/not-found.tsx",
  "components/navigation.tsx",
  "components/site-footer.tsx",
  "components/home-hero.tsx",
  "components/guide-card.tsx",
  "components/article-shell.tsx",
  "lib/site-data.ts",
];

const hrefPatterns = [
  /href="([^"]+)"/g,
  /href:\s*"([^"]+)"/g,
];
const discovered = new Set();

for (const file of files) {
  const content = await readFile(resolve(file), "utf8");

  for (const pattern of hrefPatterns) {
    for (const match of content.matchAll(pattern)) {
      if (match[1]?.startsWith("/")) {
        discovered.add(match[1]);
      }
    }
  }
}

for (const route of expectedRoutes) {
  const pagePath = route === "/" ? "app/page.tsx" : `app${route}/page.tsx`;
  await access(resolve(pagePath));
}

for (const route of expectedRoutes) {
  if (!discovered.has(route)) {
    throw new Error(`Expected route is not linked: ${route}`);
  }
}

for (const route of discovered) {
  if (!expectedRoutes.has(route)) {
    throw new Error(`Unexpected internal route found: ${route}`);
  }
}

console.log(`Internal links verified: ${[...expectedRoutes].join(", ")}`);
