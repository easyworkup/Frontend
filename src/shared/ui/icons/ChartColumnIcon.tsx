import type { SVGProps } from "react";

export function ChartColumnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 21V13h4v8Zm6 0V8h4v13Zm6 0V3h4v18Z" />
    </svg>
  );
}
