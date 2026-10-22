import { ResumePreview } from "@/features/resume/review/ui/ResumePreview";
import { resumePreviewFixture } from "@/features/resume/review/ui/ResumePreview.fixture";
import ResumeReviewPanel from "@/features/resume/review/ui/ResumeReviewPanel";
import { Button, Divider, IconBadge } from "@/shared/ui";
import { CheckIcon, DownloadIcon, FileTextIcon, PencilIcon } from "@/shared/ui/icons";

// бок меню подключим позже layout-ом.
export default function Rezume() {
  return (
    <div className="max-w-8xl w-full px-4 py-6 md:px-8">
      {/* Здесь будут заголовок, действия и шаги */}
      <h2 className="text-lg text-text-soft">
        Рабочее пространство <span className="font-semibold text-text"> / Резюме</span>
      </h2>

      <div className="flex flex-col justify-between gap-4 py-6 sm:flex-row">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Ваш опыт — убедительно.</h1>

          <p className="text-text-soft">Последний взгляд перед откликом</p>
        </div>

        <div className="flex gap-3">
          <Button variant={"outline"}>
            <PencilIcon className="h-4 w-4 shrink-0" />
            Редактировать
          </Button>
          <Button>
            <DownloadIcon className="h-4 w-4 shrink-0" />
            Скачать PDF
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <IconBadge size={30} tone="accentSoft">
            <CheckIcon />
          </IconBadge>
          <div className="">Данные</div>
        </div>

        <div className="flex items-center">
          <Divider orientation="horizontal" className="w-8 shrink-0" />
        </div>

        <div className="flex items-center gap-2">
          <IconBadge size={30}>
            <p>2</p>
          </IconBadge>
          <div className="text-accent">Превью и ревью</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-2 py-4 md:grid-cols-[minmax(0,8fr)_minmax(0,3fr)]">
        <div className="flex min-w-0 items-center justify-between gap-2 md:col-start-1 md:row-start-1">
          <div className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4 shrink-0" />
            Превью резюме
          </div>
          <div className="flex justify-between text-sm font-medium text-text-soft">Документ</div>
        </div>
        <div className="min-w-0 md:col-start-1 md:row-start-2">
          <ResumePreview resume={resumePreviewFixture} className="m-full" />

          <div className="flex items-center justify-center py-6 text-text-soft">
            <p>Проверьте контакты и формулировки перед отправкой</p>
          </div>
        </div>

        <div className="mt-4 min-w-0 md:col-start-2 md:row-start-2 md:mt-0">
          <ResumeReviewPanel />
        </div>
      </div>
    </div>
  );
}

// План
// 1 Сначала верстаю общий вид страницы с заглушками компонентов и бок компонент
// 2 - Потом приступаю к компонентам  резюмею

// Примерный вид
// export default function Rezume() {
//   return (
//     <WorkspaceShell>
//       <header>
//         <h1>Ваш опыт — убедительно.</h1>
//         <p>Последний взгляд перед откликом</p>

//         <ResumeActions />
//       </header>

//       <ResumeSteps />

//       <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
//         <ResumePreview resume={resumePreviewFixture} />
//         <ResumeReviewPanel />
//       </div>
//     </WorkspaceShell>
//   );
// }
