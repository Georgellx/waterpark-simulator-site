import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

function ResponsiveTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll" role="region" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

const components = {
  table: ResponsiveTable,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
