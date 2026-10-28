import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/platform", () => ({ IS_WINDOWS: false }));

import { createTerminalPathDropTarget } from "./useTerminalFileDrop";

describe("createTerminalPathDropTarget", () => {
  it("pastes a shell-quoted path", () => {
    const paste = vi.fn(() => true);
    const target = createTerminalPathDropTarget({
      leafIdAtPoint: () => 11,
      paste,
    });

    expect(target.dropPath(["/repo/My File.ts"], 40, 50)).toBe(true);
    expect(paste).toHaveBeenCalledWith(11, "'/repo/My File.ts' ");
  });

  it("pastes multiple dropped paths quoted", () => {
    const paste = vi.fn(() => true);
    const target = createTerminalPathDropTarget({
      leafIdAtPoint: () => 11,
      paste,
    });

    expect(target.dropPath(["/repo/a.ts", "/repo/b file.ts"], 40, 50)).toBe(
      true,
    );
    expect(paste).toHaveBeenCalledWith(11, "/repo/a.ts '/repo/b file.ts' ");
  });

  it("ignores a drop outside every terminal", () => {
    const paste = vi.fn(() => true);
    const target = createTerminalPathDropTarget({
      leafIdAtPoint: () => null,
      paste,
    });

    expect(target.dropPath(["/repo/file.ts"], 1, 2)).toBe(false);
    expect(paste).not.toHaveBeenCalled();
  });
});
