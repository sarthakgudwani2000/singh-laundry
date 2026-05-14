import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * When Vite `base` is `./`, URLs like `./images/...` resolve incorrectly if the page URL has no trailing slash (e.g. `/new` vs `/new/`).
 * The bundled script always lives under `…/<deploy-prefix>/assets/*.js`, so we can recover `<deploy-prefix>` (e.g. `/new`) for root-relative asset and router paths.
 */
export function pathnamePrefixBeforeAssetsChunk() {
  try {
    const path = new URL(import.meta.url).pathname;
    const i = path.indexOf("/assets/");
    if (i <= 0) return undefined;
    return path.slice(0, i) || undefined;
  } catch {
    return undefined;
  }
}
