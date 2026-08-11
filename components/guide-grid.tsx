import { GuideCard } from "@/components/guide-card";
import { guide as consolePlatformsGuide } from "@/content/guides/console-platforms-guide.mdx";
import { guide as multiplayerGuide } from "@/content/guides/multiplayer-guide.mdx";
import { guide as staffGuide } from "@/content/guides/staff-guide.mdx";
import type { GuidePage } from "@/lib/content/types";
import { guidePreviews } from "@/lib/site-data";

const contentByKey: Record<(typeof guidePreviews)[number]["key"], GuidePage> = {
  multiplayer: multiplayerGuide,
  staff: staffGuide,
  platforms: consolePlatformsGuide,
};

export function GuideGrid() {
  return (
    <div className="guide-grid">
      {guidePreviews.map((guide) => (
        <GuideCard
          content={contentByKey[guide.key]}
          guide={guide}
          key={guide.href}
        />
      ))}
    </div>
  );
}
