import Image from "next/image";
import Link from "next/link";

interface BrandProps {
  footer?: boolean;
}

export function Brand({ footer = false }: BrandProps) {
  return (
    <Link
      className={`brand${footer ? " footer-brand" : ""}`}
      href="/"
      aria-label="Waterpark Simulator Guide home"
    >
      <Image
        className="brand-mark"
        src="/brand/site-mark.png"
        alt=""
        width={46}
        height={46}
        priority={!footer}
      />
      <span className="brand-copy">
        <strong>Waterpark Simulator</strong>
        <span>Independent guide</span>
      </span>
    </Link>
  );
}
