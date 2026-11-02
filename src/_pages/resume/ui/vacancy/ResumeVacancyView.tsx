import { ReviewPanel, type ReviewPanelProps } from "@/features/resume/review/ui/ReviewPanel";
import { BackLink } from "@/shared/ui";

type ResumeVacancyViewProps = ReviewPanelProps & {
  onBack: () => void;
};

export function ResumeVacancyView({ onBack, ...reviewProps }: ResumeVacancyViewProps) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <BackLink>К превью резюме</BackLink>
      </button>
      <ReviewPanel {...reviewProps} />
    </>
  );
}
