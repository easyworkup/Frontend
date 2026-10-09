import type { AuthScreenConfig } from "../../model/types";

export const registerConfig = {
  title: "Создайте аккаунт",
  description: "Начните подготовку к следующему шагу в карьере.",
  fields: [
    {
      name: "name",
      label: "Имя",
      type: "text",
      autoComplete: "name",
      placeholder: "Ваше имя",
      required: true,
    },
    {
      name: "email",
      label: "Электронная почта",
      type: "email",
      autoComplete: "email",
      placeholder: "name@example.com",
      required: true,
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      autoComplete: "new-password",
      placeholder: "••••••••",
      required: true,
    },
  ],
  actions: [
    { type: "checkbox", name: "", label: "" },
    {
      type: "link",
      label: "Я принимаю условия использования и политику конфиденциальности",
      href: "/#",
    },
  ],
  submitLabel: "Зарегистрироваться",
  footerLinks: [{ text: "Уже есть аккаунт?", label: "Войти", href: "/login" }],
} satisfies AuthScreenConfig;
