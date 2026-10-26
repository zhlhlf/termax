import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./terminalSessionApi", () => ({ leafGridSelection: vi.fn() }));
vi.mock("./terminalClipboard", () => ({ writeTerminalClipboard: vi.fn() }));

import { writeTerminalClipboard } from "./terminalClipboard";
import {
  copyTerminalSelection,
  shouldHandleTerminalRightClick,
} from "./terminalRightClick";
import { leafGridSelection } from "./terminalSessionApi";

function contextClick(overrides: Partial<MouseEvent> = {}) {
  return { defaultPrevented: false, shiftKey: false, ...overrides };
}

const selection = vi.mocked(leafGridSelection);
const writeClipboard = vi.mocked(writeTerminalClipboard);

describe("terminal right-click", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("handles a plain right click when the program does not track the mouse", () => {
    expect(shouldHandleTerminalRightClick(contextClick(), false)).toBe(true);
  });

  it("leaves the click to a program that tracks the mouse", () => {
    expect(shouldHandleTerminalRightClick(contextClick(), true)).toBe(false);
  });

  it("handles Shift+right-click while the program tracks the mouse", () => {
    expect(
      shouldHandleTerminalRightClick(contextClick({ shiftKey: true }), true),
    ).toBe(true);
  });

  it("ignores an event already consumed by an earlier handler", () => {
    expect(
      shouldHandleTerminalRightClick(
        contextClick({ defaultPrevented: true }),
        false,
      ),
    ).toBe(false);
  });

  it("copies the current terminal selection", async () => {
    selection.mockReturnValue("selected output");
    writeClipboard.mockResolvedValue(undefined);

    await expect(copyTerminalSelection(7)).resolves.toBe(true);
    expect(writeClipboard).toHaveBeenCalledWith("selected output");
  });

  it("does not touch the clipboard without a selection", async () => {
    selection.mockReturnValue(null);

    await expect(copyTerminalSelection(7)).resolves.toBe(false);
    expect(writeClipboard).not.toHaveBeenCalled();
  });
});
