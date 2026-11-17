"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { PASSWORD_HASH_COST } from "@/features/auth/constants";
import {
  loginSchema,
  registerSchema,
  type LoginValues,
  type RegisterValues,
} from "@/features/auth/schemas";
import type { ActionResult } from "@/lib/action-result";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function registerUser(
  values: RegisterValues,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, errorKey: "errors.invalidInput" };
  }

  const { name, email, password } = parsed.data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existingUser) {
    return { success: false, errorKey: "errors.emailTaken" };
  }

  const passwordHash = await bcrypt.hash(password, PASSWORD_HASH_COST);
  await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true },
  });
  await signIn("credentials", { email, password, redirect: false });

  return { success: true, data: undefined };
}

export async function loginWithCredentials(
  values: LoginValues,
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, errorKey: "errors.invalidInput" };
  }

  try {
    await signIn("credentials", { ...parsed.data, redirect: false });
  } catch (error) {
    // Невідомі помилки прокидаємо далі: їх обробить error boundary
    if (error instanceof AuthError) {
      return { success: false, errorKey: "errors.invalidCredentials" };
    }
    throw error;
  }

  return { success: true, data: undefined };
}

export async function loginWithGoogle(): Promise<void> {
  await signIn("google", { redirectTo: "/events" });
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}
