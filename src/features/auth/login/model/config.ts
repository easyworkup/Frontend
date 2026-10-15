import type { AuthScreenConfig } from "../../model/types";

export const loginConfig = {
  title: "С возвращением",
  description: "Войдите, чтобы продолжить подготовку.",
  fields: [
    {
      name: "email",
      label: "Электронная почта",
      type: "email",
      autoComplete: "username",
      placeholder: "name@example.com",
      required: true,
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      autoComplete: "current-password",
      placeholder: "••••••••",
      required: true,
    },
  ],
  actions: [
    { type: "checkbox", name: "remember", label: "Запомнить меня" },
    { type: "link", label: "Забыли пароль?", href: "/forgot-password" },
  ],
  submitLabel: "Войти",
  footerLinks: [{ text: "Нет аккаунта?", label: "Зарегистрироваться", href: "/register" }],
} satisfies AuthScreenConfig;
