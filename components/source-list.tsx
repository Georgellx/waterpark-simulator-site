import { ExternalLink } from "lucide-react";
import type { SourceCitation } from "@/lib/content/types";

const identityLabels: Record<SourceCitation["identity"], string> = {
  official: "Official developer source",
  platform: "Official platform listing",
  "developer-identified": "Developer-identified statement",
  "third-party": "Third-party observation",
  community: "Community observation",
};

interface SourceListProps {
  sources: SourceCitation[];
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <ol className="source-list">
      {sources.map((source) => (
        <li key={source.url}>
          <div className="source-heading">
            <a href={source.url} rel="noreferrer" target="_blank">
              {source.title}
              <ExternalLink aria-hidden="true" size={15} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span>{identityLabels[source.identity]}</span>
          </div>
          <dl className="source-details">
            <div>
              <dt>Retrieved</dt>
              <dd>{source.retrievedAt}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{source.versionPlatformScope}</dd>
            </div>
            <div>
              <dt>Boundary</dt>
              <dd>{source.boundary}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}
