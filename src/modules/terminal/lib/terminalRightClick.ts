import { writeTerminalClipboard } from "./terminalClipboard";
import { leafGridSelection } from "./terminalSessionApi";

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
  try {
    await writeTerminalClipboard(selection);
    return true;
  } catch {
    return false;
  }
}
