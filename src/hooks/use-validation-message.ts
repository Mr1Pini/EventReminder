import { useMessages, useTranslations } from "next-intl";

type ValidationMessages = ReturnType<typeof useMessages>["validation"];

function isValidationKey(
  key: string,
  messages: ValidationMessages,
): key is keyof ValidationMessages {
  return Object.hasOwn(messages, key);
}

/**
 * Перекладає повідомлення zod: схеми зберігають ключі виду `validation.xxx`,
 * а react-hook-form типізує їх як звичайний рядок, тому ключ перевіряємо під час виконання.
 */
export function useValidationMessage(): (
  message: string | undefined,
) => string | undefined {
  const t = useTranslations("validation");
  const validationMessages = useMessages().validation;

  return (message) => {
    const key = message?.replace(/^validation\./, "");
    if (!key || !isValidationKey(key, validationMessages)) return message;
    return t(key);
  };
}
