import type { SVGProps } from "react";

export function GraduationCapIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m2 9 10-5 10 5-10 5Z" />
      <path d="M6 11v6c4 3 8 3 12 0v-6M22 9v7" />
    </svg>
  );
}
