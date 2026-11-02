/** Данные карточки списка. Это UI-модель, а не содержимое резюме или серверный DTO. */
export type ResumeListItem = {
  id: string;
  title: string;
  updatedLabel: string;
  isActive: boolean;
  skills: string[];
} & ({ status: "ready" } | { status: "draft"; completedSections: number; totalSections: number });
