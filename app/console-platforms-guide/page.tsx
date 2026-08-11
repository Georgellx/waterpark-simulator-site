import type { Metadata } from "next";
import ConsolePlatformsGuide, {
  guide,
} from "@/content/guides/console-platforms-guide.mdx";
import { ArticleShell } from "@/components/article-shell";

export const metadata: Metadata = {
  title: { absolute: guide.title },
  description: guide.description,
  alternates: { canonical: "/console-platforms-guide" },
};

export default function ConsolePlatformsGuidePage() {
  return (
    <ArticleShell guide={guide}>
      <ConsolePlatformsGuide />
    </ArticleShell>
  );
}
