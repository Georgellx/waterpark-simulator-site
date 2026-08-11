import type { GuidePage } from "@/lib/content/types";

export function defineGuide(guide: GuidePage): GuidePage {
  if (
    !guide.slug ||
    !guide.title ||
    !guide.quickAnswer ||
    !guide.checkedAt ||
    !guide.scope ||
    guide.sections.length === 0 ||
    guide.unknowns.length === 0 ||
    guide.sources.length === 0 ||
    guide.updateTrigger.length === 0
  ) {
    throw new Error(`Incomplete guide content: ${guide.slug || "unknown"}`);
  }

  return guide;
}
