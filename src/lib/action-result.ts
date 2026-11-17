import type messages from "@/messages/uk.json";

// Ключі виводимо з uk.json, щоб неіснуючий ключ помилки не пройшов перевірку типів
export type ErrorKey = `errors.${keyof typeof messages.errors}`;

export type ActionResult<T = void> =
  { success: true; data: T } | { success: false; errorKey: ErrorKey };
