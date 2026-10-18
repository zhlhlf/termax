import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

function setWindowShape(fullscreen: boolean) {
  const root = document.documentElement;
  if (fullscreen) root.dataset.windowShape = "fullscreen";
  else delete root.dataset.windowShape;
}

export function WindowShapeBridge() {
  useEffect(() => {
    const window = getCurrentWindow();
    let alive = true;
    let unlisten: (() => void) | undefined;

    const sync = () => {
      void window
        .isFullscreen()
        .then((fullscreen) => {
          if (alive) setWindowShape(fullscreen);
        })
        .catch(() => {});
    };

    sync();
    void window
      .onResized(sync)
      .then((stop) => {
        if (alive) unlisten = stop;
        else stop();
      })
      .catch(() => {});

    return () => {
      alive = false;
      unlisten?.();
    };
  }, []);

  return null;
}
