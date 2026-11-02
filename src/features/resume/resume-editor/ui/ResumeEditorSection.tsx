import type { ReactNode } from "react";
import { Card } from "@/shared/ui";

type ResumeEditorSectionProps = {
  id: string;
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
};

export function ResumeEditorSection({
  id,
  title,
  icon,
  action,
  children,
}: ResumeEditorSectionProps) {
  return (
    <section
      id={`resume-editor-${id}`}
      aria-labelledby={`resume-editor-${id}-title`}
      tabIndex={-1}
      className="scroll-mt-6 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Card className="rounded-xl p-5 sm:p-7 lg:p-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="shrink-0 text-accent">{icon}</span>
          <h2 id={`resume-editor-${id}-title`} className="text-lg font-bold tracking-tight">
            {title}
          </h2>
          {action && <div className="ml-auto">{action}</div>}
        </div>
        {children}
      </Card>
    </section>
  );
}
