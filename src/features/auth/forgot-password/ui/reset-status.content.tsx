export const statusContent = {
  "email-sent": {
    title: "Проверьте почту",
    description:
      "Если аккаунт с таким адресом существует, мы отправили на него ссылку для сброса пароля.",
    retryLabel: "Отправить ссылку ещё раз",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  "link-invalid": {
    title: "Ссылка недействительна",
    description:
      "Срок действия ссылки истёк или она недействительна. Запросите новую ссылку для сброса пароля.",
    retryLabel: "Отправить новую ссылку",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
  "password-changed": {
    title: "Пароль изменён",
    description: "Теперь вы можете войти в аккаунт с новым паролем.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    ),
  },
} as const;
