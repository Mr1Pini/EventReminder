import { z } from "zod";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;

// Нормалізуємо email до перевірки формату, щоб пробіли й регістр не впливали на результат
const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "validation.emailRequired")
  .pipe(z.email("validation.emailInvalid"));

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "validation.passwordRequired"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(NAME_MIN_LENGTH, "validation.nameTooShort")
      .max(NAME_MAX_LENGTH, "validation.nameTooLong"),
    email: emailSchema,
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "validation.passwordTooShort"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    error: "validation.passwordsMismatch",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
