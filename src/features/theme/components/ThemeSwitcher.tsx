"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useThemePreference } from "@/features/theme/hooks/use-theme-preference";

export function ThemeSwitcher() {
  const t = useTranslations("common.theme");
  const { preference, setPreference } = useThemePreference();

  return (
    <SegmentedControl
      name="theme"
      aria-label={t("label")}
      value={preference}
      options={[
        {
          value: "light",
          ariaLabel: t("light"),
          label: <Sun aria-hidden="true" className="size-4" />,
        },
        {
          value: "dark",
          ariaLabel: t("dark"),
          label: <Moon aria-hidden="true" className="size-4" />,
        },
        {
          value: "system",
          ariaLabel: t("system"),
          label: <Monitor aria-hidden="true" className="size-4" />,
        },
      ]}
      onChange={setPreference}
    />
  );
}
