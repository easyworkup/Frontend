import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Резюме",
    description: "Расскажите о своём опыте убедительно",
  },
  {
    number: "02",
    title: "Роадмап",
    description: "Учитесь тому, что приближает к цели",
  },
  {
    number: "03",
    title: "Интервью",
    description: "Тренируйтесь и замечайте прогресс",
  },
];

export function AuthIntro() {
  return (
    <aside className="min-w-0 px-6 py-8 sm:px-10 lg:bg-accent-soft lg:p-16">
      <Link
        href="/"
        className="inline-block rounded-sm text-2xl font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:text-3xl"
      >
        EasyWorkUp
      </Link>

      <h2 className="mt-9 hidden max-w-[492px] text-[40px] font-bold leading-[1.45] tracking-tight lg:block">
        Карьера начинается
        <br className="hidden xl:block" /> со следующего шага
      </h2>

      <p className="mt-9 hidden max-w-[492px] text-base leading-6 text-text-soft lg:block">
        Сильное резюме, понятный план развития и практика перед настоящим интервью.
      </p>

      <ol className="mt-9 hidden space-y-6 lg:block">
        {steps.map((step) => (
          <li key={step.number} className="flex items-baseline gap-4">
            <span className="shrink-0 text-lg font-semibold text-accent lg:text-xl">
              {step.number}
            </span>
            <div>
              <h3 className="text-lg font-bold leading-7 lg:text-xl">{step.title}</h3>
              <p className="mt-1 text-sm leading-5 text-text-soft">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
