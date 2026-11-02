import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type BackLinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
};

export function BackLink({ href, children, className }: BackLinkProps) {
  const classes = cn(
    "inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-soft",
    href && "hover:text-text",
    className
  );

  const content = (
    <>
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {children}
    </>
  );

  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
