import {
  ArrowRight,
  CalendarDays,
  Gamepad2,
  LifeBuoy,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { GuidePage } from "@/lib/content/types";
import type { GuideKey, GuidePreview } from "@/lib/site-data";

const guideIcons: Record<GuideKey, typeof UsersRound> = {
  multiplayer: UsersRound,
  staff: LifeBuoy,
  platforms: Gamepad2,
};

interface GuideCardProps {
  guide: GuidePreview;
  content: Pick<GuidePage, "checkedAt" | "status">;
}

export function GuideCard({ guide, content }: GuideCardProps) {
  const Icon = guideIcons[guide.key];
  const checkedAt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${content.checkedAt}T00:00:00Z`));

  return (
    <article className="guide-card">
      <div className="card-media">
        <Image
          className="card-image"
          src={guide.image}
          alt={guide.imageAlt}
          fill
          sizes="(max-width: 640px) calc(100vw - 28px), (max-width: 980px) 45vw, 33vw"
        />
        <span className="card-icon" aria-hidden="true">
          <Icon size={20} strokeWidth={2.3} />
        </span>
      </div>
      <div className="card-body">
        <p className="card-kicker">{guide.eyebrow}</p>
        <h3>{guide.title}</h3>
        <p>{guide.description}</p>
        <p className="card-date">
          <CalendarDays aria-hidden="true" size={15} /> Checked {checkedAt} ·{" "}
          {content.status === "source-checked-with-unknowns"
            ? "Unknowns marked"
            : "Source checked"}
        </p>
        <Link className="card-link" href={guide.href}>
          Read guide <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </article>
  );
}
