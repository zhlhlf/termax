import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./terminalSessionApi", () => ({
  clearLeafSelection: vi.fn(),
  leafGridSelection: vi.fn(),
  pasteIntoSession: vi.fn(),
}));
vi.mock("./terminalClipboard", () => ({
  readTerminalClipboard: vi.fn(),
  writeTerminalClipboard: vi.fn(),
}));

import {
  readTerminalClipboard,
  writeTerminalClipboard,
} from "./terminalClipboard";
import {
  copyTerminalSelection,
  handleTerminalRightClick,
  shouldHandleTerminalRightClick,
} from "./terminalRightClick";
import {
  clearLeafSelection,
  leafGridSelection,
  pasteIntoSession,
} from "./terminalSessionApi";

function contextClick(overrides: Partial<MouseEvent> = {}) {
  return { defaultPrevented: false, shiftKey: false, ...overrides };
}

const selection = vi.mocked(leafGridSelection);
const clearSelection = vi.mocked(clearLeafSelection);
const paste = vi.mocked(pasteIntoSession);
const readClipboard = vi.mocked(readTerminalClipboard);
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
    expect(clearSelection).toHaveBeenCalledWith(7);
  });

  it("does not touch the clipboard without a selection", async () => {
    selection.mockReturnValue(null);

    await expect(copyTerminalSelection(7)).resolves.toBe(false);
    expect(writeClipboard).not.toHaveBeenCalled();
    expect(clearSelection).not.toHaveBeenCalled();
  });

  it("keeps the selection when the clipboard write fails", async () => {
    selection.mockReturnValue("selected output");
    writeClipboard.mockRejectedValue(new Error("clipboard unavailable"));

    await expect(copyTerminalSelection(7)).resolves.toBe(false);
    expect(clearSelection).not.toHaveBeenCalled();
  });

  it("copies instead of pasting when text is selected", async () => {
    selection.mockReturnValue("selected output");
    writeClipboard.mockResolvedValue(undefined);
    readClipboard.mockResolvedValue("clipboard text");

    await expect(handleTerminalRightClick(7)).resolves.toBe(true);
    expect(writeClipboard).toHaveBeenCalledWith("selected output");
    expect(readClipboard).not.toHaveBeenCalled();
    expect(paste).not.toHaveBeenCalled();
  });

  it("pastes the clipboard when nothing is selected", async () => {
    selection.mockReturnValue(null);
    readClipboard.mockResolvedValue("clipboard text");
    paste.mockReturnValue(true);

    await expect(handleTerminalRightClick(7)).resolves.toBe(true);
    expect(readClipboard).toHaveBeenCalledOnce();
    expect(paste).toHaveBeenCalledWith(7, "clipboard text");
    expect(writeClipboard).not.toHaveBeenCalled();
  });

  it("does nothing when there is no selection or clipboard text", async () => {
    selection.mockReturnValue(null);
    readClipboard.mockResolvedValue("");

    await expect(handleTerminalRightClick(7)).resolves.toBe(false);
    expect(paste).not.toHaveBeenCalled();
  });

  it("does not paste when copying the selection fails", async () => {
    selection.mockReturnValue("selected output");
    writeClipboard.mockRejectedValue(new Error("clipboard unavailable"));
    readClipboard.mockResolvedValue("clipboard text");

    await expect(handleTerminalRightClick(7)).resolves.toBe(false);
    expect(readClipboard).not.toHaveBeenCalled();
    expect(paste).not.toHaveBeenCalled();
  });
});
