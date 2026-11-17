"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Button } from "./Button";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  onCloseAutoFocus?: (event: Event) => void;
  children: ReactNode;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  onCloseAutoFocus,
  children,
}: DialogProps) {
  const t = useTranslations("common");

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-foreground/40" />
        {/* На мобільному — майже на весь екран; від md — по центру, а max-h віднімає відступи inset-4 */}
        <DialogPrimitive.Content
          // Без опису явно знімаємо aria-describedby, інакше Radix попереджає в консолі
          {...(description ? {} : { "aria-describedby": undefined })}
          onCloseAutoFocus={onCloseAutoFocus}
          className="fixed inset-2 z-50 overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-lg md:inset-4 md:m-auto md:h-fit md:max-h-[calc(100dvh-2rem)] md:max-w-lg"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("close")}
                className="-mt-2 -mr-2"
              >
                <X aria-hidden="true" className="size-5" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          {description && (
            <DialogPrimitive.Description className="mb-4 text-sm text-muted">
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
