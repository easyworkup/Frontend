"use client";

import { AuthScreen } from "../../ui/AuthScreen";
import type { AuthSubmitHandler } from "../../model/types";
import { forgotPasswordConfig } from "../model/config";

const handleForgotPassword: AuthSubmitHandler = (_formData) => {
  // TODO: подключить отправку ссылки для восстановления через API.
};

export default function ForgotPasswordScreen() {
  return <AuthScreen config={forgotPasswordConfig} onSubmit={handleForgotPassword} />;
}
