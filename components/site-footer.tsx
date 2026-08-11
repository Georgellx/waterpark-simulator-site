import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { navigationItems } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div>
          <Brand footer />
          <p className="footer-copy">
            An independent, source-checked guide to Waterpark Simulator
            multiplayer, staff, and platforms. This site is not affiliated with
            or endorsed by CayPlay.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          {navigationItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="footer-official" aria-label="Official game links">
          <a href="https://waterparksimulator.com/" rel="noreferrer" target="_blank">
            Official game site <ExternalLink aria-hidden="true" size={14} />
          </a>
          <a href="https://discord.gg/waterparksimulator" rel="noreferrer" target="_blank">
            Official Discord <ExternalLink aria-hidden="true" size={14} />
          </a>
          <a href="https://www.youtube.com/@CayPlayStudios" rel="noreferrer" target="_blank">
            Official YouTube <ExternalLink aria-hidden="true" size={14} />
          </a>
        </nav>
      </div>
      <div className="page-container footer-bottom">
        <span>Private MVP · Indexing disabled</span>
        <span>US English · Sources reviewed Aug 11, 2026</span>
      </div>
    </footer>
  );
}
