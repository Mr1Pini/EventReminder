import bcrypt from "bcryptjs";
import { Importance } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

const DEMO_EMAIL = "demo@eventreminder.dev";
const DEMO_PASSWORD = "Demo1234!";
const DEMO_NAME = "Демо Користувач";
const PASSWORD_HASH_COST = 12;

interface SeedEvent {
  dayOffset: number;
  hour: number;
  minute: number;
  title: string;
  description?: string;
  importance: Importance;
  isCompleted?: boolean;
}

// Дати рахуємо від поточного дня, щоб календар завжди виглядав «живим»
const SEED_EVENTS: SeedEvent[] = [
  {
    dayOffset: -45,
    hour: 10,
    minute: 0,
    title: "Річний звіт для бухгалтерії",
    description: "Зібрати всі документи й передати до кінця дня.",
    importance: Importance.IMPORTANT,
    isCompleted: true,
  },
  {
    dayOffset: -21,
    hour: 18,
    minute: 30,
    title: "Тренування в залі",
    importance: Importance.NORMAL,
    isCompleted: true,
  },
  {
    dayOffset: -14,
    hour: 9,
    minute: 0,
    title: "Дедлайн по проєкту",
    description: "Здати фінальну версію замовнику.",
    importance: Importance.CRITICAL,
    isCompleted: true,
  },
  {
    dayOffset: -7,
    hour: 15,
    minute: 0,
    title: "Записатися до стоматолога",
    importance: Importance.IMPORTANT,
  },
  {
    dayOffset: -3,
    hour: 12,
    minute: 15,
    title: "Оплатити рахунок за інтернет",
    description: "Термін оплати минув, не забути про пеню.",
    importance: Importance.CRITICAL,
  },
  {
    dayOffset: -1,
    hour: 20,
    minute: 0,
    title: "Подзвонити батькам",
    importance: Importance.NORMAL,
    isCompleted: true,
  },
  {
    dayOffset: 0,
    hour: 23,
    minute: 0,
    title: "Підготувати презентацію",
    description: "Додати слайди з результатами за квартал.",
    importance: Importance.IMPORTANT,
  },
  {
    dayOffset: 1,
    hour: 9,
    minute: 30,
    title: "Щоденна нарада команди",
    importance: Importance.NORMAL,
  },
  {
    dayOffset: 1,
    hour: 14,
    minute: 0,
    title: "Співбесіда з кандидатом",
    description: "Підготувати питання щодо досвіду з React та Node.",
    importance: Importance.IMPORTANT,
  },
  {
    dayOffset: 3,
    hour: 8,
    minute: 0,
    title: "Здати аналізи",
    importance: Importance.NORMAL,
  },
  {
    dayOffset: 6,
    hour: 19,
    minute: 0,
    title: "Вечеря з друзями",
    description: "Столик на шістьох, ресторан на набережній.",
    importance: Importance.NORMAL,
  },
  {
    dayOffset: 10,
    hour: 11,
    minute: 0,
    title: "Продовжити страхування авто",
    description: "Поліс закінчується наприкінці місяця.",
    importance: Importance.CRITICAL,
  },
  {
    dayOffset: 20,
    hour: 16,
    minute: 45,
    title: "Зустріч із ментором",
    importance: Importance.IMPORTANT,
  },
  {
    dayOffset: 45,
    hour: 10,
    minute: 0,
    title: "Конференція з веброзробки",
    description: "Реєстрація о 10:00, перший доклад о 11:00.",
    importance: Importance.IMPORTANT,
  },
  {
    dayOffset: 90,
    hour: 7,
    minute: 30,
    title: "Виліт у відпустку",
    importance: Importance.CRITICAL,
  },
];

function toStartsAt({ dayOffset, hour, minute }: SeedEvent): Date {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, PASSWORD_HASH_COST);

  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { name: DEMO_NAME, passwordHash },
    create: { email: DEMO_EMAIL, name: DEMO_NAME, passwordHash },
    select: { id: true },
  });

  await prisma.event.deleteMany({ where: { userId: user.id } });
  await prisma.event.createMany({
    data: SEED_EVENTS.map((event) => ({
      title: event.title,
      description: event.description,
      startsAt: toStartsAt(event),
      importance: event.importance,
      isCompleted: event.isCompleted ?? false,
      userId: user.id,
    })),
  });

  console.log(`Seed завершено: ${DEMO_EMAIL}, подій: ${SEED_EVENTS.length}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
