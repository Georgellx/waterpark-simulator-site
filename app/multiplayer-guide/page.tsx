import type { Metadata } from "next";
import MultiplayerGuide, {
  guide,
} from "@/content/guides/multiplayer-guide.mdx";
import { ArticleShell } from "@/components/article-shell";

export const metadata: Metadata = {
  title: { absolute: guide.title },
  description: guide.description,
  alternates: { canonical: "/multiplayer-guide" },
};

export default function MultiplayerGuidePage() {
  return (
    <ArticleShell guide={guide}>
      <MultiplayerGuide />
    </ArticleShell>
  );
}
