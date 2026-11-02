import { useState, type ReactNode } from "react";
import { Button } from "@/shared/ui";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChartColumnIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  LinkIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
  XIcon,
} from "@/shared/ui/icons";
import { resumeEditorFixture as fixture } from "../model/ResumeEditor.fixture";
import { ResumeEditorField, ResumeEditorSelect, ResumeEditorTextarea } from "./ResumeEditorField";
import { ResumeEditorSection } from "./ResumeEditorSection";

const checkboxClass =
  "h-5 w-5 shrink-0 cursor-pointer rounded accent-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Кнопки изменения списков пока только обозначают действия будущего редактора.
function AddEntryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      disabled
      className="mt-5 inline-flex min-h-6 items-center gap-1 text-sm font-semibold text-accent disabled:cursor-not-allowed"
    >
      <PlusIcon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </button>
  );
}

function RemoveEntryButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      disabled
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-soft/65 disabled:cursor-not-allowed"
    >
      <TrashIcon className="h-[18px] w-[18px]" />
    </button>
  );
}

export function ResumeEditorForm({ onPreview }: { onPreview: () => void }) {
  const [jobDates, setJobDates] = useState<Record<string, { current: boolean; to: string }>>(() =>
    Object.fromEntries(
      fixture.experience.map((job) => [job.id, { current: job.current, to: job.to }])
    )
  );

  return (
    <form
      aria-label="Данные резюме"
      className="grid min-w-0 gap-5"
      onSubmit={(event) => event.preventDefault()}
    >
      <ResumeEditorSection
        id="personal"
        title="1. Личные данные"
        icon={<UserIcon className="h-6 w-6" />}
      >
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          <ResumeEditorField
            label="Имя и фамилия"
            name="fullName"
            autoComplete="name"
            defaultValue={fixture.fullName}
          />
          <ResumeEditorField
            label="Желаемая должность"
            name="directionTitle"
            autoComplete="organization-title"
            defaultValue={fixture.directionTitle}
          />
          <ResumeEditorField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={fixture.email}
          />
          <ResumeEditorField
            label="Телефон"
            optional
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+7 …"
            defaultValue={fixture.phone}
          />
          <ResumeEditorField
            label="Город"
            name="location"
            autoComplete="address-level2"
            defaultValue={fixture.location}
          />
          <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm sm:self-end">
            <input
              type="checkbox"
              name="remoteOnly"
              defaultChecked={fixture.remoteOnly}
              className={checkboxClass}
            />
            Только удалённо
          </label>
        </div>
        <p className="mt-4 text-xs leading-5 text-text-soft">Контакты будут видны в резюме.</p>
      </ResumeEditorSection>

      <ResumeEditorSection
        id="summary"
        title="2. О себе"
        icon={<FileTextIcon className="h-6 w-6" />}
      >
        <ResumeEditorTextarea
          label="Кратко о себе"
          name="summary"
          rows={3}
          defaultValue={fixture.summary}
          hint="Коротко: ваша специализация и чем вы полезны команде."
        />
      </ResumeEditorSection>

      <ResumeEditorSection
        id="experience"
        title="3. Опыт работы"
        icon={<BriefcaseIcon className="h-6 w-6" />}
        action={<RemoveEntryButton label="Удалить место работы" />}
      >
        {fixture.experience.map((job) => (
          <div key={job.id} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <ResumeEditorField
                label="Компания"
                name={`experience.${job.id}.company`}
                defaultValue={job.company}
              />
              <ResumeEditorField
                label="Должность"
                name={`experience.${job.id}.role`}
                defaultValue={job.role}
              />
            </div>
            <div className="grid items-end gap-5 sm:grid-cols-2">
              <ResumeEditorField
                label="Начало"
                name={`experience.${job.id}.from`}
                defaultValue={job.from}
                trailingIcon={<CalendarIcon className="h-4 w-4" />}
              />
              <div className="grid min-w-0 items-end gap-3 xl:grid-cols-[minmax(0,1fr)_auto]">
                <ResumeEditorField
                  label="Окончание"
                  name={`experience.${job.id}.to`}
                  value={jobDates[job.id].current ? "" : jobDates[job.id].to}
                  onChange={(event) => {
                    const to = event.target.value;
                    setJobDates((dates) => ({ ...dates, [job.id]: { ...dates[job.id], to } }));
                  }}
                  disabled={jobDates[job.id].current}
                  placeholder={jobDates[job.id].current ? "Настоящее время" : "Месяц и год"}
                  trailingIcon={<CalendarIcon className="h-4 w-4" />}
                />
                <label className="flex min-h-12 cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    name={`experience.${job.id}.current`}
                    className={checkboxClass}
                    checked={jobDates[job.id].current}
                    onChange={(event) => {
                      const current = event.target.checked;
                      setJobDates((dates) => ({
                        ...dates,
                        [job.id]: { ...dates[job.id], current },
                      }));
                    }}
                  />
                  Работаю сейчас
                </label>
              </div>
            </div>
            <ResumeEditorTextarea
              label="Обязанности и результаты"
              name={`experience.${job.id}.description`}
              rows={3}
              defaultValue={job.description.map((line) => `•  ${line}`).join("\n")}
              hint="Каждый пункт — с новой строки. Добавляйте только реальный опыт."
            />
          </div>
        ))}
        <AddEntryButton>Добавить место работы</AddEntryButton>
      </ResumeEditorSection>

      <ResumeEditorSection
        id="education"
        title="4. Образование"
        icon={<GraduationCapIcon className="h-6 w-6" />}
      >
        {fixture.education.map((education) => (
          <div key={education.id} className="grid gap-5">
            <ResumeEditorField
              label="Учебное заведение"
              name={`education.${education.id}.institution`}
              defaultValue={education.institution}
            />
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_10rem]">
              <ResumeEditorField
                label="Направление / специальность"
                name={`education.${education.id}.degree`}
                defaultValue={education.degree}
              />
              <ResumeEditorField
                label="Год окончания"
                name={`education.${education.id}.year`}
                inputMode="numeric"
                maxLength={4}
                defaultValue={education.year}
              />
            </div>
          </div>
        ))}
        <AddEntryButton>Добавить образование</AddEntryButton>
      </ResumeEditorSection>

      <ResumeEditorSection
        id="skills"
        title="5. Навыки"
        icon={<ChartColumnIcon className="h-6 w-6" />}
      >
        <p className="mb-2 text-sm font-medium">Ваши навыки</p>
        <ul aria-label="Добавленные навыки" className="mb-4 flex flex-wrap gap-2">
          {fixture.skills.map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-3 py-2 text-xs font-medium text-accent"
            >
              {skill}
              <button
                type="button"
                disabled
                aria-label={`Удалить навык ${skill}`}
                className="-m-1 inline-flex h-5 w-5 items-center justify-center rounded disabled:cursor-not-allowed"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row">
          <input
            aria-label="Добавить навык"
            name="newSkill"
            placeholder="Добавить навык"
            className="h-12 min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 text-sm placeholder:text-text-soft/65 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          />
          <Button
            type="button"
            variant="secondary"
            disabled
            className="rounded-lg font-semibold disabled:opacity-100"
          >
            Добавить
          </Button>
        </div>
        <p className="mt-2 text-xs leading-5 text-text-soft">
          Добавляйте навыки, которыми владеете.
        </p>
      </ResumeEditorSection>

      <ResumeEditorSection id="languages" title="6. Языки" icon={<GlobeIcon className="h-6 w-6" />}>
        <div className="grid gap-5">
          {fixture.languages.map((language) => (
            <div
              key={language.id}
              className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-x-3 gap-y-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
            >
              <ResumeEditorSelect
                label="Язык"
                name={`languages.${language.id}.language`}
                defaultValue={language.language}
              >
                {["Русский", "Английский", "Немецкий", "Французский", "Испанский", "Китайский"].map(
                  (name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  )
                )}
              </ResumeEditorSelect>
              <div className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1">
                <ResumeEditorSelect
                  label="Уровень"
                  name={`languages.${language.id}.level`}
                  defaultValue={language.level}
                >
                  <option value="native">Родной</option>
                  <option value="A1">A1 — начальный</option>
                  <option value="A2">A2 — базовый</option>
                  <option value="B1">B1 — средний</option>
                  <option value="B2">B2 — выше среднего</option>
                  <option value="C1">C1 — продвинутый</option>
                  <option value="C2">C2 — свободный</option>
                </ResumeEditorSelect>
              </div>
              <div className="col-start-2 row-start-1 flex h-12 items-center sm:col-start-3">
                <RemoveEntryButton label={`Удалить язык: ${language.language}`} />
              </div>
            </div>
          ))}
        </div>
        <AddEntryButton>Добавить язык</AddEntryButton>
      </ResumeEditorSection>

      <ResumeEditorSection id="links" title="7. Ссылки" icon={<LinkIcon className="h-6 w-6" />}>
        {fixture.links.map((link) => (
          <div key={link.id} className="flex min-w-0 items-end gap-3">
            <div className="min-w-0 flex-1">
              <ResumeEditorField
                label="Ссылка"
                type="url"
                name={`links.${link.id}.url`}
                defaultValue={link.url}
                leadingIcon={<LinkIcon className="h-4 w-4" />}
              />
            </div>
            <div className="flex h-12 items-center">
              <RemoveEntryButton label="Удалить ссылку" />
            </div>
          </div>
        ))}
        <p className="mt-2 text-xs leading-5 text-text-soft">
          Портфолио, GitHub или другие примеры вашей работы.
        </p>
        <AddEntryButton>Добавить ссылку</AddEntryButton>
      </ResumeEditorSection>

      <footer className="flex flex-col items-stretch justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
        <p className="text-xs leading-5 text-text-soft">Пустые разделы не попадут в документ.</p>
        <Button type="button" className="whitespace-normal" onClick={onPreview}>
          Перейти к превью
          <ArrowRightIcon className="h-4 w-4 shrink-0" />
        </Button>
      </footer>
    </form>
  );
}
