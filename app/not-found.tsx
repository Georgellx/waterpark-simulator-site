import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-section">
      <div className="page-container">
        <div className="not-found-card">
          <div className="not-found-code" aria-hidden="true">
            404
          </div>
          <h1>This path is not part of the park</h1>
          <p>
            This page does not exist. Return to the homepage or choose one of
            the source-checked guides.
          </p>
          <div className="not-found-actions">
            <Link className="primary-button" href="/">
              Return home <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="secondary-button" href="/guides">
              View guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
