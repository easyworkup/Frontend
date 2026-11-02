import type { ResumeListItem } from "../../../entities/resume/model/resume-list.types";

// Демонстрационный список. Данные и действия API подключаются отдельно.
export const resumeListFixture = [
  {
    id: "frontend-resume",
    title: "Frontend-разработчик",
    updatedLabel: "Обновлено сегодня, 14:32",
    isActive: true,
    status: "ready",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "react-resume",
    title: "React-разработчик",
    updatedLabel: "Обновлено 24 сентября",
    isActive: false,
    status: "draft",
    completedSections: 4,
    totalSections: 7,
    skills: [],
  },
] satisfies ResumeListItem[];
