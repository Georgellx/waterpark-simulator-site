import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { GuideGrid } from "@/components/guide-grid";

export const metadata: Metadata = {
  title: { absolute: "Waterpark Simulator Guides" },
  description:
    "Choose a source-checked Waterpark Simulator guide for multiplayer, staff, or current PC and console platforms.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <section className="guide-hub-hero" aria-labelledby="guides-title">
        <div className="page-container">
          <p className="eyebrow">Three source-checked guides</p>
          <h1 id="guides-title">Start with the answer you need</h1>
          <p>
            Start with multiplayer limits, staff and Security changes, or the
            current official PC and console listings. Each page shows its
            sources and unresolved questions.
          </p>
        </div>
      </section>
      <section className="guide-hub-content" aria-label="Guide layouts">
        <div className="page-container">
          <p className="hub-note">
            <BadgeCheck aria-hidden="true" size={18} /> Sources reviewed Aug
            12, 2026. Unknowns remain visible instead of being guessed.
          </p>
          <GuideGrid />
        </div>
      </section>
    </>
  );
}
