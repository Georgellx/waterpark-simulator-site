import { ArrowRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Independent, source-first guide</p>
          <h1 className="hero-title" id="home-title">
            <span>Waterpark Simulator</span>
            <span className="water-word">Guide</span>
          </h1>
          <p className="hero-description">
            Build and manage a water park, create custom slides, hire staff,
            and run a park with friends. Check dated facts and official links
            before relying on older guides.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/multiplayer-guide">
              Check multiplayer facts <ArrowRight aria-hidden="true" size={19} />
            </Link>
            <Link className="secondary-button" href="/console-platforms-guide">
              Compare platforms
            </Link>
          </div>
          <p className="hero-trust">
            <BadgeCheck aria-hidden="true" size={18} />
            Fan-made · Sources reviewed Aug 12, 2026 · Unknowns stay marked
          </p>
        </div>

        <div className="hero-media">
          <Image
            className="hero-image"
            src="/images/waterpark-hero.png"
            alt="A tropical waterpark with blue and yellow slides above a clear turquoise pool."
            fill
            priority
            sizes="(max-width: 980px) calc(100vw - 36px), 58vw"
          />
          <span className="hero-media-label">
            <BadgeCheck aria-hidden="true" size={15} /> Original site artwork
          </span>
        </div>
      </div>
    </section>
  );
}
