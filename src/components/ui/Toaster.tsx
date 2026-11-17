import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-full items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm text-foreground shadow-lg",
          success: "border-primary-strong",
          error: "border-danger",
          title: "font-medium",
        },
      }}
    />
  );
}
