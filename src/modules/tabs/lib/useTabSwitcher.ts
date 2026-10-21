import { useCallback, useEffect, useRef, useState } from "react";

export type TabSwitcherState = {
  /** Tab ids in visual tab-strip order. */
  order: number[];
  /** Index in `order` currently previewed by the switcher. */
  index: number;
  /** Tab that was active when this switcher session started. */
  fromId: number;
};

type Options = {
  /** Candidate tab ids in visual tab-strip order. */
  getOrder: () => number[];
  /** Id of the currently active tab, used as the cycle anchor. */
  getActiveId: () => number;
  /** Called on commit with the chosen tab id (never the already-active one). */
  onCommit: (id: number) => void;
};

export function advanceTabSwitcher(
  prev: TabSwitcherState | null,
  order: number[],
  activeId: number,
  delta: 1 | -1,
): TabSwitcherState | null {
  if (prev) {
    const len = prev.order.length;
    if (len < 2) return null;
    return { ...prev, index: (prev.index + delta + len) % len };
  }
  if (order.length < 2) return null;
  const activeIndex = order.indexOf(activeId);
  const base = activeIndex >= 0 ? activeIndex : 0;
  return {
    order,
    index: (base + delta + order.length) % order.length,
    fromId: order[base],
  };
}

export function useTabSwitcher({ getOrder, getActiveId, onCommit }: Options) {
  const [state, setState] = useState<TabSwitcherState | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const cb = useRef({ getOrder, getActiveId, onCommit });
  cb.current = { getOrder, getActiveId, onCommit };

  const step = useCallback((delta: 1 | -1) => {
    setState((prev) =>
      advanceTabSwitcher(
        prev,
        cb.current.getOrder(),
        cb.current.getActiveId(),
        delta,
      ),
    );
  }, []);

  const commit = useCallback(() => {
    const s = stateRef.current;
    if (!s) return;
    setState(null);
    const id = s.order[s.index];
    if (id !== undefined && id !== s.fromId) cb.current.onCommit(id);
  }, []);

  const cancel = useCallback(() => setState(null), []);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (!stateRef.current) return;
      if (!e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) commit();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (stateRef.current && e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        cancel();
      }
    };
    window.addEventListener("keyup", onKeyUp, { capture: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("blur", cancel);
    return () => {
      window.removeEventListener("keyup", onKeyUp, { capture: true });
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("blur", cancel);
    };
  }, [commit, cancel]);

  return { state, step };
}
