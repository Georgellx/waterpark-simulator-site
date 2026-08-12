import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { GuideGrid } from "@/components/guide-grid";
import { HomeHero } from "@/components/home-hero";

export const metadata: Metadata = {
  title: {
    absolute: "Waterpark Simulator Guide: Multiplayer, Staff & Platforms",
  },
  description:
    "Source-checked Waterpark Simulator guides for multiplayer, staff, PS5, and Xbox, with dated platform facts, official links, and clearly marked unknowns.",
  keywords: [
    "Waterpark Simulator guide",
    "Waterpark Simulator multiplayer",
    "Waterpark Simulator staff",
    "Waterpark Simulator PS5",
    "Waterpark Simulator Xbox",
  ],
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="guide-section" aria-labelledby="guide-section-title">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Start with what you need</p>
              <h2 id="guide-section-title">Choose the answer you need</h2>
            </div>
            <Link className="text-link" href="/guides">
              View all guides <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <GuideGrid />
        </div>
      </section>

      <section className="trust-section" aria-labelledby="trust-title">
        <div className="page-container">
          <div className="trust-strip">
            <div className="trust-icon" aria-hidden="true">
              <CheckCircle2 size={34} strokeWidth={2.25} />
            </div>
            <div>
              <p className="eyebrow">Built for source-first answers</p>
              <h2 id="trust-title">What we check</h2>
              <p>
                Official pages, developer updates, platform scope, and clearly
                marked unknowns. Every guide shows its check date and the
                limits of each source.
              </p>
            </div>
            <span className="trust-status">Sources reviewed Aug 12, 2026</span>
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-title">
        <div className="page-container about-grid">
          <div className="about-copy">
            <p className="eyebrow">The game, in brief</p>
            <h2 id="about-title">What is Waterpark Simulator?</h2>
            <p>
              Waterpark Simulator is a first-person management simulator from
              CayPlay. You can design a park, build custom slides, manage
              staff, and deal with the unpredictable side of running
              attractions.
            </p>
            <p>
              Version 1.0 added online co-op and expanded staff systems,
              including Security and Mascots. This independent guide separates
              official facts, third-party observations, and unresolved
              questions by date.
            </p>
          </div>
          <dl className="home-facts">
            <div>
              <dt>Developer</dt>
              <dd>CayPlay</dd>
            </div>
            <div>
              <dt>Official listings</dt>
              <dd>PC, PS5, Xbox Series X|S</dd>
            </div>
            <div>
              <dt>Full release</dt>
              <dd>July 31, 2026</dd>
            </div>
            <div>
              <dt>Online session</dt>
              <dd>Up to 4 players</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="official-links-section" aria-labelledby="official-links-title">
        <div className="page-container official-links-row">
          <div>
            <p className="eyebrow">Leave this guide</p>
            <h2 id="official-links-title">Official game links</h2>
          </div>
          <div className="official-links">
            <a href="https://waterparksimulator.com/" rel="noreferrer" target="_blank">
              Game website <ExternalLink aria-hidden="true" size={15} />
            </a>
            <a href="https://store.steampowered.com/app/3293260/Waterpark_Simulator/" rel="noreferrer" target="_blank">
              Steam <ExternalLink aria-hidden="true" size={15} />
            </a>
            <a href="https://store.playstation.com/en-us/concept/10017040" rel="noreferrer" target="_blank">
              PlayStation <ExternalLink aria-hidden="true" size={15} />
            </a>
            <a href="https://www.xbox.com/en-US/games/store/Waterpark-Simulator/9N055WD1VC99" rel="noreferrer" target="_blank">
              Xbox <ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="page-container final-cta-inner">
          <div>
            <p className="eyebrow">Before you invite or buy</p>
            <h2>Get the current answer first</h2>
            <p>
              Start with the sourced multiplayer guide, then use the official
              listings whenever a platform or player limit may have changed.
            </p>
          </div>
          <Link className="primary-button" href="/multiplayer-guide">
            Read the multiplayer guide
            <ArrowRight aria-hidden="true" size={19} />
          </Link>
        </div>
      </section>
    </>
  );
}
