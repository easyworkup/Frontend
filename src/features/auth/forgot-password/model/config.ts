import type { AuthScreenConfig } from "../../model/types";

export const forgotPasswordConfig = {
  title: "Восстановление пароля",
  description: "Укажите почту, и мы отправим ссылку для восстановления пароля.",
  fields: [
    {
      name: "email",
      label: "Электронная почта",
      type: "email",
      autoComplete: "email",
      placeholder: "name@example.com",
      required: true,
    },
  ],
  submitLabel: "Отправить ссылку",
  footerLinks: [{ text: "Вспомнили пароль?", label: "Войти", href: "/login" }],
} satisfies AuthScreenConfig;
