import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const tCommon = await getTranslations("common");
  const tMetadata = await getTranslations("metadata");

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-8 text-center">
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-primary" />
        <h1 className="text-2xl font-semibold text-foreground">
          {tCommon("appName")}
        </h1>
        <p className="mt-2 text-muted">{tMetadata("description")}</p>
      </div>
    </main>
  );
}
