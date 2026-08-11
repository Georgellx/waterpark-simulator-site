import { Brand } from "@/components/brand";
import { Navigation } from "@/components/navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <Brand />
        <Navigation />
      </div>
    </header>
  );
}
