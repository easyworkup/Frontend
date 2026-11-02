import { useState } from "react";
import { Button, Card, Divider } from "@/shared/ui";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  ChartColumnIcon,
  CheckIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  LinkIcon,
  UserIcon,
} from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

const sections = [
  { id: "personal", title: "Личные данные", icon: UserIcon },
  { id: "summary", title: "О себе", icon: FileTextIcon },
  { id: "experience", title: "Опыт работы", icon: BriefcaseIcon },
  { id: "education", title: "Образование", icon: GraduationCapIcon },
  { id: "skills", title: "Навыки", icon: ChartColumnIcon },
  { id: "languages", title: "Языки", icon: GlobeIcon },
  { id: "links", title: "Ссылки", icon: LinkIcon },
];

export function ResumeEditorNavigation({ onPreview }: { onPreview: () => void }) {
  const [activeSection, setActiveSection] = useState("personal");

  function goToSection(id: string) {
    const section = document.getElementById(`resume-editor-${id}`);
    setActiveSection(id);
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside aria-label="Разделы резюме" className="min-w-0 lg:sticky lg:top-6">
      <Card className="rounded-xl p-5 sm:p-6">
        <h2 className="text-xl font-bold tracking-tight">Ваше резюме</h2>
        <p className="mt-1 text-sm leading-6 text-text-soft">Все разделы — в одном документе.</p>

        <nav aria-label="Навигация по форме" className="mt-4">
          <ul className="grid gap-1">
            {sections.map(({ id, title, icon: Icon }) => {
              const active = activeSection === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => goToSection(id)}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-4 rounded-r border-l-2 px-4 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                      active
                        ? "border-accent bg-accent-soft/80 font-semibold text-accent"
                        : "border-transparent text-text-soft hover:bg-bg hover:text-text"
                    )}
                  >
                    {active ? (
                      <Icon className="h-5 w-5 shrink-0" />
                    ) : (
                      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-accent text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                    )}
                    {title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <Divider className="my-6" />
        <div className="flex items-center gap-3 rounded-lg bg-accent-soft px-4 py-3 text-sm text-accent">
          <FileTextIcon className="h-4 w-4 shrink-0" />
          Черновик резюме
        </div>
        <p className="my-4 text-sm leading-6 text-text-soft">
          В превью можно проверить оформление и вернуться к редактированию.
        </p>
        <Button type="button" className="w-full whitespace-normal" onClick={onPreview}>
          Перейти к превью
          <ArrowRightIcon className="h-4 w-4 shrink-0" />
        </Button>
      </Card>

      <p className="mt-5 flex items-start gap-3 px-3 text-xs leading-5 text-text-soft/75">
        <FileTextIcon className="mt-0.5 h-5 w-5 shrink-0" />
        Оценка и подсказки — на следующем шаге.
      </p>
    </aside>
  );
}
