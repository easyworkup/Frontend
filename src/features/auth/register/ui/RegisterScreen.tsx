"use client";

import { AuthScreen } from "../../ui/AuthForm";
import type { AuthSubmitHandler } from "../../model/types";
import { registerConfig } from "../model/config";
import { AuthLayout } from "../../ui/AuthLayout";

const handleRegister: AuthSubmitHandler = (_formData) => {
  // TODO: подключить регистрацию через API.
};

export default function RegisterScreen() {
  return (
    <AuthLayout>
      <AuthScreen config={registerConfig} onSubmit={handleRegister} />
    </AuthLayout>
  );
}
