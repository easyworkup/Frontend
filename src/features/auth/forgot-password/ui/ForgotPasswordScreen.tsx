"use client";
import { useRouter } from "next/navigation";
import { AuthScreen } from "../../ui/AuthForm";
import type { AuthSubmitHandler } from "../../model/types";
import { forgotPasswordConfig } from "../model/config";
import { ResetStatus } from "./ResetStatus";
import { AuthIntro } from "../../ui/AuthIntro";
import { useState } from "react";
import { ResetStatusProps } from "../model/reset-status.types";

export default function ForgotPasswordScreen() {
  const [result, setResult] = useState<ResetStatusProps | null>(null);
  const router = useRouter();

  const resetStatuses = [
    {
      status: "email-sent",
      onBack: () => router.push("/login"),
      onRetry: () => console.log("Отправить письмо повторно"),
      cooldownSeconds: 0,
    },
    {
      status: "link-invalid",
      onBack: () => router.push("/login"),
      onRetry: () => console.log("Отправить новую ссылку"),
      cooldownSeconds: 0,
    },
    {
      status: "password-changed",
      onBack: () => router.push("/login"),
    },
  ] as const;

  const handleForgotPassword: AuthSubmitHandler = (_formData) => {
    // TODO: подключить отправку ссылки для восстановления через API.
    const res = 200;
    let status = "success";
    if (res === 200) {
      if (status === "success") {
        setResult(resetStatuses[0]); // для теста состояний сброса пароля просто менять цифру 0, 1 или 2
      } else if (status === "error") {
        setResult(resetStatuses[1]);
      } else {
        setResult(resetStatuses[2]);
      }
    }
  };
  return (
    <main className="grid min-h-dvh bg-bg text-text md:grid-cols-[3fr_4fr]">
      <AuthIntro />
      {result === null ? (
        <AuthScreen config={forgotPasswordConfig} onSubmit={handleForgotPassword} />
      ) : (
        <ResetStatus {...result} />
      )}
    </main>
  );
}
