import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthLink } from "@/features/auth/components/AuthLink";
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { getAuthErrorKey } from "@/features/auth/constants";
import { isGoogleAuthEnabled } from "@/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return { title: t("loginTitle") };
}

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;
  const t = await getTranslations("auth");

  return (
    <AuthCard
      title={t("loginTitle")}
      description={t("loginDescription")}
      footer={t.rich("noAccount", {
        link: (chunks) => <AuthLink href="/register">{chunks}</AuthLink>,
      })}
    >
      <LoginForm initialErrorKey={getAuthErrorKey(error)} />
      {isGoogleAuthEnabled && <GoogleSignInButton />}
    </AuthCard>
  );
}
