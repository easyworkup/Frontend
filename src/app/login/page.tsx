import LoginScreen from "@/features/auth/login/ui/LoginScreen";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function Login() {
  return <LoginScreen />;
}
