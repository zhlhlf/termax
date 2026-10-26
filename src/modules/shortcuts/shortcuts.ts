import { IS_MAC, IS_WINDOWS, MOD_PROP } from "@/lib/platform";

/**
 * Single source of truth for keyboard shortcuts.
 */

export type ShortcutId =
  | "commandPalette.open"
  | "commandPalette.content"
  | "tab.new"
  | "tab.newPreview"
  | "tab.close"
  | "tab.next"
  | "tab.prev"
  | "tab.selectByIndex"
  | "space.next"
  | "space.prev"
  | "space.overview"
  | "pane.splitRight"
  | "pane.splitDown"
  | "pane.focusNext"
  | "pane.focusPrev"
  | "pane.swapLeft"
  | "pane.swapRight"
  | "pane.swapUp"
  | "pane.swapDown"
  | "terminal.clear"
  | "terminal.toggleInput"
  | "search.focus"
  | "view.zoomIn"
  | "view.zoomOut"
  | "view.zoomReset"
  | "view.zenMode"
  | "settings.open"
  | "editor.undo"
  | "editor.redo"
  | "editor.save"
  | "editor.codeComplete";

export type ShortcutGroup =
  | "General"
  | "Tabs"
  | "Spaces"
  | "Panes"
  | "Terminal"
  | "Search"
  | "View"
  | "Editor";

export type KeyBinding = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

export type Shortcut = {
  id: ShortcutId;
  label: string;
  group: ShortcutGroup;
  defaultBindings: KeyBinding[];
  allowRepeat?: boolean;
};

export function tabDefaultBindings(
  key: "t" | "w",
  windows = IS_WINDOWS,
): KeyBinding[] {
  return windows ? [{ alt: true, key }] : [{ [MOD_PROP]: true, key }];
}

export const SHORTCUTS: Shortcut[] = [
  {
    id: "commandPalette.open",
    label: "shortcut.commandPalette.open",
    group: "General",
    defaultBindings: [{ [MOD_PROP]: true, key: "p" }],
  },
  {
    id: "commandPalette.content",
    label: "shortcut.commandPalette.content",
    group: "General",
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "p" }],
  },
  {
    id: "settings.open",
    label: "shortcut.settings.open",
    group: "General",
    defaultBindings: [{ [MOD_PROP]: true, key: "," }],
  },
  {
    id: "tab.new",
    label: "shortcut.tab.new",
    group: "Tabs",
    defaultBindings: tabDefaultBindings("t"),
  },
  {
    id: "tab.newPreview",
    label: "shortcut.tab.newPreview",
    group: "Tabs",
    // Cmd/Ctrl+P now opens the command palette, so web preview moves here.
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "o" }],
  },
  {
    id: "tab.close",
    label: "shortcut.tab.close",
    group: "Tabs",
    defaultBindings: tabDefaultBindings("w"),
  },
  {
    id: "pane.splitRight",
    label: "shortcut.pane.splitRight",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "r" }],
  },
  {
    id: "pane.splitDown",
    label: "shortcut.pane.splitDown",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "d" }],
  },
  {
    id: "pane.focusNext",
    label: "shortcut.pane.focusNext",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, key: "]" }],
  },
  {
    id: "pane.focusPrev",
    label: "shortcut.pane.focusPrev",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, key: "[" }],
  },
  {
    id: "pane.swapLeft",
    label: "shortcut.pane.swapLeft",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, alt: true, key: "ArrowLeft" }],
  },
  {
    id: "pane.swapRight",
    label: "shortcut.pane.swapRight",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, alt: true, key: "ArrowRight" }],
  },
  {
    id: "pane.swapUp",
    label: "shortcut.pane.swapUp",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, alt: true, key: "ArrowUp" }],
  },
  {
    id: "pane.swapDown",
    label: "shortcut.pane.swapDown",
    group: "Panes",
    defaultBindings: [{ [MOD_PROP]: true, alt: true, key: "ArrowDown" }],
  },
  {
    id: "terminal.clear",
    label: "shortcut.terminal.clear",
    group: "Terminal",
    // macOS Terminal's ⌘K (clear scrollback, keep the prompt). Default only on
    // macOS — on other platforms Ctrl+K is readline's kill-line, so we leave it
    // unbound and let users assign their own in settings.
    defaultBindings: IS_MAC ? [{ meta: true, key: "k" }] : [],
  },
  {
    id: "terminal.toggleInput",
    label: "shortcut.terminal.toggleInput",
    group: "Terminal",
    defaultBindings: [{ [MOD_PROP]: true, key: "u" }],
  },
  {
    id: "tab.next",
    label: "shortcut.tab.next",
    group: "Tabs",
    defaultBindings: [{ ctrl: true, key: "Tab" }],
    allowRepeat: true,
  },
  {
    id: "tab.prev",
    label: "shortcut.tab.prev",
    group: "Tabs",
    defaultBindings: [{ ctrl: true, shift: true, key: "Tab" }],
    allowRepeat: true,
  },
  {
    id: "tab.selectByIndex",
    label: "shortcut.tab.selectByIndex",
    group: "Tabs",
    defaultBindings: [{ [MOD_PROP]: true, key: "1" }],
  },
  {
    id: "space.next",
    label: "shortcut.space.next",
    group: "Spaces",
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "]" }],
  },
  {
    id: "space.prev",
    label: "shortcut.space.prev",
    group: "Spaces",
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "[" }],
  },
  {
    id: "space.overview",
    label: "shortcut.space.overview",
    group: "Spaces",
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "s" }],
  },
  {
    id: "search.focus",
    label: "shortcut.search.focus",
    group: "Search",
    defaultBindings: [{ [MOD_PROP]: true, key: "f" }],
  },
  {
    id: "view.zoomIn",
    label: "shortcut.view.zoomIn",
    group: "View",
    defaultBindings: [
      { [MOD_PROP]: true, key: "=" },
      { [MOD_PROP]: true, shift: true, key: "+" },
    ],
    allowRepeat: true,
  },
  {
    id: "view.zoomOut",
    label: "shortcut.view.zoomOut",
    group: "View",
    defaultBindings: [
      { [MOD_PROP]: true, key: "-" },
      { [MOD_PROP]: true, shift: true, key: "_" },
    ],
    allowRepeat: true,
  },
  {
    id: "view.zoomReset",
    label: "shortcut.view.zoomReset",
    group: "View",
    defaultBindings: [{ [MOD_PROP]: true, key: "0" }],
  },
  {
    id: "view.zenMode",
    label: "shortcut.view.zenMode",
    group: "View",
    defaultBindings: [{ [MOD_PROP]: true, shift: true, key: "'" }],
  },
  // Editor undo/redo: App.tsx registers handlers and useGlobalShortcuts
  // preventDefaults on match. Keep Mod+Y and add macOS Mod+Shift+Z (#941).
  // Still excluded from the customization UI in ShortcutsSection.
  {
    id: "editor.undo",
    label: "shortcut.editor.undo",
    group: "Editor",
    defaultBindings: [{ [MOD_PROP]: true, key: "z" }],
  },
  {
    id: "editor.redo",
    label: "shortcut.editor.redo",
    group: "Editor",
    defaultBindings: [
      { [MOD_PROP]: true, key: "y" },
      { [MOD_PROP]: true, shift: true, key: "z" },
    ],
  },
  // Mod+S at the app layer so WKWebView cannot steal "Save Page" (#969).
  // CodeMirror also binds Mod-s; the global handler preventDefaults first.
  {
    id: "editor.save",
    label: "shortcut.editor.save",
    group: "Editor",
    defaultBindings: [{ [MOD_PROP]: true, key: "s" }],
  },
  {
    id: "editor.codeComplete",
    label: "shortcut.editor.codeComplete",
    group: "Editor",
    defaultBindings: [{ ctrl: true, key: " " }],
  },
];

