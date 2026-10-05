import { Button, Card, CenteredIntro, IconBadge } from "@/shared/ui";

type RetryStatusProps = {
  status: "email-sent" | "link-invalid";
  onBack: () => void;
  onRetry: () => void;
  cooldownSeconds: number;
};

type PasswordChangedStatusProps = {
  status: "password-changed";
  onBack: () => void;
  onRetry?: never;
  cooldownSeconds?: never;
};

export type ResetStatusProps = RetryStatusProps | PasswordChangedStatusProps;

const statusContent = {
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

export function ResetStatus(props: ResetStatusProps) {
  const content = statusContent[props.status];

  return (
    <section className="w-full max-w-md" aria-live="polite">
      <Card className="p-5 sm:p-8">
        <CenteredIntro
          icon={
            <IconBadge
              shape="circle"
              size={56}
              tone={props.status === "link-invalid" ? "accentSoft" : "accent"}
            >
              {content.icon}
            </IconBadge>
          }
          title={content.title}
          subtitle={content.description}
        />

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {props.status !== "password-changed" && (
            <Button
              type="button"
              className="w-full whitespace-normal px-4 text-center"
              disabled={props.cooldownSeconds > 0}
              onClick={props.onRetry}
            >
              {props.cooldownSeconds > 0
                ? `Повторная отправка через ${props.cooldownSeconds} с`
                : statusContent[props.status].retryLabel}
            </Button>
          )}

          <Button
            type="button"
            variant={props.status === "password-changed" ? "primary" : "outline"}
            className="w-full whitespace-normal px-4 text-center"
            onClick={props.onBack}
          >
            {props.status === "password-changed" ? "Перейти ко входу" : "Назад"}
          </Button>
        </div>
      </Card>
    </section>
  );
}
