import { useSyncExternalStore } from "react";

function subscribe(): () => void {
  return () => {};
}

/** `false` на сервері й під час гідратації, `true` після монтування на клієнті. */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
