import { Button, Card, Divider, ProgressBar } from "@/shared/ui";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@/shared/ui/icons";

export default function ResumeReviewPanel() {
  return (
    <article>
      <Card className="grid gap-6 px-8 py-8">
        <div className="grid gap-3">
          <p className="flex items-center gap-2 text-accent">
            <SparklesIcon className="h-6 w-6 shrink-0" />
            Следующий шаг
          </p>
          <h3 className="text-xl font-semibold">Сделаем сильнее</h3>

          <div className="text-5xl text-accent">
            72
            <span className="pl-1 text-base text-text-soft">/ 100</span>
          </div>
          <ProgressBar percent={72} />
          <div className="text-sm text-text-soft">Демонстрационная оценка</div>
        </div>

        <Divider />
        <div className="grid gap-4">
          <div className="text-sm text-text-soft">Подсказка 1 из 3</div>
          <h3 className="text-2xl">Добавьте конкретный результат</h3>
          <div className="text-sm text-text-soft">
            Задача описана. Теперь покажите, что изменилось благодаря вашей работе.
          </div>
          <Card className="bg-[#FCF0D8] text-[#AA8951]">
            Какая часть продукта стала лучше? Есть ли цифры или обратная связь?
          </Card>

          <Button variant={"primary"}>
            Уточнить результат <ArrowUpRightIcon className="h-4 w-4 shrink-0" />
          </Button>
        </div>
        <Divider />

        <div className="grid gap-4">
          <div className="flex justify-between">
            <p>Уточните стек проекта</p>
            <ChevronRightIcon className="h-4 w-4 shrink-0" />
          </div>

          <div className="flex justify-between">
            <p>Сократите раздел о себе</p>
            <ChevronRightIcon className="h-4 w-4 shrink-0" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-text-soft">
          <ShieldCheckIcon className="h-4 w-4 shrink-0" />
          <p>Добавляйте только то, что можете подтвердить</p>
        </div>
      </Card>
    </article>
  );
}
