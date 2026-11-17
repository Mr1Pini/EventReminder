"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { loginWithCredentials } from "@/features/auth/actions";
import { loginSchema, type LoginValues } from "@/features/auth/schemas";
import { useValidationMessage } from "@/hooks/use-validation-message";
import type { ErrorKey } from "@/lib/action-result";
import { FormError } from "./FormError";

interface LoginFormProps {
  initialErrorKey?: ErrorKey;
}

export function LoginForm({ initialErrorKey }: LoginFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const getValidationMessage = useValidationMessage();
  const [errorKey, setErrorKey] = useState(initialErrorKey);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleLogin(values: LoginValues) {
    setErrorKey(undefined);
    const result = await loginWithCredentials(values);
    if (!result.success) {
      setErrorKey(result.errorKey);
      return;
    }
    router.replace("/events");
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col gap-4"
    >
      <FormError errorKey={errorKey} />
      <Field
        id="email"
        label={t("emailLabel")}
        error={getValidationMessage(errors.email?.message)}
      >
        {(controlProps) => (
          <Input
            {...controlProps}
            {...register("email")}
            type="email"
            autoComplete="email"
          />
        )}
      </Field>
      <Field
        id="password"
        label={t("passwordLabel")}
        error={getValidationMessage(errors.password?.message)}
      >
        {(controlProps) => (
          <Input
            {...controlProps}
            {...register("password")}
            type="password"
            autoComplete="current-password"
          />
        )}
      </Field>
      <Button type="submit" isLoading={isSubmitting}>
        {t("loginSubmit")}
      </Button>
    </form>
  );
}
