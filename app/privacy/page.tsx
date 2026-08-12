import type { Metadata } from "next";
import { analyticsConsentStorageKey } from "@/lib/analytics-consent";

export const metadata: Metadata = {
  title: { absolute: "Privacy | Waterpark Simulator Guide" },
  description:
    "How this independent Waterpark Simulator guide handles analytics choices and basic site data.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="privacy-section">
      <div className="page-container privacy-content">
        <p className="eyebrow">Last updated August 12, 2026</p>
        <h1>Privacy</h1>
        <p className="privacy-intro">
          This fan-made guide does not require an account, comments, or a
          contact form. We do not sell personal information.
        </p>

        <h2>Google Analytics is optional</h2>
        <p>
          Google Analytics is blocked until you select Accept. If you accept,
          the site may send page views and basic device, browser, and
          approximate-location information to Google Analytics. We do not ask
          Google Analytics to collect your name, email address, or payment
          details.
        </p>
        <p>
          If you decline, the Google Analytics tag is not loaded. Your choice
          is saved in your browser under the local-storage key{" "}
          <code>{analyticsConsentStorageKey}</code>. You can reopen Analytics
          settings from the footer and change your choice.
        </p>

        <h2>Hosting and security logs</h2>
        <p>
          When the site is online, hosting and network providers may process
          basic request and security logs needed to deliver and protect the
          website. Those systems are separate from the optional Google
          Analytics tag.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, email{" "}
          <a href="mailto:privacy@waterparksimulatorguide.com">
            privacy@waterparksimulatorguide.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
