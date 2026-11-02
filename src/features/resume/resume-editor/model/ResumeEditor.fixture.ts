// Только пример заполнения формы. Сохранение и передача в превью подключаются отдельно.
export const resumeEditorFixture = {
  fullName: "Данилов Роман",
  directionTitle: "Frontend-разработчик",
  email: "alex@example.com",
  phone: "",
  location: "Москва",
  remoteOnly: true,
  summary:
    "Создаю понятные веб-интерфейсы на React и TypeScript. Люблю разбираться в задачах пользователей и улучшать продукт.",
  experience: [
    {
      id: "studio-north",
      company: "Студия Север",
      role: "Frontend-разработчик",
      from: "Март 2024",
      to: "",
      current: true,
      description: [
        "Разрабатывал интерфейсы клиентских проектов.",
        "Интегрировал REST API и поддерживал UI-компоненты.",
        "Работал с дизайнерами и backend-командой.",
      ],
    },
  ],
  education: [
    {
      id: "chuvash-university",
      institution: "ЧГУ им. Ульянова",
      degree: "Прикладная математика, физика и информационные технологии",
      year: "2027",
    },
  ],
  skills: ["React", "TypeScript", "Next.js", "HTML / CSS", "Git"],
  languages: [
    { id: "russian", language: "Русский", level: "native" },
    { id: "english", language: "Английский", level: "B1" },
  ],
  links: [{ id: "portfolio", url: "https://example.com/portfolio" }],
};
