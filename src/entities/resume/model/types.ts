/** Одно место работы. Названия полей соответствуют текущему ResumeContentDto. */
export type ResumeExperience = {
  company: string;
  role: string;
  /** Месяц начала работы в формате YYYY-MM. */
  from: string;
  /** Если дата окончания отсутствует — работа продолжается по настоящее время. */
  to?: string;
  /** Исходный текст описания; переносы строк нужно сохранить при отображении. */
  description?: string[];
};

/** Одна запись об образовании. */
export type ResumeEducation = {
  institution: string;
  degree?: string;
  year?: string;
};

/**
 * Черновая модель данных для отображения резюме, а не серверный DTO.
 * TODO: согласовать поля и их обязательность с интегратором перед реализацией.
 * Оценка и рекомендации относятся к ревью и не входят в сам документ.
 */
export type ResumeView = {
  fullName: string;
  /** Название направления для показа. Родитель получает его по directionSlug. */
  directionTitle?: string;
  location?: string;
  remoteOnly: boolean;
  /** Контактов пока нет в ResumeContentDto; источник нужно согласовать. */
  email?: string;
  phone?: string;
  /** Раздел «О себе». */
  summary?: string;
  /** Для отсутствующих разделов родитель передаёт пустые массивы. */
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  languages: string[];
  /** Полные URL. */
  links: string[];
};
