"use client";

import { AuthScreen } from "../../ui/AuthForm";
import type { AuthSubmitHandler } from "../../model/types";
import { registerConfig } from "../model/config";
import { AuthIntro } from "../../ui/AuthIntro";

const handleRegister: AuthSubmitHandler = (_formData) => {
  // TODO: подключить регистрацию через API.
};

export default function RegisterScreen() {
  return (
    <main className="grid min-h-dvh bg-bg text-text md:grid-cols-[3fr_4fr]">
      <AuthIntro />
      <AuthScreen config={registerConfig} onSubmit={handleRegister} />;
    </main>
  );
}
