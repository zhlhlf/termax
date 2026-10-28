import { getCurrentWebview } from "@tauri-apps/api/webview";
import { useEffect } from "react";
import { formatDroppedPaths } from "./quoteShellPath";
import { pasteIntoSession } from "./terminalSessionApi";

export type TerminalPathDropTarget = {
  dropPath: (paths: string[], clientX: number, clientY: number) => boolean;
};

type TerminalPathDropDeps = {
  leafIdAtPoint: (clientX: number, clientY: number) => number | null;
  paste: (leafId: number, text: string) => boolean;
};

// Tauri reports the drop point in physical pixels on some platforms and logical
// on others; only scale down when it overflows the logical viewport.
function leafIdAt(x: number, y: number): number | null {
  let lx = x;
  let ly = y;
  if (x > window.innerWidth || y > window.innerHeight) {
    const dpr = window.devicePixelRatio || 1;
    lx = x / dpr;
    ly = y / dpr;
  }
  const el = document.elementFromPoint(lx, ly);
  const leafEl = el?.closest<HTMLElement>("[data-pane-leaf]");
  if (!leafEl) return null;
  const id = Number(leafEl.dataset.paneLeaf);
  return Number.isFinite(id) ? id : null;
}

export function createTerminalPathDropTarget({
  leafIdAtPoint,
  paste,
}: TerminalPathDropDeps): TerminalPathDropTarget {
  return {
    dropPath(paths, clientX, clientY) {
      const leafId = leafIdAtPoint(clientX, clientY);
      if (leafId === null) return false;
      paste(leafId, formatDroppedPaths(paths));
      return true;
    },
  };
}

const terminalPathDropTarget = createTerminalPathDropTarget({
  leafIdAtPoint: leafIdAt,
  paste: pasteIntoSession,
});

/** Wires native OS file drops into the terminal pane under the cursor and
 * bracketed-pastes the shell-quoted path(s) on drop. */
export function useTerminalFileDrop(): void {
  useEffect(() => {
    let disposed = false;
    let unlisten: (() => void) | null = null;

    void getCurrentWebview()
      .onDragDropEvent((e) => {
        const p = e.payload;
        if (p.type !== "drop" || !p.paths.length) return;
        terminalPathDropTarget.dropPath(p.paths, p.position.x, p.position.y);
      })
      .then((fn) => {
        if (disposed) fn();
        else unlisten = fn;
      })
      .catch((err) => console.error("[terax] drag-drop listen failed:", err));

    return () => {
      disposed = true;
      unlisten?.();
    };
  }, []);
}
