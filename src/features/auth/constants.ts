import type { ErrorKey } from "@/lib/action-result";

export const PASSWORD_HASH_COST = 12;

// Коди з query-параметра `error`, який next-auth додає під час редіректу на /login
const AUTH_ERROR_KEYS: Partial<Record<string, ErrorKey>> = {
  CredentialsSignin: "errors.invalidCredentials",
  OAuthAccountNotLinked: "errors.oauthAccountNotLinked",
};

export function getAuthErrorKey(code: unknown): ErrorKey | undefined {
  if (typeof code !== "string") return undefined;
  return AUTH_ERROR_KEYS[code] ?? "errors.unknown";
}
