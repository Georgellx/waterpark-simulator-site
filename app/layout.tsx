import type { Metadata } from "next";
import { Bree_Serif, Manrope } from "next/font/google";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl, isIndexingEnabled } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const breeSerif = Bree_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bree-serif",
});

const siteUrl = getSiteUrl();
const indexingEnabled = isIndexingEnabled();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Waterpark Simulator Guide",
    template: "%s | Waterpark Simulator Guide",
  },
  description:
    "Independent, source-checked Waterpark Simulator guides for multiplayer, staff, and console platforms.",
  robots: {
    index: indexingEnabled,
    follow: indexingEnabled,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${breeSerif.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
        <AnalyticsConsent measurementId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
