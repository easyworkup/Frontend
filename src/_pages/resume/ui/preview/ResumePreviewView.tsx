import type { ResumeView } from "@/entities/resume";
import { ResumePreview } from "@/features/resume/review/ui/ResumePreview";
import ResumeReviewPanel from "@/features/resume/review/ui/ResumeReviewPanel";
import { Button, Divider, IconBadge } from "@/shared/ui";
import { ArrowUpRightIcon, CheckIcon, FileTextIcon } from "@/shared/ui/icons";

type ResumePreviewViewProps = {
  resume: ResumeView;
  onCompare: () => void;
};

export function ResumePreviewView({ resume, onCompare }: ResumePreviewViewProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <IconBadge size={30} tone="accentSoft">
              <CheckIcon />
            </IconBadge>
            <span>Данные</span>
          </div>

          <div className="flex items-center">
            <Divider orientation="horizontal" className="w-8 shrink-0" />
          </div>

          <div className="flex items-center gap-2">
            <IconBadge size={30}>
              <span>2</span>
            </IconBadge>
            <span className="text-accent">Превью и ревью</span>
          </div>
        </div>

        <Button type="button" variant="outline" size="sm" onClick={onCompare}>
          Сравнить с вакансией
          <ArrowUpRightIcon className="h-4 w-4 shrink-0" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-2 py-4 md:grid-cols-[minmax(0,8fr)_minmax(0,3fr)]">
        <div className="flex min-w-0 items-center justify-between gap-2 md:col-start-1 md:row-start-1">
          <div className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4 shrink-0" />
            Превью резюме
          </div>
          <span className="text-sm font-medium text-text-soft">Документ</span>
        </div>

        <div className="min-w-0 md:col-start-1 md:row-start-2">
          <ResumePreview resume={resume} className="w-full" />
          <div className="flex items-center justify-center py-6 text-text-soft">
            <p>Проверьте контакты и формулировки перед отправкой</p>
          </div>
        </div>

        <div className="mt-4 min-w-0 md:col-start-2 md:row-start-2 md:mt-0">
          <ResumeReviewPanel />
        </div>
      </div>
    </>
  );
}
