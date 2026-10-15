export type ResetStatusProps = {
  status: "email-sent" | "link-invalid" | "password-changed";
  onBack: () => void;
  onRetry?: () => void;
  cooldownSeconds?: number;
};
