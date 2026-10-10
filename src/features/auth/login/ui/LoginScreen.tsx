"use client";

import { AuthScreen } from "../../ui/AuthForm";
import type { AuthSubmitHandler } from "../../model/types";
import { loginConfig } from "../model/config";
import { AuthIntro } from "../../ui/AuthIntro";

const handleLogin: AuthSubmitHandler = (_formData) => {
  // TODO: подключить вход через API.
};

export default function LoginScreen() {
  return (
    <>
      <main className="grid min-h-dvh bg-bg text-text md:grid-cols-[3fr_4fr]">
        <AuthIntro />
        <AuthScreen config={loginConfig} onSubmit={handleLogin} />
      </main>
    </>
  );
}
