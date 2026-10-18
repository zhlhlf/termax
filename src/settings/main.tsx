import "../styles/globals.css";

import { WINDOW_CHROME } from "@/lib/platform";
import { ThemeProvider, WindowShapeBridge } from "@/modules/theme";
import { getCurrentWindow } from "@tauri-apps/api/window";
import ReactDOM from "react-dom/client";
import { SettingsApp } from "./SettingsApp";

if (WINDOW_CHROME) {
  document.documentElement.dataset.chrome = WINDOW_CHROME;
}

ReactDOM.createRoot(
  document.getElementById("settings-root") as HTMLElement,
).render(
  <ThemeProvider>
    <WindowShapeBridge />
    <SettingsApp />
  </ThemeProvider>,
);

const showWindow = () => {
  getCurrentWindow()
    .show()
    .catch((e) => console.error("settings show failed:", e));
};
setTimeout(showWindow, 50);
setTimeout(showWindow, 500);
