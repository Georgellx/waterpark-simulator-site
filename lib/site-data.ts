export type SiteRoute =
  | "/"
  | "/guides"
  | "/multiplayer-guide"
  | "/staff-guide"
  | "/console-platforms-guide";

export type GuideKey = "multiplayer" | "staff" | "platforms";

export interface NavigationItem {
  label: string;
  href: SiteRoute;
}

export interface GuidePreview {
  key: GuideKey;
  eyebrow: string;
  title: string;
  description: string;
  href: Exclude<SiteRoute, "/" | "/guides">;
  image: string;
  imageAlt: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Guides", href: "/guides" },
  { label: "Multiplayer", href: "/multiplayer-guide" },
  { label: "Staff", href: "/staff-guide" },
  { label: "Platforms", href: "/console-platforms-guide" },
];

export const guidePreviews: GuidePreview[] = [
  {
    key: "multiplayer",
    eyebrow: "Play together",
    title: "Multiplayer Guide",
    description:
      "Official player limits, verified hosting scope, recent host controls, and a clearly marked crossplay gap.",
    href: "/multiplayer-guide",
    image: "/images/multiplayer-guide.png",
    imageAlt:
      "Two bright water slides curving together above a turquoise pool.",
  },
  {
    key: "staff",
    eyebrow: "Run the park",
    title: "Staff Guide",
    description:
      "Hiring, staff capacity, Security, and version-by-version staff quitting changes without invented costs.",
    href: "/staff-guide",
    image: "/images/staff-guide.png",
    imageAlt:
      "A tidy waterpark service pavilion with a lifeguard chair and safety equipment.",
  },
  {
    key: "platforms",
    eyebrow: "Choose a platform",
    title: "Console Platforms",
    description:
      "Official PC, PS5, and Xbox Series X|S listings, with unlisted platforms kept explicitly unknown.",
    href: "/console-platforms-guide",
    image: "/images/console-platforms-guide.png",
    imageAlt:
      "Three blank colorful direction signs beside a tropical waterpark pool.",
  },
];

export function getGuidePreview(key: GuideKey): GuidePreview {
  const guide = guidePreviews.find((item) => item.key === key);

  if (!guide) {
    throw new Error(`Missing guide preview: ${key}`);
  }

  return guide;
}
