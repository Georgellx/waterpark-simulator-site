declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { GuidePage } from "@/lib/content/types";

  export const guide: GuidePage;

  const MDXContent: ComponentType;
  export default MDXContent;
}
