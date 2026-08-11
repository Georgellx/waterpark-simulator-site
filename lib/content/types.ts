export interface GuideSection {
  id: string;
  title: string;
}

export interface SourceCitation {
  title: string;
  url: string;
  identity:
    | "official"
    | "platform"
    | "developer-identified"
    | "third-party"
    | "community";
  retrievedAt: string;
  versionPlatformScope: string;
  boundary: string;
}

export interface GuidePage {
  slug: "multiplayer-guide" | "staff-guide" | "console-platforms-guide";
  title: string;
  description: string;
  quickAnswer: string;
  checkedAt: string;
  scope: string;
  status: "source-checked" | "source-checked-with-unknowns";
  sections: GuideSection[];
  unknowns: string[];
  sources: SourceCitation[];
  updateTrigger: string[];
}
