import type { InputHTMLAttributes } from "react";

export interface AuthFieldConfig {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  placeholder?: string;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}

export type AuthActionConfig =
  | {
      type: "checkbox";
      name: string;
      label: string;
      defaultChecked?: boolean;
      onChange?: (checked: boolean) => void;
    }
  | {
      type: "link";
      label: string;
      href: string;
    }
  | {
      type: "button";
      name: string;
      label: string;
      onClick?: () => void;
    };

export interface AuthFooterLinkConfig {
  text?: string;
  label: string;
  href: string;
}

export interface AuthScreenConfig {
  title: string;
  description: string;
  fields: readonly AuthFieldConfig[];
  submitLabel: string;
  actions?: readonly AuthActionConfig[];
  footerLinks?: readonly AuthFooterLinkConfig[];
}

/** Данные включают поля формы и отмеченные чекбоксы из actions. */
export type AuthSubmitHandler = (formData: FormData) => void;
