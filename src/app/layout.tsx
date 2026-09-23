import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyWorkUp",
  description: "Резюме, роадмап и подготовка к собеседованиям в одном месте",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans">{children}</body>
    </html>
  );
}
