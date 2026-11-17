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
