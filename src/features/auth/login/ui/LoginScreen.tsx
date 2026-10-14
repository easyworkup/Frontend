"use client";

import { AuthScreen } from "../../ui/AuthForm";
import type { AuthSubmitHandler } from "../../model/types";
import { loginConfig } from "../model/config";
import { AuthLayout } from "../../ui/AuthLayout";

const handleLogin: AuthSubmitHandler = (_formData) => {
  // TODO: подключить вход через API.
};

export default function LoginScreen() {
  return (
    <AuthLayout>
      <AuthScreen config={loginConfig} onSubmit={handleLogin} />
    </AuthLayout>
  );
}
