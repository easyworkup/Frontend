"use client";

import { useRef, useState } from "react";
import { ResumeEditorView } from "./editor/ResumeEditorView";
import { ResumePreviewView } from "./preview/ResumePreviewView";
import { ResumeVacancyView } from "./vacancy/ResumeVacancyView";
import { ResumeListView } from "./list/ResumeListView";
import { resumeListFixture } from "../model/ResumeList.fixture";
import { resumePreviewFixture } from "@/features/resume/review/model/ResumePreview.fixture";
import { reviewPanelFixture } from "@/features/resume/review/model/ReviewPanel.fixture";
import type { VacancyAnalysis } from "@/features/resume/review/ui/ReviewPanel";
import { ResumeHeader, type ResumeScreen } from "@/widgets/headerResume";

export default function ResumePage() {
  const [screen, setScreen] = useState<ResumeScreen>("list"); // Стейт экрана из 4 вариантов
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [vacancyText, setVacancyText] = useState(reviewPanelFixture.vacancyText);
  const [analysis, setAnalysis] = useState<VacancyAnalysis | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // управляет за стейт страницы.
  function changeScreen(nextScreen: ResumeScreen) {
    setScreen(nextScreen);

    // приколы ui приятного
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }

  function handleCompare() {
    if (!vacancyText.trim()) return;

    // Локальная демонстрация интерфейса. Реальный анализ подключит интегратор.
    setAnalysis({ ...reviewPanelFixture.analysis, vacancyText: vacancyText.trim() });
    setShowSuggestions(false);
  }

  return (
    <main className={`mx-auto w-full max-w-[1440px] px-4 py-6 md:px-8 lg:px-12 lg:py-10`}>
      <ResumeHeader screen={screen} onScreenChange={changeScreen} headingRef={headingRef} />

      {screen === "list" && (
        // Пока открываем демоэкраны. Загрузка выбранного резюме подключается отдельно.
        <ResumeListView
          resumes={resumeListFixture}
          onCreate={() => changeScreen("editor")}
          onEdit={() => changeScreen("editor")}
          onPreview={() => changeScreen("preview")}
        />
      )}

      {/* Скрытая форма остаётся смонтированной, чтобы не сбрасывать локальный ввод. */}
      <div hidden={screen !== "editor"}>
        <ResumeEditorView onPreview={() => changeScreen("preview")} />
      </div>

      {screen === "preview" && (
        <ResumePreviewView
          resume={resumePreviewFixture}
          onCompare={() => changeScreen("vacancy")}
        />
      )}
      {screen === "vacancy" && (
        <ResumeVacancyView
          onBack={() => changeScreen("preview")}
          vacancyText={vacancyText}
          analysis={analysis}
          showSuggestions={showSuggestions}
          onVacancyChange={setVacancyText}
          onCompare={handleCompare}
          onToggleSuggestions={() => setShowSuggestions((shown) => !shown)}
        />
      )}
    </main>
  );
}
