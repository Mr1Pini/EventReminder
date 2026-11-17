import { redirect } from "next/navigation";
import type { ActionResult } from "@/lib/action-result";
import { auth } from "@/lib/auth";

/** Повертає id користувача з сесії або помилку `errors.unauthorized`. */
export async function requireUserId(): Promise<ActionResult<string>> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, errorKey: "errors.unauthorized" };
  }

  return { success: true, data: userId };
}

/** Те саме, що `requireUserId`, але для читання даних: без сесії веде на /login. */
export async function requireUserIdOrRedirect(): Promise<string> {
  const result = await requireUserId();
  if (!result.success) redirect("/login");
  return result.data;
}
