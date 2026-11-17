import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("events");
  return { title: t("pageTitle") };
}

export default async function EventsPage() {
  const session = await auth();
  const t = await getTranslations("events");
  const name = session?.user.name ?? session?.user.email ?? "";

  return (
    <h1 className="text-2xl font-semibold text-foreground">
      {t("welcome", { name })}
    </h1>
  );
}
