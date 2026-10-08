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
    <aside className="bg-accent-soft px-6 py-10 sm:px-10 md:px-8 md:py-20 lg:px-16">
      <Link
        href="/"
        className="inline-block rounded-sm text-2xl font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:text-3xl"
      >
        EasyWorkUp
      </Link>

      <h2 className="mt-8 max-w-[480px] text-3xl font-bold leading-[1.4] tracking-tight lg:mt-10 lg:text-[40px]">
        Карьера начинается
        <br className="hidden xl:block" /> со следующего шага
      </h2>

      <p className="mt-6 max-w-[400px] text-base leading-[1.4] text-text-soft lg:mt-9 lg:text-lg">
        Сильное резюме, понятный план развития и практика перед настоящим интервью.
      </p>

      <ol className="mt-8 space-y-6 lg:mt-10">
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
