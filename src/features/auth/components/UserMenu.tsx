import { LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { logout } from "@/features/auth/actions";

interface UserMenuProps {
  userName: string;
}

export async function UserMenu({ userName }: UserMenuProps) {
  const t = await getTranslations("auth");

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-48 truncate text-sm text-muted sm:inline">
        {userName}
      </span>
      <form action={logout}>
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          aria-label={t("logout")}
          title={t("logout")}
        >
          <LogOut aria-hidden="true" className="size-5" />
        </Button>
      </form>
    </div>
  );
}
