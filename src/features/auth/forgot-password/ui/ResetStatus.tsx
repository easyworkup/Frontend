import { Button, Card, CenteredIntro, IconBadge } from "@/shared/ui";
import { ResetStatusProps } from "../model/reset-status.types";
import { statusContent } from "./reset-status.content";

export function ResetStatus(props: ResetStatusProps) {
  const content = statusContent[props.status];
  const cooldownSeconds = props.cooldownSeconds ?? 0;
  return (
    <section
      className="flex items-center justify-center px-6 py-12 sm:px-10 md:px-8 md:py-20 lg:px-16"
      aria-live="polite"
    >
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
              disabled={cooldownSeconds > 0}
              onClick={props.onRetry}
            >
              {cooldownSeconds > 0
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
