import type { PublicTestResult, RunResultsProps } from "./RunResults";

const passedTests = [
  { id: "example", name: "Пример из условия", visibility: "public", status: "success" },
  { id: "negative", name: "Отрицательные числа", visibility: "public", status: "success" },
  { id: "duplicates", name: "Повторяющиеся значения", visibility: "public", status: "success" },
] as const satisfies readonly PublicTestResult[];

const partialTests = [
  passedTests[0],
  passedTests[1],
  {
    ...passedTests[2],
    name: "Повторяющиеся значения — проверьте [3, 3], target = 6.",
    status: "failed",
  },
] as const satisfies readonly PublicTestResult[];

export const runResultsFixtures = {
  allPassed: {
    state: { status: "success" },
    publicTests: passedTests,
  },
  partialFailure: {
    state: { status: "failed" },
    publicTests: partialTests,
  },
  empty: {
    state: { status: "success" },
    publicTests: [],
  },
  running: {
    state: { status: "running" },
    publicTests: [passedTests[0], { ...passedTests[1], status: "running" }],
    stdout: "Публичный запуск: первый тест завершён.\n",
  },
  runningEmpty: {
    state: { status: "running" },
    publicTests: [],
  },
  timeout: {
    state: {
      status: "timeout",
      message: "Превышен лимит времени. Проверьте условие выхода из цикла.",
    },
    publicTests: [passedTests[0], { ...passedTests[1], status: "timeout" }],
    stdout: "Начат второй публичный тест.\n",
  },
  runtimeError: {
    state: { status: "runtime-error", message: "Выполнение остановлено из-за ошибки в коде." },
    publicTests: [{ ...passedTests[0], status: "runtime-error" }],
    stderr:
      "TypeError: Cannot read properties of undefined (reading 'length')\n    at solution:3:12",
  },
  launchError: {
    state: {
      status: "error",
      message: "Не удалось начать выполнение. Попробуйте запустить код ещё раз.",
    },
    publicTests: [],
  },
  longOutput: {
    state: { status: "failed" },
    publicTests: partialTests,
    stdout: `${"Публичный тест: диагностическая строка.\n".repeat(100)}${"x".repeat(4000)}`,
    stderr: `${"Предупреждение публичного запуска.\n".repeat(100)}${"E".repeat(4000)}`,
  },
  htmlLikeOutput: {
    state: { status: "runtime-error", message: '<img src=x onerror="alert(1)"> & <b>Ошибка</b>' },
    publicTests: [
      { ...passedTests[0], name: "<strong>Публичный тест</strong>", status: "runtime-error" },
    ],
    stdout: '<script>alert("stdout")</script>\n<div>Только текст & символы < > "</div>',
    stderr: '<img src=x onerror="alert(1)">\n</pre><script>alert("stderr")</script>',
  },
  longTestNames: {
    state: { status: "failed" },
    publicTests: [
      { ...passedTests[0], name: "Очень длинное название публичного теста ".repeat(15) },
      { ...passedTests[1], name: "НепрерывноеНазвание".repeat(50), status: "failed" },
    ],
  },
} as const satisfies Record<string, RunResultsProps>;
