import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * prefers-reduced-motion, hydration-safe. The static HTML is rendered with motion
 * on, so during hydration this returns false (matching the HTML) and then
 * re-renders with the visitor's real preference. Framer's own hook reads the
 * media query on the first client render, which caused hydration mismatches
 * (React #418) for reduced-motion visitors.
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
