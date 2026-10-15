import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F5F0",
        surface: "#FFFFFF",
        border: "#E3DFD4",
        text: "#1E1C17",
        "text-soft": "#6E6858",
        accent: "#2F5D50",
        "accent-soft": "#E3EDE8",
        "accent-dark": "#1F433A",
        warn: "#B5560B",
        "warn-soft": "#FBEBDD",
        ok: "#2A7A4A",
        "ok-soft": "#E4F3E9",
        danger: "#C74A2E",
        "danger-soft": "#F8E2DB",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
