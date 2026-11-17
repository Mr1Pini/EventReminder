import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthLink } from "@/features/auth/components/AuthLink";
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { isGoogleAuthEnabled } from "@/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return { title: t("registerTitle") };
}

export default async function RegisterPage() {
  const t = await getTranslations("auth");

  return (
    <AuthCard
      title={t("registerTitle")}
      description={t("registerDescription")}
      footer={t.rich("hasAccount", {
        link: (chunks) => <AuthLink href="/login">{chunks}</AuthLink>,
      })}
    >
      <RegisterForm />
      {isGoogleAuthEnabled && <GoogleSignInButton />}
    </AuthCard>
  );
}
