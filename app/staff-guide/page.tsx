import type { Metadata } from "next";
import StaffGuide, { guide } from "@/content/guides/staff-guide.mdx";
import { ArticleShell } from "@/components/article-shell";

export const metadata: Metadata = {
  title: { absolute: guide.title },
  description: guide.description,
  alternates: { canonical: "/staff-guide" },
};

export default function StaffGuidePage() {
  return (
    <ArticleShell guide={guide}>
      <StaffGuide />
    </ArticleShell>
  );
}
