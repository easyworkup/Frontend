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
    <aside className="relative min-w-0 px-6 py-8 sm:px-10 lg:p-16 lg:before:absolute lg:before:inset-y-[-100dvh] lg:before:right-0 lg:before:-z-10 lg:before:w-screen lg:before:bg-accent-soft">
      <Link
        href="/"
        className="inline-block rounded-sm text-2xl font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:text-3xl lg:leading-[44px]"
      >
        EasyWorkUp
      </Link>

      <h2 className="mt-9 hidden max-w-[492px] text-[40px] font-bold leading-[1.45] lg:block">
        Карьера начинается
        <br className="hidden xl:block" /> со следующего шага
      </h2>

      <p className="mt-9 hidden max-w-[492px] text-lg leading-[26px] text-text-soft lg:block">
        Сильное резюме, понятный план развития
        <br className="hidden xl:block" /> и практика перед настоящим интервью.
      </p>

      <ol className="mt-9 hidden space-y-5 lg:block">
        {steps.map((step) => (
          <li key={step.number} className="flex items-baseline gap-4">
            <span className="shrink-0 text-xl font-bold leading-[29px] text-accent">
              {step.number}
            </span>
            <div>
              <h3 className="text-xl font-bold leading-[29px]">{step.title}</h3>
              <p className="mt-1 text-sm leading-5 text-text-soft">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
