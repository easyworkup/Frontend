import { Badge, Card } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

export type PublicTestResult = {
  readonly id: string;
  readonly name: string;
  readonly visibility: "public";
  readonly status: "running" | "success" | "failed" | "timeout" | "runtime-error";
};

export type RunResultsState =
  | { readonly status: "running" }
  | { readonly status: "success" }
  | { readonly status: "failed" }
  | { readonly status: "timeout"; readonly message: string }
  | { readonly status: "runtime-error"; readonly message: string }
  | { readonly status: "error"; readonly message: string };

/** The caller supplies only public-run output, never hidden-test data or reference solutions. */
export type RunResultsProps = {
  readonly state: RunResultsState;
  readonly publicTests: readonly PublicTestResult[];
  readonly stdout?: string;
  readonly stderr?: string;
};

const testLabels: Record<PublicTestResult["status"], string> = {
  running: "Выполняется",
  success: "Пройден",
  failed: "Не пройден",
  timeout: "Превышено время выполнения",
  "runtime-error": "Ошибка выполнения",
};

const runLabels: Record<RunResultsState["status"], string> = {
  running: "Тесты выполняются",
  success: "Выполнение завершено",
  failed: "Есть непройденные тесты",
  timeout: "Превышено время выполнения",
  "runtime-error": "Ошибка выполнения кода",
  error: "Не удалось запустить код",
};

export function RunResults({ state, publicTests, stdout, stderr }: RunResultsProps) {
  // Defensive filtering complements the public-only contract; it cannot sanitize run output.
  const tests = publicTests.filter((test) => test.visibility === "public");
  const passed = tests.filter((test) => test.status === "success").length;
  const isCompleted = state.status === "success" || state.status === "failed";
  const isError = state.status === "runtime-error" || state.status === "error";
  const summary = `${passed} из ${tests.length} тестов пройдено`;

  return (
    <Card
      role="region"
      aria-label="Результаты публичных тестов"
      className={cn(
        "w-full min-w-0 max-w-full overflow-hidden rounded-xl p-4 text-text sm:p-6",
        state.status === "running" && "bg-accent-soft",
        state.status === "success" && tests.length > 0 && "bg-ok-soft",
        (state.status === "failed" || state.status === "timeout") && "bg-warn-soft",
        isError && "bg-danger-soft"
      )}
    >
      <div role="status" aria-atomic="true" className="min-w-0 [overflow-wrap:anywhere]">
        <h3 className="text-base font-bold">
          {isCompleted && tests.length > 0 ? summary : runLabels[state.status]}
        </h3>
        {!isCompleted && (
          <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2">
            <Badge tone={isError ? "danger" : state.status === "timeout" ? "warn" : "accent"}>
              {state.status === "running"
                ? "В процессе"
                : state.status === "error"
                  ? "Ошибка запуска"
                  : "Выполнение прервано"}
            </Badge>
            {tests.length > 0 && <p className="text-sm text-text-soft">{summary}</p>}
          </div>
        )}
        {"message" in state && state.message && (
          <p className="mt-2 whitespace-pre-wrap text-sm text-text">{state.message}</p>
        )}
      </div>

      {tests.length > 0 ? (
        <ul aria-busy={state.status === "running"} className="mt-4 min-w-0 space-y-1">
          {tests.map((test) => (
            <li key={test.id} className="flex min-w-0 items-start gap-1 text-sm text-text-soft">
              <span aria-hidden="true" className="shrink-0">
                {test.status === "success" ? "✓" : test.status === "running" ? "…" : "×"}
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere]">
                {test.name} — {testLabels[test.status]}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-text-soft">
          {state.status === "running"
            ? "Ожидаем результаты публичных тестов."
            : "Результатов публичных тестов пока нет."}
        </p>
      )}

      {(
        [
          ["stdout", stdout],
          ["stderr", stderr],
        ] as const
      ).map(([label, output]) =>
        output ? (
          <div key={label} className="mt-4 min-w-0">
            <h4 className="mb-2 text-sm font-bold">{label}</h4>
            <pre
              role="region"
              aria-label={`Вывод ${label}`}
              tabIndex={0}
              className="max-h-64 min-w-0 max-w-full overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-surface p-3 font-mono text-xs leading-relaxed text-text [overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {output}
            </pre>
          </div>
        ) : null
      )}
    </Card>
  );
}
