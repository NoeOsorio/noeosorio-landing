import { useCallback } from 'react';

export type Mount<T> = (root: HTMLElement, data: T, env: { reduce: boolean; footerOnly?: boolean }) => () => void;

// Runs a section's mount once per element. The callback keeps its identity across renders,
// so a re-render never tears a section down and builds it again.
export function useMount<T>(mount: Mount<T>, data: T) {
  return useCallback(
    (root: HTMLElement | null) => {
      if (!root) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cleanup = mount(root, data, { reduce });
      return () => cleanup();
    },
    [mount, data],
  );
}
