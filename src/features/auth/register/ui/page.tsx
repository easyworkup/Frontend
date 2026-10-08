"use client";

import { AuthScreen } from "../../ui/AuthScreen";
import type { AuthSubmitHandler } from "../../model/types";
import { registerConfig } from "../model/config";

const handleRegister: AuthSubmitHandler = (_formData) => {
  // TODO: подключить регистрацию через API.
};

export default function RegisterScreen() {
  return <AuthScreen config={registerConfig} onSubmit={handleRegister} />;
}
