import { describe, expect, it } from "vitest";
import { advanceTabSwitcher } from "./useTabSwitcher";

describe("advanceTabSwitcher", () => {
  it("walks every tab in strip order and wraps to the first", () => {
    const order = [1, 2, 3];
    let state = advanceTabSwitcher(null, order, 1, 1);
    expect(state?.index).toBe(1);

    state = advanceTabSwitcher(state, order, 1, 1);
    expect(state?.index).toBe(2);

    state = advanceTabSwitcher(state, order, 1, 1);
    expect(state?.index).toBe(0);
  });

  it("anchors forward cycling on the active tab in the middle", () => {
    expect(advanceTabSwitcher(null, [1, 2, 3, 4], 2, 1)?.index).toBe(2);
    expect(advanceTabSwitcher(null, [1, 2, 3, 4], 2, -1)?.index).toBe(0);
  });

  it("wraps backward from the first tab to the last", () => {
    expect(advanceTabSwitcher(null, [1, 2, 3], 1, -1)?.index).toBe(2);
  });

  it("keeps the order captured at the start of the session", () => {
    const first = advanceTabSwitcher(null, [1, 2, 3], 1, 1);
    const next = advanceTabSwitcher(first, [3, 1, 2], 2, 1);
    expect(next?.order).toEqual([1, 2, 3]);
    expect(next?.fromId).toBe(1);
  });

  it("does nothing with fewer than two tabs", () => {
    expect(advanceTabSwitcher(null, [1], 1, 1)).toBeNull();
  });
});
