import { BadgeCheck, CalendarDays, Layers3 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SourceList } from "@/components/source-list";
import type { GuidePage } from "@/lib/content/types";

interface ArticleShellProps {
  guide: GuidePage;
  children: ReactNode;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function ArticleShell({ guide, children }: ArticleShellProps) {
  const checkedAt = formatDate(guide.checkedAt);

  return (
    <>
      <section className="article-hero-section">
        <div className="page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/guides">Guides</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{guide.title}</span>
          </nav>
          <div className="article-hero">
            <span className="preview-badge">Source-checked guide</span>
            <h1>{guide.title}</h1>
            <p>{guide.description}</p>
            <div className="article-meta" aria-label="Guide status">
              <span className="status-chip">
                <CalendarDays aria-hidden="true" size={15} /> Checked {checkedAt}
              </span>
              <span className="status-chip">
                <BadgeCheck aria-hidden="true" size={15} /> Sources and unknowns
                marked
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="article-body-section">
        <div className="page-container article-layout">
          <article className="article-main">
            <section className="quick-answer-preview" aria-labelledby="quick-answer-title">
              <p className="eyebrow">Quick answer</p>
              <h2 id="quick-answer-title">The current answer</h2>
              <p>{guide.quickAnswer}</p>
            </section>

            <div className="article-prose">{children}</div>

            <section className="article-reference-section" id="unknowns">
              <p className="eyebrow">Evidence boundary</p>
              <h2>What remains unknown</h2>
              <ul>
                {guide.unknowns.map((unknown) => (
                  <li key={unknown}>{unknown}</li>
                ))}
              </ul>
            </section>

            <section className="article-reference-section" id="sources">
              <p className="eyebrow">Evidence</p>
              <h2>Sources used for this page</h2>
              <p className="section-intro">
                Each link opens the original source in a new tab. The boundary
                explains what that source does—and does not—prove.
              </p>
              <SourceList sources={guide.sources} />
            </section>

            <section className="article-reference-section" id="update-triggers">
              <p className="eyebrow">Maintenance</p>
              <h2>When this page needs another check</h2>
              <ul>
                {guide.updateTrigger.map((trigger) => (
                  <li key={trigger}>{trigger}</li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="article-aside" aria-labelledby="aside-title">
            <p className="eyebrow">At a glance</p>
            <h2 id="aside-title">Page status</h2>
            <dl className="article-status-list">
              <div>
                <dt>Last checked</dt>
                <dd>{checkedAt}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Source-checked with unknowns</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{guide.scope}</dd>
              </div>
            </dl>
            <nav aria-label="On this page" className="article-toc">
              <h3>
                <Layers3 aria-hidden="true" size={17} /> On this page
              </h3>
              <ol>
                {guide.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
