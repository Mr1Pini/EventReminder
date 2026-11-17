"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { registerUser } from "@/features/auth/actions";
import { registerSchema, type RegisterValues } from "@/features/auth/schemas";
import { useValidationMessage } from "@/hooks/use-validation-message";
import type { ErrorKey } from "@/lib/action-result";
import { FormError } from "./FormError";

export function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const getValidationMessage = useValidationMessage();
  const [errorKey, setErrorKey] = useState<ErrorKey>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function handleRegister(values: RegisterValues) {
    setErrorKey(undefined);
    const result = await registerUser(values);
    if (!result.success) {
      setErrorKey(result.errorKey);
      return;
    }
    router.replace("/events");
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-4"
    >
      <FormError errorKey={errorKey} />
      <Field
        id="name"
        label={t("nameLabel")}
        error={getValidationMessage(errors.name?.message)}
      >
        {(controlProps) => (
          <Input {...controlProps} {...register("name")} autoComplete="name" />
        )}
      </Field>
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
            autoComplete="new-password"
          />
        )}
      </Field>
      <Field
        id="confirmPassword"
        label={t("confirmPasswordLabel")}
        error={getValidationMessage(errors.confirmPassword?.message)}
      >
        {(controlProps) => (
          <Input
            {...controlProps}
            {...register("confirmPassword")}
            type="password"
            autoComplete="new-password"
          />
        )}
      </Field>
      <Button type="submit" isLoading={isSubmitting}>
        {t("registerSubmit")}
      </Button>
    </form>
  );
}
