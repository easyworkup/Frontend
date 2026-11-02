import type { ResumeView } from "@/entities/resume";

// Тестовые данные для локальной разработки. Не подставлять вместо реального резюме.
export const resumePreviewFixture = {
  fullName: "Данилов Роман",
  directionTitle: "Frontend-разработчик",
  location: "Москва",
  remoteOnly: true,
  email: "alex@example.com",
  summary:
    "Создаю понятные веб-интерфейсы на React и TypeScript. Люблю разбираться в задачах пользователей и улучшать продукт.",
  experience: [
    {
      company: "Студия Север",
      role: "Frontend-разработчик",
      from: "Март 2024 - настоящее время",
      description: [
        "Разрабатывал интерфейсы клиентских проектов.",
        "Интегрировал REST API и поддерживал UI-компоненты.",
        "Работал с дизайнерами и backend-командой.",
      ],
    },
  ],
  education: [
    {
      institution: "ЧГУ им. Ульянова",
      degree: "Прикладная математика, физика и информационные технологии",
      year: "2027",
    },
  ],
  skills: ["React", "TypeScript", "Next.js", "HTML / CSS", "Git"],
  languages: ["Русский — родной", "Английский — B1"],
  links: ["https://example.com/portfolio"],
} satisfies ResumeView;
