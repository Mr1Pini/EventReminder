import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}

export function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  return (
    <section className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </header>
      <div className="flex flex-col gap-4">{children}</div>
      <footer className="mt-6 text-center text-sm text-muted">{footer}</footer>
    </section>
  );
}
