const modules = [
  {
    title: "Резюме",
    description: "Форма + предпросмотр, ИИ-ревью с рекомендациями и ATS-скором.",
    href: "/resume",
  },
  {
    title: "Роадмап",
    description: "Дерево навыков по направлению, темп подготовки, трекинг прогресса.",
    href: "/roadmap",
  },
  {
    title: "Собеседования",
    description: "Поведенческие и технические вопросы, live-кодинг с обратной связью от ИИ.",
    href: "/interview",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 py-16">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl font-extrabold">EasyWorkUp</h1>
        <p className="mt-3 text-text-soft">
          Сервис помощи с трудоустройством в IT: резюме с ИИ-подсказками,
          персональный карьерный роадмап и подготовка к собеседованиям.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 w-full max-w-3xl">
        {modules.map((m) => (
          <a
            key={m.href}
            href={m.href}
            className="rounded-2xl border border-border bg-surface p-5 hover:border-accent transition-colors"
          >
            <div className="font-bold">{m.title}</div>
            <p className="mt-2 text-sm text-text-soft">{m.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
