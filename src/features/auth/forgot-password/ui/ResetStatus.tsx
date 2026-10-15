import { Button, Card, CenteredIntro, IconBadge } from "@/shared/ui";
import { ResetStatusProps } from "../model/reset-status.types";
import { statusContent } from "./reset-status.content";
import { AuthPanel } from "../../ui/AuthLayout";

export function ResetStatus(props: ResetStatusProps) {
  const content = statusContent[props.status];
  const cooldownSeconds = props.cooldownSeconds ?? 0;
  return (
    <AuthPanel live>
      <Card className="w-full min-w-0 p-5 sm:p-8">
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
          title={<h1>{content.title}</h1>}
          subtitle={content.description}
        />

        <div className="mt-7 flex flex-col gap-3">
          {props.status !== "password-changed" && (
            <Button
              type="button"
              className="h-auto min-h-[52px] w-full whitespace-normal px-4 py-3 text-center"
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
            className="h-auto min-h-[52px] w-full whitespace-normal px-4 py-3 text-center"
            onClick={props.onBack}
          >
            {props.status === "password-changed" ? "Перейти ко входу" : "Назад"}
          </Button>
        </div>
      </Card>
    </AuthPanel>
  );
}
