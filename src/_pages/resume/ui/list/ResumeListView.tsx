import { Button, Card } from "@/shared/ui";
import { InfoIcon, PlusIcon } from "@/shared/ui/icons";
import { ResumeCard } from "../../../../entities/resume/ui/ResumeCard";
import type { ResumeListItem } from "../../../../entities/resume/model/resume-list.types";

type ResumeListViewProps = {
  resumes: ResumeListItem[];
  onCreate: () => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
  onActivate?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ResumeListView({
  resumes,
  onCreate,
  onEdit,
  onPreview,
  onActivate,
  onDelete,
}: ResumeListViewProps) {
  return (
    <div className="grid gap-6">
      <div>
        <Button
          type="button"
          onClick={onCreate}
          className="w-full rounded-lg font-semibold sm:w-auto sm:min-w-56"
        >
          <PlusIcon className="h-5 w-5 shrink-0" />
          Создать резюме
        </Button>
      </div>

      {resumes.length > 0 ? (
        <ul aria-label="Ваши резюме" className="grid items-stretch gap-6 md:grid-cols-2">
          {resumes.map((resume) => (
            <li key={resume.id} className="min-w-0">
              <ResumeCard
                resume={resume}
                onEdit={onEdit}
                onPreview={onPreview}
                onActivate={onActivate}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Card className="grid gap-2 rounded-xl px-6 py-10 text-center">
          <h2 className="text-lg font-semibold">У вас пока нет резюме</h2>
          <p className="text-sm leading-6 text-text-soft">
            Создайте первое резюме — начните с рассказа о своём опыте.
          </p>
        </Card>
      )}

      {/* TODO: ВЫНЕСТИ В SHARED */}
      <Card className="flex flex-col items-start gap-4 rounded-xl bg-accent-soft/80 p-5 sm:flex-row sm:p-6">
        <InfoIcon className="mt-0.5 h-7 w-7 shrink-0 text-accent" />
        <div className="min-w-0">
          <h2 className="text-base font-bold">Что значит «активное»?</h2>
          <p className="mt-2 text-sm leading-6 text-text-soft">
            Вы можете хранить несколько резюме. Для персонализации используется одно. При смене
            активного предложим пересчитать навыки.
          </p>
        </div>
      </Card>
    </div>
  );
}
