"use client";

import { AuthScreen } from "../../ui/AuthScreen";
import type { AuthSubmitHandler } from "../../model/types";
import { loginConfig } from "../model/config";

const handleLogin: AuthSubmitHandler = (_formData) => {
  // TODO: подключить вход через API.
};

export default function LoginScreen() {
  return <AuthScreen config={loginConfig} onSubmit={handleLogin} />;
}
