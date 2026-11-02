import type { SVGProps } from "react";

export function UploadIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 16V3m-5 5 5-5 5 5" />
      <path d="M4 14v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" />
    </svg>
  );
}
