export const SITE_NAME = "Путь";

export interface NavItem {
  label: string;
  href: string;
}

/** Пункты верхнего меню — см. шапку на всех авторизованных экранах мокапа. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Резюме", href: "/resume" },
  { label: "Роадмап", href: "/roadmap" },
  { label: "Собеседования", href: "/interview" },
];
