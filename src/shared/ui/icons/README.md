Иконки экспортированы из существующего экрана Figma:
https://www.figma.com/design/6HOuYx2Pu0YZHESAgzLI0g?node-id=2-685

Сохранены контуры и размеры иконок из макета. Координаты перенесены в локальный viewBox,
цвет заменён на currentColor, удалены идентификаторы слоёв и лишние обёртки экспорта.
ArrowUpRightIcon извлечён из контура символа ↗ в тексте кнопки «Уточнить результат».
Повторяющиеся шевроны используют один ChevronRightIcon.
LinkIcon добавлен отдельно для ссылок, в том же стиле; размер по умолчанию — 14 px.

```tsx
import { Button } from "@/shared/ui";
import { DownloadIcon, PencilIcon } from "@/shared/ui/icons";

<Button variant="outline">
  <PencilIcon className="h-4 w-4 shrink-0" />
  Редактировать
</Button>

<Button>
  <DownloadIcon className="h-4 w-4 shrink-0" />
  Скачать PDF
</Button>
```

SVGProps позволяют задавать className, width, height и остальные SVG-атрибуты.
Без переопределения размера используются размеры макета (12–16 px).
Цвет наследуется от текста родителя; можно задать text-accent или другой text-* класс.
Иконки по умолчанию декоративные (aria-hidden). Кнопке без текста задайте aria-label.
Для самостоятельной смысловой иконки передайте aria-hidden={false}, role="img" и aria-label.
