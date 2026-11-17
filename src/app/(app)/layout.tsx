import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { auth } from "@/lib/auth";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const session = await auth();
  if (!session) redirect("/login");

  const t = await getTranslations("common");
  const userName = session.user.name ?? session.user.email ?? "";

  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link
            href="/events"
            className="inline-flex h-10 items-center rounded text-lg font-semibold text-primary-strong focus-visible:outline-2 focus-visible:outline-primary"
          >
            {t("appName")}
          </Link>
          <UserMenu userName={userName} />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {children}
      </main>
    </>
  );
}
