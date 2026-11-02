import { Divider, IconBadge } from "@/shared/ui";
import { ResumeEditorForm } from "@/features/resume/resume-editor/ui/ResumeEditorForm";
import { ResumeEditorNavigation } from "@/features/resume/resume-editor/ui/ResumeEditorNavigation";

export function ResumeEditorView({ onPreview }: { onPreview: () => void }) {
  return (
    <>
      <ol aria-label="Шаги заполнения резюме" className="mb-7 flex flex-wrap items-center gap-4">
        <li aria-current="step" className="flex items-center gap-3 text-sm font-semibold">
          <IconBadge size={32} shape="circle">
            <span>1</span>
          </IconBadge>
          Данные
        </li>
        <li aria-hidden="true" className="flex items-center">
          <Divider className="w-10" />
        </li>
        <li className="flex items-center gap-3 text-sm text-text-soft">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-text-soft/60">
            2
          </span>
          Превью и ревью
        </li>
      </ol>

      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,2.8fr)]">
        <ResumeEditorForm onPreview={onPreview} />
        <ResumeEditorNavigation onPreview={onPreview} />
      </div>
    </>
  );
}
