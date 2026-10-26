import {
  readTerminalClipboard,
  writeTerminalClipboard,
} from "./terminalClipboard";
import {
  clearLeafSelection,
  leafGridSelection,
  pasteIntoSession,
} from "./terminalSessionApi";

/**
 * A program that owns the mouse expects the click itself, so the host only
 * handles it when Shift overrides mouse tracking.
 */
export function shouldHandleTerminalRightClick(
  event: Pick<MouseEvent, "defaultPrevented" | "shiftKey">,
  mouseTracking: boolean,
): boolean {
  if (event.defaultPrevented) return false;
  return !mouseTracking || event.shiftKey;
}

export async function copyTerminalSelection(leafId: number): Promise<boolean> {
  const selection = leafGridSelection(leafId);
  if (!selection) return false;
  return copySelection(leafId, selection);
}

export async function handleTerminalRightClick(
  leafId: number,
): Promise<boolean> {
  const selection = leafGridSelection(leafId);
  if (selection) return copySelection(leafId, selection);
  const text = await readTerminalClipboard();
  if (!text) return false;
  return pasteIntoSession(leafId, text);
}

async function copySelection(
  leafId: number,
  selection: string,
): Promise<boolean> {
  try {
    await writeTerminalClipboard(selection);
    clearLeafSelection(leafId);
    return true;
  } catch {
    return false;
  }
}
