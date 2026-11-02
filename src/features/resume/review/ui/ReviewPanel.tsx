import { useId } from "react";
import { Button, Card, Divider, ProgressBar } from "@/shared/ui";
import { ArrowUpRightIcon, FileTextIcon, SparklesIcon } from "@/shared/ui/icons";

export type VacancyAnalysis = {
  /** Текст вакансии, к которому относится результат. */
  vacancyText: string;
  score: number;
  matched: string[];
  toClarify: string[];
  suggestions: { id: string; title: string; description: string }[];
};

export type ReviewPanelProps = {
  vacancyText: string;
  analysis: VacancyAnalysis | null;
  showSuggestions: boolean;
  onVacancyChange: (value: string) => void;
  onCompare: () => void;
  onToggleSuggestions: () => void;
};

/** Только UI: текст, результат и действия приходят от родителя. */
export function ReviewPanel({
  vacancyText,
  analysis,
  showSuggestions, // переключатель подсказки
  onVacancyChange,
  onCompare,
  onToggleSuggestions,
}: ReviewPanelProps) {
  const id = useId();
  const hasVacancy = Boolean(vacancyText.trim());
  const isStale = Boolean(analysis && analysis.vacancyText !== vacancyText.trim());
  const suggestionId = `${id}-suggestions`;

  return (
    <div className="grid min-w-0 gap-5">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card className="min-w-0">
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (hasVacancy) onCompare();
            }}
          >
            <label htmlFor={`${id}-vacancy`} className="flex items-center gap-2 font-semibold">
              <FileTextIcon className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-lg">Текст вакансии</span>
            </label>
            <textarea
              id={`${id}-vacancy`}
              aria-describedby={`${id}-vacancy-help`}
              value={vacancyText}
              onChange={(event) => onVacancyChange(event.target.value)}
              placeholder="Вставьте обязанности и требования из вакансии"
              rows={7}
              className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-text placeholder:text-text-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <p id={`${id}-vacancy-help`} className="text-sm text-text-soft">
              Вставьте обязанности и требования. Ссылки не открываем.
            </p>
            <Button type="submit" disabled={!hasVacancy} className="w-full whitespace-normal">
              {isStale ? "Обновить анализ" : "Сравнить с резюме"}
            </Button>
          </form>
        </Card>

        <Card className="grid min-w-0 gap-4" aria-label="Результат сравнения">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-accent">
            <SparklesIcon className="h-6 w-6 shrink-0" />
            Анализ вакансии
          </p>
          <h2 className="text-xl font-semibold">Соответствие требованиям</h2>

          {!hasVacancy || !analysis ? (
            <p className="text-sm leading-6 text-text-soft" role="status">
              {hasVacancy
                ? "Нажмите «Сравнить с резюме», чтобы посмотреть результат."
                : "Добавьте текст вакансии, чтобы сравнить её требования с резюме."}
            </p>
          ) : (
            <>
              {isStale && (
                <p className="rounded-lg bg-warn-soft p-3 text-sm text-warn" role="status">
                  Текст вакансии изменился. Обновите анализ — ниже предыдущий результат.
                </p>
              )}
              <div className={isStale ? "text-text-soft" : "text-accent"}>
                <span className="text-5xl font-medium">{analysis.score}</span>
                <span className="ml-1 text-sm text-text-soft">/ 100</span>
              </div>
              <div className={isStale ? "opacity-50" : undefined}>
                <ProgressBar percent={analysis.score} size="sm" />
              </div>
              <p className="text-sm leading-5 text-text-soft">
                Оценка по тексту вакансии, не гарантия прохождения отбора.
              </p>
              <Divider />

              {analysis.matched.length > 0 && (
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">Совпало</h3>
                  <ul className="flex flex-wrap gap-2">
                    {analysis.matched.map((skill) => (
                      <li key={skill}>
                        {/* // TODO: Вставить прослойку Card */}
                        <Card className="bg-accent-soft px-3 py-2 text-accent">{skill}</Card>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.toClarify.length > 0 && (
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">Стоит уточнить</h3>
                  <p className="text-lg text-text-soft">{analysis.toClarify.join(" · ")}</p>
                  <p className="text-xs leading-5 text-text-soft">
                    Добавляйте навыки только при наличии опыта.
                  </p>
                </div>
              )}

              {analysis.suggestions.length > 0 && (
                <>
                  <Button
                    type="button"
                    className="w-full whitespace-normal"
                    disabled={isStale}
                    aria-expanded={showSuggestions && !isStale}
                    aria-controls={suggestionId}
                    onClick={onToggleSuggestions}
                  >
                    {showSuggestions && !isStale ? "Скрыть подсказки" : "Посмотреть подсказки"}
                    <ArrowUpRightIcon className="h-4 w-4 shrink-0" />
                  </Button>
                  <ul
                    id={suggestionId}
                    hidden={!showSuggestions || isStale}
                    className={
                      showSuggestions && !isStale
                        ? "grid gap-4 border-t border-border pt-4"
                        : "hidden"
                    }
                  >
                    {analysis.suggestions.map((suggestion) => (
                      <li key={suggestion.id} className="grid gap-1">
                        <h3 className="text-lg font-semibold">{suggestion.title}</h3>
                        <p className="text-sm leading-6 text-text-soft">{suggestion.description}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </Card>
      </div>

      <Card className="grid gap-2 rounded-lg bg-accent-soft">
        <h2 className="text-sm font-semibold">Новая версия резюме — новый анализ</h2>
        <p className="text-sm leading-6 text-text-soft">
          Результат относится к сохранённой версии. После редактирования запустите проверку заново.
        </p>
      </Card>
    </div>
  );
}
