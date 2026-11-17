"use client";

import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { loginWithGoogle } from "@/features/auth/actions";

// useFormStatus читає стан лише батьківської форми, тому кнопка — окремий компонент
function GoogleSubmitButton() {
  const t = useTranslations("auth");
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      isLoading={pending}
      className="w-full"
    >
      {t("googleSignIn")}
    </Button>
  );
}

export function GoogleSignInButton() {
  const t = useTranslations("common");

  return (
    <>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        {t("or")}
        <span className="h-px flex-1 bg-border" />
      </div>
      <form action={loginWithGoogle}>
        <GoogleSubmitButton />
      </form>
    </>
  );
}
