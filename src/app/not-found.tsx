import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getButtonClassName } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <EmptyState
          icon={<FileQuestion aria-hidden="true" className="size-10" />}
          title={t("notFoundTitle")}
          description={t("notFoundDescription")}
          action={
            <Link href="/" className={getButtonClassName()}>
              {t("goHome")}
            </Link>
          }
        />
      </div>
    </main>
  );
}
