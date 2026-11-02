"use client";

import type { Ref } from "react";
import { Button } from "@/shared/ui";
import { ChevronRightIcon, DownloadIcon, PencilIcon, UploadIcon } from "@/shared/ui/icons";
import type { ResumeScreen } from "../model/types";

const headings = {
  list: {
    title: "Ваши резюме",
    subtitle: "Активное резюме помогает персонализировать роадмап и вопросы.",
  },
  editor: {
    title: "Расскажите о своём опыте",
    subtitle: "Заполните данные — на следующем шаге увидите готовое резюме.",
  },
  preview: {
    title: "Ваш опыт — убедительно.",
    subtitle: "Последний взгляд перед откликом",
  },
  vacancy: {
    title: "Подстройте резюме под конкретную роль",
    subtitle: "Сравните сохранённое резюме с требованиями вакансии",
  },
} satisfies Record<ResumeScreen, { title: string; subtitle: string }>;

type ResumeHeaderProps = {
  screen: ResumeScreen;
  onScreenChange: (screen: ResumeScreen) => void;
  headingRef?: Ref<HTMLHeadingElement>;
};

export function ResumeHeader({ screen, onScreenChange, headingRef }: ResumeHeaderProps) {
  const heading = headings[screen];

  return (
    <>
      <p className="text-xs leading-5 text-text-soft">
        Рабочее пространство <span className="text-text"> / Резюме</span>
      </p>

      {screen !== "list" && (
        <button
          type="button"
          onClick={() => onScreenChange("list")}
          className="mt-5 inline-flex items-center gap-1.5 rounded text-xs font-semibold text-text-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ChevronRightIcon className="h-4 w-4 rotate-180" />К списку резюме
        </button>
      )}

      <header className="flex flex-col justify-between gap-5 pb-7 pt-5 md:flex-row md:items-start">
        <div className="min-w-0">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl font-bold tracking-tight outline-none md:text-3xl"
          >
            {heading.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-soft">{heading.subtitle}</p>
        </div>

        {screen === "editor" && (
          <div className="grid shrink-0 gap-2 lg:w-[calc((100%-24px)/3.5)]">
            {/* Импорт файла подключается отдельно от вёрстки формы. */}
            <Button
              type="button"
              variant="secondary"
              disabled
              className="w-full rounded-lg font-semibold disabled:opacity-100"
            >
              <UploadIcon className="h-5 w-5 shrink-0" />
              Загрузить резюме
            </Button>
            <p className="text-xs leading-5 text-text-soft">
              Заполним поля из файла.
              <br />
              Проверьте данные после загрузки.
            </p>
          </div>
        )}

        {screen === "preview" && (
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => onScreenChange("editor")}>
              <PencilIcon className="h-4 w-4 shrink-0" />
              Редактировать
            </Button>
            <Button>
              <DownloadIcon className="h-4 w-4 shrink-0" />
              Скачать PDF
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
