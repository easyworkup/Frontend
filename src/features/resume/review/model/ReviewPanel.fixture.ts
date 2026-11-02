import type { VacancyAnalysis } from "../ui/ReviewPanel";

const vacancyText = [
  "Frontend-разработчик",
  "React, TypeScript, REST API и Git.",
  "Тестирование интерфейсов и доступность.",
].join("\n");

/** Только пример для разработки UI; результат не рассчитывается по введённому тексту. */
export const reviewPanelFixture = {
  vacancyText,
  analysis: {
    vacancyText,
    score: 72,
    matched: ["React", "TypeScript", "Git"],
    toClarify: ["Тестирование интерфейсов", "Доступность"],
    suggestions: [
      {
        id: "clarify-testing",
        title: "Уточните опыт тестирования",
        description:
          "Если вы тестировали интерфейсы, опишите задачи и инструменты. Добавляйте только реальный опыт.",
      },
      {
        id: "clarify-accessibility",
        title: "Расскажите о доступности",
        description:
          "Если работали с доступностью, приведите пример: управление с клавиатуры, подписи полей или семантическая разметка.",
      },
    ],
  } satisfies VacancyAnalysis,
};
