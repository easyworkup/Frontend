import { useId } from "react";
import { cn } from "@/shared/lib/cn";
import { Button, Card } from "@/shared/ui";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  FileTextIcon,
  PencilIcon,
  TrashIcon,
} from "@/shared/ui/icons";
import type { ResumeListItem } from "../model/resume-list.types";

type ResumeCardProps = {
  resume: ResumeListItem;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
  onActivate?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ResumeCard({ resume, onEdit, onPreview, onActivate, onDelete }: ResumeCardProps) {
  const titleId = useId();
  const isDraft = resume.status === "draft";
  const showPreview = !isDraft;
  const showActivate = !resume.isActive;

  return (
    <article aria-labelledby={titleId} className="h-full min-w-0">
      <Card
        className={cn(
          "relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl p-5 sm:p-7 lg:p-8",
          resume.isActive &&
            "border-accent after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-accent"
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <span
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
              isDraft ? "bg-warn-soft/70 text-warn" : "bg-accent-soft/80 text-accent"
            )}
          >
            <FileTextIcon className="h-7 w-7" />
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold sm:text-sm",
              resume.isActive || !isDraft
                ? "bg-accent-soft/80 text-accent"
                : "bg-warn-soft/80 text-warn"
            )}
          >
            {resume.isActive ? (
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] border-current">
                <CheckIcon className="h-3 w-3" />
              </span>
            ) : isDraft ? (
              <PencilIcon className="h-4 w-4" />
            ) : (
              <CheckIcon className="h-4 w-4" />
            )}
            {resume.isActive ? "Активное" : isDraft ? "Черновик" : "Готово"}
          </span>
        </div>

        <h2
          id={titleId}
          className="text-xl font-bold leading-snug tracking-tight [overflow-wrap:anywhere] lg:text-2xl"
        >
          {resume.title}
        </h2>
        <p className="mt-3 flex items-start gap-3 text-sm leading-6 text-text-soft">
          <ClockIcon className="mt-0.5 h-5 w-5 shrink-0" />
          {resume.updatedLabel}
        </p>

        <div className="pb-6 pt-5">
          {resume.status === "draft" ? (
            <div className="grid gap-3 py-1">
              <p className="text-sm leading-6 text-text-soft">
                Заполнено {resume.completedSections} из {resume.totalSections} разделов
              </p>
              <div
                role="progressbar"
                aria-label="Заполнение разделов резюме"
                aria-valuemin={0}
                aria-valuemax={resume.totalSections}
                aria-valuenow={resume.completedSections}
                aria-valuetext={`Заполнено ${resume.completedSections} из ${resume.totalSections} разделов`}
                className="flex gap-1"
              >
                {Array.from({ length: resume.totalSections }, (_, index) => (
                  <span
                    key={index}
                    className={cn(
                      "h-2.5 min-w-0 flex-1 rounded",
                      index < resume.completedSections ? "bg-accent" : "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {resume.skills.length > 0 && (
                <ul aria-label="Навыки" className="mb-4 flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <li
                      key={skill}
                      className="max-w-full rounded-lg bg-accent-soft/80 px-3 py-2 text-sm font-medium text-accent [overflow-wrap:anywhere]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              {resume.isActive && (
                <p className="text-sm leading-6 text-text-soft">
                  Для роадмапа и подготовки к интервью.
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-auto border-t border-border pt-5">
          <div className="grid min-w-0 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <Button
              type="button"
              onClick={() => onEdit(resume.id)}
              className="h-auto min-h-12 min-w-0 rounded-lg px-3 py-3 font-semibold"
            >
              {isDraft ? (
                <ArrowRightIcon className="h-5 w-5 shrink-0" />
              ) : (
                <PencilIcon className="h-5 w-5 shrink-0" />
              )}
              {isDraft ? "Продолжить" : "Редактировать"}
            </Button>

            {showPreview && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => onPreview(resume.id)}
                className="h-auto min-h-12 min-w-0 rounded-lg border-accent/40 px-3 py-3 font-semibold"
              >
                <EyeIcon className="h-5 w-5 shrink-0" />
                Превью
              </Button>
            )}

            {showActivate && (
              <Button
                type="button"
                variant="secondary"
                disabled={!onActivate}
                onClick={() => onActivate?.(resume.id)}
                className="h-auto min-h-12 min-w-0 whitespace-normal rounded-lg border-accent/40 px-3 py-3 font-semibold disabled:opacity-100"
              >
                Сделать активным
              </Button>
            )}
          </div>

          <button
            type="button"
            disabled={!onDelete}
            onClick={() => onDelete?.(resume.id)}
            className="mt-4 inline-flex min-h-9 items-center gap-3 rounded text-sm text-text-soft transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent enabled:hover:text-danger disabled:cursor-not-allowed"
          >
            <TrashIcon className="h-5 w-5 shrink-0" />
            Удалить резюме
          </button>
        </div>
      </Card>
    </article>
  );
}