export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  "General",
  "Tabs",
  "Panes",
  "Terminal",
  "View",
  "Search",
  "Editor",
];

/**
 * Matching logic: checks if a KeyboardEvent matches a KeyBinding.
 */
const CODE_TO_KEY: Record<string, string> = {
  Backslash: "\\",
  Slash: "/",
  BracketLeft: "[",
  BracketRight: "]",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  Space: " ",
};

// Option and Shift combinations rewrite e.key (macOS Option gives "«", "…",
// dead keys; Shift turns "." into ">"); the physical key survives in e.code.
function keyFromCode(code: string): string | null {
  if (code.startsWith("Key")) return code.slice(3).toLowerCase();
  if (code.startsWith("Digit")) return code.slice(5);
  return CODE_TO_KEY[code] ?? null;
}

export function matchBinding(
  e: KeyboardEvent,
  binding: KeyBinding,
  id?: ShortcutId,
): boolean {
  const eventKey = e.key.toLowerCase();
  const bindingKey = binding.key.toLowerCase();

  // Special case for Jump to Tab 1-9
  if (id === "tab.selectByIndex") {
    if (!/^[1-9]$/.test(e.key)) return false;
  } else if (eventKey !== bindingKey) {
    if (!binding.alt && !binding.shift) return false;
    if (keyFromCode(e.code) !== bindingKey) return false;
  }

  return (
    !!e.ctrlKey === !!binding.ctrl &&
    !!e.shiftKey === !!binding.shift &&
    !!e.altKey === !!binding.alt &&
    !!e.metaKey === !!binding.meta
  );
}

/**
 * Display helpers
 */
export function getBindingTokens(binding?: KeyBinding): string[] {
  if (!binding) return [];
  const tokens: string[] = [];
  if (IS_MAC) {
    if (binding.ctrl) tokens.push("⌃");
    if (binding.alt) tokens.push("⌥");
    if (binding.shift) tokens.push("⇧");
    if (binding.meta) tokens.push("⌘");
  } else {
    if (binding.ctrl) tokens.push("Ctrl");
    if (binding.alt) tokens.push("Alt");
    if (binding.shift) tokens.push("Shift");
    if (binding.meta) tokens.push("Win");
  }

  let keyLabel = binding.key;
  if (keyLabel === " ") keyLabel = "Space";
  else if (keyLabel === "ArrowUp") keyLabel = "↑";
  else if (keyLabel === "ArrowDown") keyLabel = "↓";
  else if (keyLabel === "ArrowLeft") keyLabel = "←";
  else if (keyLabel === "ArrowRight") keyLabel = "→";
  else if (keyLabel.length === 1) keyLabel = keyLabel.toUpperCase();

  tokens.push(keyLabel);
  return tokens;
}
