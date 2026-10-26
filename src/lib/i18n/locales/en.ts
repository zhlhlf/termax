/**
 * Source-of-truth dictionary. `zh-CN` must satisfy this exact shape.
 * Flat dot-notation keys, grouped by area. Do not translate here.
 */
export const en = {
  // ── Settings: top-level navigation ────────────────────────────────────
  "settings.tab.general": "General",
  "settings.tab.editor": "Editor",
  "settings.tab.themes": "Themes",
  "settings.tab.shortcuts": "Shortcuts",
  "settings.tab.about": "About",

  // ── Settings: General ─────────────────────────────────────────────────
  "settings.general.title": "General",
  "settings.general.description": "Mode, terminal, and startup.",
  "settings.general.appearance": "Appearance",
  "settings.general.appearance.system": "System",
  "settings.general.appearance.light": "Light",
  "settings.general.appearance.dark": "Dark",
  "settings.general.appearance.hint1":
    "For theme, background and customization, see the",
  "settings.general.appearance.hint2": "tab.",
  "settings.general.zoom": "Zoom",
  "settings.general.zoom.level": "UI zoom level",
  "settings.general.language": "Language",
  "settings.general.language.description":
    "Interface language. Applies immediately across all windows.",
  "settings.general.headerSearch.title": "Show top search bar",
  "settings.general.headerSearch.description":
    "Show the global search field in the title bar. Turn it off to give tabs more space.",
  "settings.general.terminal": "Terminal",
  "settings.general.renderer.title": "Terminal renderer",
  "settings.general.renderer.description":
    "Automatic uses WebGPU with WebGL fallback. Choose WebGL for graphics compatibility. Applies to new terminals.",
  "settings.general.renderer.auto": "Automatic",
  "settings.general.renderer.webgl": "WebGL",
  "settings.general.screenReader.title": "Screen reader support",
  "settings.general.screenReader.description":
    "Expose terminal output as accessible text. Page Up and Page Down browse history when the output region is focused.",
  "settings.general.cursorBlink.title": "Cursor blinking",
  "settings.general.cursorBlink.description":
    "Blink the terminal cursor. Off by default for lower idle CPU, matching VS Code and the macOS terminal.",
  "settings.general.cursorStyle.title": "Cursor style",
  "settings.general.cursorStyle.description": "Shape of the terminal cursor.",
  "settings.general.cursorStyle.bar": "Bar",
  "settings.general.cursorStyle.block": "Block",
  "settings.general.cursorStyle.underline": "Underline",
  "settings.general.fontFamily.title": "Font family",
  "settings.general.fontFamily.description":
    'Nerd Font name for icons (e.g. "CaskaydiaCove Nerd Font Mono"). Leave blank to auto-detect.',
  "settings.general.fontFamily.placeholder": "Auto-detect",
  "settings.general.fontWeight.title": "Font weight",
  "settings.general.fontWeight.description": "Thickness of terminal characters",
  "settings.general.fontWeight.normal": "Normal",
  "settings.general.fontWeight.medium": "Medium",
  "settings.general.fontWeight.semiBold": "Semi-Bold",
  "settings.general.fontWeight.bold": "Bold",
  "settings.general.shell.title": "Integrated terminal shell",
  "settings.general.shell.description":
    "Shell for new terminal tabs. Existing tabs keep their shell.",
  "settings.general.shell.descriptionWsl":
    "Shell for the integrated terminal. WSL spaces use the distro login shell. Existing tabs keep their shell.",
  "settings.general.shell.auto": "Auto",
  "settings.general.workspaceEnv.title": "Workspace environment",
  "settings.general.workspaceEnv.description":
    "Where new spaces run, terminal and AI agent alike: Windows or a WSL distro. Existing spaces keep theirs; switch any from the status bar.",
  "settings.general.workspaceEnv.local": "Windows",
  "settings.general.workspaceEnv.unavailable": "{name} (unavailable)",
  "settings.general.letterSpacing.title": "Letter spacing",
  "settings.general.letterSpacing.description":
    "Extra horizontal space between characters (px). Use negative values to tighten Nerd Fonts.",
  "settings.general.fontSize.title": "Font size",
  "settings.general.fontSize.description": "Terminal text size.",
  "settings.general.scrollback.title": "Scrollback",
  "settings.general.scrollback.description":
    "Lines of history kept per terminal. Higher uses more RAM (~3 KB / line).",
  "settings.general.confirmClose.title":
    "Confirm before killing a running process",
  "settings.general.confirmClose.description":
    "Ask before closing a terminal tab or quitting while a command is still running. Unsaved editor changes are always confirmed.",
  "settings.general.startup": "Startup",
  "settings.general.autostart.title": "Launch at login",
  "settings.general.autostart.description":
    "Open Termax automatically when you sign in.",
  "settings.general.restoreWindow.title": "Restore window position & size",
  "settings.general.restoreWindow.description":
    "Reopen the main window where you left it. Applies on next launch.",
  "settings.general.px": "{value} px",
  "settings.general.lines": "{n} lines",

  // ── Settings: Editor ──────────────────────────────────────────────────
  "settings.editor.title": "Editor",
  "settings.editor.description":
    "Editing behavior, saving, and language servers.",
  "settings.editor.appearance": "Appearance",
  "settings.editor.fontSize.title": "Font size",
  "settings.editor.fontSize.description": "Code editor text size.",
  "settings.editor.editing": "Editing",
  "settings.editor.vim.title": "Vim mode",
  "settings.editor.vim.description":
    "Enable Vim keybindings in the code editor.",
  "settings.editor.wordWrap.title": "Word wrap",
  "settings.editor.wordWrap.description":
    "Wrap long lines instead of scrolling horizontally.",
  "settings.editor.wrapColumn.title": "Wrap column",
  "settings.editor.wrapColumn.description":
    "Soft-wrap at this column, or earlier when the editor is narrower.",
  "settings.editor.saving": "Saving",
  "settings.editor.autoSave.title": "Auto save",
  "settings.editor.autoSave.description":
    "Automatically save files after a delay when changes are detected.",
  "settings.editor.autoSaveDelay.title": "Auto save delay",
  "settings.editor.autoSaveDelay.description":
    "Delay before unsaved changes are saved automatically.",
  "settings.editor.formatOnSave.title": "Format on save",
  "settings.editor.formatOnSave.description":
    "Format the file on explicit save (Cmd+S / :w) with the formatter below.",
  "settings.editor.formatter.title": "Formatter",
  "settings.editor.formatter.description":
    "Language server formats the buffer before writing; external tools run on the saved file from your PATH.",
  "settings.editor.customCommand.title": "Custom command",
  "settings.editor.customCommand.description":
    "Runs on the saved file; {file} is replaced with the quoted path (appended when omitted).",
  "settings.editor.customCommand.placeholder": "mytool --fix {file}",
  "settings.editor.languageOverrides.title": "Language overrides",
  "settings.editor.languageOverrides.description":
    "Use a different formatter for specific languages (e.g. Ruff for Python).",
  "settings.editor.languageOverrides.add": "Add override",
  "settings.editor.removeOverride": "Remove override",
  "settings.editor.formatter.lsp": "Language server",
  "settings.editor.formatter.custom": "Custom command",
  "settings.editor.milliseconds": "ms",
  "settings.editor.columns": "columns",

  // ── Settings: Themes ──────────────────────────────────────────────────
  "settings.themes.title": "Themes",
  "settings.themes.description": "Theme, background image, and customization.",
  "settings.themes.theme": "Theme",
  "settings.themes.create": "Create",
  "settings.themes.import": "Import .terax-theme",
  "settings.themes.editTheme": "Edit {name}",
  "settings.themes.removeTheme": "Remove {name}",
  "settings.themes.vibrancy.title": "Window vibrancy",
  "settings.themes.vibrancy.description":
    "Frost the header, status bar and gutters over what is behind the window. Panes stay solid.",
  "settings.themes.editorTheme": "Editor theme",
  "settings.themes.editorTheme.description":
    "Syntax colors for the code editor. Auto follows the app theme.",
  "settings.themes.editorTheme.auto": "Auto (match app theme)",
  "settings.themes.background": "Background",
  "settings.themes.replaceImage": "Replace image",
  "settings.themes.chooseImage": "Choose image",
  "settings.themes.opacity": "Opacity",
  "settings.themes.frameOpacity": "Window transparency",
  "settings.themes.frameOpacityHint":
    "Used only while no background image is set. Lower means more of the desktop shows through.",
  "settings.themes.blur": "Blur",
  "settings.themes.dropHint":
    "Drop an image here or pick one. Stored locally; doesn't affect the default look until set.",
  "settings.themes.error.notImage": "{file}: not an image",
  "settings.themes.error.importFailed": "failed to import image",
  "settings.themes.error.readFailed": "failed to read",

  // ── Settings: Shortcuts ───────────────────────────────────────────────
  "settings.shortcuts.title": "Shortcuts",
  "settings.shortcuts.description": "View and customize keyboard shortcuts.",
  "settings.shortcuts.search": "Search shortcuts...",
  "settings.shortcuts.resetAll": "Reset all shortcuts?",
  "settings.shortcuts.resetAll.description":
    "This will revert all your custom keyboard shortcuts to their factory defaults. This action cannot be undone.",
  "settings.shortcuts.resetAllAction": "Reset All",
  "settings.shortcuts.cancel": "Cancel",
  "settings.shortcuts.reset": "Reset",
  "settings.shortcuts.resetToDefault": "Reset to default",
  "settings.shortcuts.clear": "Clear shortcut",
  "settings.shortcuts.unassigned": "Unassigned",
  "settings.shortcuts.recording": "Recording...",
  "settings.shortcuts.recordingCancel": "(Esc to cancel)",

  // ── Settings: About ───────────────────────────────────────────────────
  "settings.about.title": "About",
  "settings.about.build": "Build",
  "settings.about.bundleId": "Bundle ID",
  "settings.about.license": "License",
  "settings.about.sourceCode": "Source code",
  "settings.about.website": "Website",
  "settings.about.tagline": "Open-source AI-native terminal emulator",
  "settings.about.upToDate": "You're up to date",
  "settings.about.checking": "Checking…",
  "settings.about.downloading": "Downloading…",
  "settings.about.installVersion": "Install v{version}",
  "settings.about.updateVersion": "Update to v{version}",
  "settings.about.checkFailed": "Check failed — retry",
  "settings.about.restartToInstall": "Restart to install",
  "settings.about.checkForUpdates": "Check for updates",
  "settings.about.viewOnGithub": "View on GitHub",
  "settings.about.reportIssue": "Report an issue",



  // ── Built-in agents (name + description only; instructions stay English) ─

  // ── Settings: shared ──────────────────────────────────────────────────
  "settings.common.remove": "Remove",
  "settings.common.replace": "Replace",
  "settings.common.save": "Save",
  "settings.common.cancel": "Cancel",
  "settings.install.copyCommand": "Copy install command",
  "settings.lsp.languageServers": "Language servers",
  "settings.lsp.addCustomServer": "Add custom server",
  "settings.lsp.detectAgain": "Detect again",
  "settings.lsp.removeServer": "Remove server",
  "settings.lsp.customServer": "Custom language server",
  "settings.lsp.checking": "checking...",
  "settings.lsp.notFound": "not found on PATH",
  "settings.lsp.enable": "Enable {name} language server",
  "settings.lsp.disable": "Disable {name} language server",
  "settings.lsp.field.name": "Name",
  "settings.lsp.field.command": "Command",
  "settings.lsp.field.arguments": "Arguments",
  "settings.lsp.field.extensions": "File extensions",
  "settings.lsp.field.languageId": "LSP language id",
  "settings.lsp.field.rootMarkers": "Root markers",
  "settings.lsp.addServer": "Add server",
  "settings.lsp.install.title": "Install {name} language server",
  "settings.lsp.install.descriptionPre": "Termax could not find",
  "settings.lsp.install.descriptionPost":
    "on your PATH. Install it, then check again to enable this language server.",
  "settings.lsp.install.manual":
    "Install this custom server manually and make sure its command is available on PATH.",
  "settings.lsp.install.stillNotFound":
    "Still not found. Finish the installation and make sure the command is available on PATH.",
  "settings.lsp.install.documentation": "Documentation",
  "settings.lsp.install.checking": "Checking...",
  "settings.lsp.install.checkAgain": "Check again",

  // ── Shortcut labels (values are i18n keys via `shortcut.<id>`) ────────
  "shortcut.commandPalette.open": "Open command palette",
  "shortcut.commandPalette.content": "Find in files",
  "shortcut.settings.open": "Open settings",
  "shortcut.tab.new": "New tab",
  "shortcut.tab.newPreview": "New web preview",
  "shortcut.tab.close": "Close tab or pane",
  "shortcut.pane.splitRight": "Split pane right",
  "shortcut.pane.splitDown": "Split pane down",
  "shortcut.pane.focusNext": "Focus next pane",
  "shortcut.pane.focusPrev": "Focus previous pane",
  "shortcut.pane.swapLeft": "Swap pane left",
  "shortcut.pane.swapRight": "Swap pane right",
  "shortcut.pane.swapUp": "Swap pane up",
  "shortcut.pane.swapDown": "Swap pane down",
  "shortcut.terminal.clear": "Clear terminal",
  "shortcut.terminal.toggleInput": "Toggle Shell / AI input",
  "shortcut.tab.next": "Next tab",
  "shortcut.tab.prev": "Previous tab",
  "shortcut.tab.selectByIndex": "Jump to tab 1–9",
  "shortcut.space.next": "Next space",
  "shortcut.space.prev": "Previous space",
  "shortcut.space.overview": "Open spaces",
  "shortcut.search.focus": "Find in tab",
  "shortcut.view.zoomIn": "Zoom in",
  "shortcut.view.zoomOut": "Zoom out",
  "shortcut.view.zoomReset": "Reset zoom",
  "shortcut.view.zenMode": "Toggle zen mode",
  "shortcut.editor.undo": "Undo",
  "shortcut.editor.redo": "Redo",
  "shortcut.editor.save": "Save file",
  "shortcut.editor.codeComplete": "Trigger code completion",

  // ── Shortcut groups ───────────────────────────────────────────────────
  "shortcutGroup.General": "General",
  "shortcutGroup.Tabs": "Tabs",
  "shortcutGroup.Spaces": "Spaces",
  "shortcutGroup.Panes": "Panes",
  "shortcutGroup.Terminal": "Terminal",
  "shortcutGroup.View": "View",
  "shortcutGroup.Search": "Search",
  "shortcutGroup.AI": "AI",
  "shortcutGroup.Editor": "Editor",



  // ── Git diff pane ─────────────────────────────────────────────────────

  // ── Updater ───────────────────────────────────────────────────────────
  "updater.ready.title": "Update ready",
  "updater.downloading.title": "Downloading update…",
  "updater.available.title": "Termax v{version} is available",
  "updater.ready.body": "Restart Termax to finish installing.",
  "updater.downloading.progress": "{percent}% ({size})",
  "updater.manual.body":
    "You're on v{current}. Pick your distro and run the command, or grab the package from GitHub.",
  "updater.available.body": "A new version is ready to install.",
  "updater.copy": "Copy",
  "updater.copied": "Copied",
  "updater.later": "Later",
  "updater.installRestart": "Install & restart",
  "updater.downloadPackage": "Download package",

  // ── Header / window chrome ────────────────────────────────────────────
  "header.settings.title": "Settings",
  "header.commandPalette": "Command palette",
  "header.search.label": "Search",
  "header.search.gitLabel": "Git search",
  "header.search.clear": "Clear search",
  "header.window.minimize": "Minimize",
  "header.window.maximize": "Maximize",
  "header.window.restore": "Restore",
  "header.window.close": "Close",

  // ── Tabs ──────────────────────────────────────────────────────────────
  "tab.new": "New tab",
  "tab.rename": "Rename",
  "tab.renameAria": "Rename tab",
  "tab.close": "Close",
  "tab.closeAria": "Close tab",
  "tab.closeTabsToRight": "Close tabs to the right",
  "tab.closeOtherTabs": "Close other tabs",
  "tab.unsavedChanges": "Unsaved changes",
  "tab.autoDetect": "Auto Detect",
  "tab.mode": "Mode: {name}",
  "tab.showFewerLanguages": "↑ Fewer languages",
  "tab.showAllLanguages": "↓ All languages",
  "tab.newMenu.terminal": "Terminal",
  "tab.newMenu.preview": "Preview",
  "tab.title.shell": "shell",
  "tab.title.preview": "preview",

  // ── Spaces ────────────────────────────────────────────────────────────
  "spaces.title": "Spaces",
  "spaces.trigger": "Spaces",
  "spaces.trigger.shortcut": "Spaces · {shortcut}",
  "spaces.new": "New space",
  "spaces.rename": "Rename space",
  "spaces.delete": "Delete space",
  "spaces.newTab": "New tab",
  "spaces.expand": "Expand",
  "spaces.collapse": "Collapse",
  "spaces.dropToMove": "Drop to move here",
  "spaces.noTabs": "No tabs",
  "spaces.closeTabAria": "Close tab",

  // ── Preview ───────────────────────────────────────────────────────────
  "preview.reload": "Reload",
  "preview.ports": "Ports",
  "preview.ports.title": "Common dev-server ports",
  "preview.url.placeholder": "http://localhost:3000",
  "preview.openInSystemBrowser": "Open in system browser",
  "preview.notice.enterUrl": "Enter a URL or pick a port preset.",
  "preview.notice.noServer": "No server listening on :{port}.",
  "preview.notice.checking": "checking…",
  "preview.notice.dismiss": "Dismiss",
  "preview.xfo.hint":
    "Many public sites refuse to embed (X-Frame-Options). If the page is blank, open it externally.",
  "preview.cookie.hint": "Cookie-based sign-in may not work in preview.",
  "preview.cookie.tooltip":
    "Cookie-based sign-in may not work in the sandboxed preview.",
  "preview.cookie.openInBrowser": "Open in browser",
  "preview.cookie.dismiss": "Dismiss",
  "preview.cookie.dismissAria": "Dismiss cookie sign-in notice",
  "preview.iframe.title": "Preview",
  "preview.suspended.title": "Preview suspended",
  "preview.suspended.body":
    "Released to free memory after sitting in the background.",
  "preview.suspended.reload": "Reload",
  "preview.empty.title": "Nothing to preview yet",
  "preview.empty.before": "Type a URL above, or open the",
  "preview.empty.after":
    "dropdown to jump straight to your running dev server. Public sites often block embedding. Open them in your browser via the link icon if you see a blank page.",

  // ── Markdown chrome ───────────────────────────────────────────────────
  "markdown.view.rendered": "Rendered",
  "markdown.view.raw": "Raw",
  "markdown.loading": "Loading…",
  "markdown.readFailed": "Failed to read file: {error}",
  "markdown.binary": "Binary file, cannot render as markdown.",
  "markdown.tooLarge": "File is {size} bytes; limit {limit}.",

  // ── Command palette ───────────────────────────────────────────────────
  "palette.title": "Command Palette",
  "palette.description":
    "Run a command, switch theme, or search your workspace.",
  "palette.placeholder.default":
    "Type a command, > for history, # to find in files",
  "palette.placeholder.themes": "Search themes...",
  "palette.placeholder.content": "Find text in files...",
  "palette.placeholder.history": "Search command history...",
  "palette.group.themes": "Themes",
  "palette.group.contents": "Contents",
  "palette.group.history": "Command history",
  "palette.group.searchModes": "Search modes",
  "palette.back": "Back",
  "palette.noThemes": "No themes",
  "palette.noWorkspaceRoot": "No workspace root",
  "palette.typeAtLeast": "Type at least {count} characters",
  "palette.noMatches": "No matches",
  "palette.noHistory": "No history",
  "palette.openTerminalHistory": "Open a terminal to run history",
  "palette.searchFailed": "Search failed",
  "palette.retry": "Retry",
  "palette.searching": "Searching...",
  "palette.emptyHint": "No commands found. Type ? to see search modes.",
  "palette.mode.history": "Search command history",
  "palette.mode.content": "Find text in files",
  "palette.cmd.openSettings": "Open settings",
  "palette.cmd.changeTheme": "Change theme...",
  "palette.cmd.keyboardShortcuts": "Keyboard shortcuts",
  "palette.cmd.spacesOverview": "Spaces: Overview",
  "palette.cmd.newSpace": "New Space",
  "palette.cmd.switchSpace": "Switch to {name}",
  "palette.cmd.newTerminal": "New terminal",
  "palette.cmd.newWebPreview": "New web preview",
  "palette.cmd.closeTabOrPane": "Close tab or pane",
  "palette.cmd.splitPaneRight": "Split pane right",
  "palette.cmd.splitPaneDown": "Split pane down",
  "palette.cmd.findContentInFiles": "Find content in files",
  "palette.cmd.searchCommandHistory": "Search command history",
  "palette.cmd.findInCurrentTab": "Find in current tab",
  "palette.cmd.reason.noTerminalTab": "No terminal tab",
  "palette.cmd.reason.paneLimit": "Pane limit",
  "palette.cmd.reason.lastTab": "Last tab",
  "palette.cmd.reason.currentSpace": "Current space",
  "palette.cmd.reason.noSearchableView": "No searchable view",

  // ── Workbench app chrome (input bar, close dialogs) ───────────────────
  "app.input.shell": "Shell",
  "app.input.ai": "AI",
  "app.input.typeDirectly": "Type directly in the terminal",
  "app.input.branch": "Branch: {branch}",
  "app.close.cancel": "Cancel",
  "app.close.closeAnyway": "Close Anyway",
  "app.close.quitAnyway": "Quit Anyway",
  "app.close.checking": "Checking...",
  "app.close.unsaved.title": "Unsaved Changes",
  "app.close.unsaved.file": '"{name}" has unsaved changes. Close anyway?',
  "app.close.unsaved.generic": "This file has unsaved changes. Close anyway?",
  "app.close.terminal.title": "Close Terminal?",
  "app.close.terminal.body":
    "A process is running. Closing this tab will terminate it.",
  "app.close.optOut": "Don't ask again about running processes",
  "app.close.deleted.file":
    '"{name}" has unsaved changes. The file has been deleted. Close anyway?',
  "app.close.deleted.generic":
    "This file has unsaved changes. The file has been deleted. Close anyway?",
  "app.close.deleted.many":
    "{count} files have unsaved changes. They have been deleted. Close all anyway?",
  "app.close.tabsRight.title": "Close Tabs to the Right",
  "app.close.otherTabs.title": "Close Other Tabs",
  "app.close.many.dirtyOneNamed": '"{name}" has unsaved changes. Close it anyway?',
  "app.close.many.dirtyOneGeneric":
    "1 tab has unsaved changes. Close it anyway?",
  "app.close.many.mixed":
    "{dirty} and {busy}. Closing will discard the changes and terminate the {processWord}. Close anyway?",
  "app.close.many.dirtyOnePhrase": "1 tab has unsaved changes",
  "app.close.many.dirtyMany": "{count} tabs have unsaved changes",
  "app.close.many.busyOne": "a process is running",
  "app.close.many.busyMany": "{count} processes are running",
  "app.close.many.processOne": "process",
  "app.close.many.processMany": "processes",
  "app.close.many.dirtyOnly":
    "{count} tabs have unsaved changes. Closing will discard them. Close anyway?",
  "app.close.many.busyRightOne":
    "A process is running in a tab to the right. Closing will terminate it. Close anyway?",
  "app.close.many.busyRightMany":
    "{count} processes are running in tabs to the right. Closing will terminate them. Close anyway?",
  "app.close.many.busyOtherOne":
    "A process is running in another tab. Closing will terminate it. Close anyway?",
  "app.close.many.busyOtherMany":
    "{count} processes are running in other tabs. Closing will terminate them. Close anyway?",
  "app.close.quit.title": "Quit Termax?",
  "app.close.app.dirtyOne": "1 file has unsaved changes",
  "app.close.app.dirtyMany": "{count} files have unsaved changes",
  "app.close.app.both":
    "A process is still running and {dirty}. Quitting will terminate it and discard the changes.",
  "app.close.app.dirtyOnly": "{dirty}. Quitting will discard them.",
  "app.close.app.processOnly":
    "A process is still running in a terminal. Quitting will terminate it.",


  // ── Command palette groups ──
  "palette.group.general": "General",
  "palette.group.spaces": "Spaces",
  "palette.group.tabs": "Tabs",
  "palette.group.panes": "Panes",
  "palette.group.search": "Search",

  // ── App ──
  "app.workspace.dirtySwitch":
    "Save or close unsaved editor tabs before switching workspace.",


  "lsp.toast.failedToStart": "{name} language server failed to start",
  "lsp.toast.stopped": "{name} language server stopped",
  "lsp.toast.keepsCrashing": "{name} language server keeps crashing",
  "lsp.toast.exited": "{name} language server exited",
  "lsp.reason.keptCrashing": "The server kept crashing.",
  "lsp.reason.givingUp": "Giving up for this workspace.",
  "lsp.locations.definitions": "Definitions",
  "lsp.locations.references": "References",

  // ── Terminal blocks ──

  // ── Terminal ──
  "terminal.runCommand": "Run a command",
  "terminal.inputPlaceholder":
    "Run a command  -  ↑ history  {shortcut} switch to AI",
  "terminal.accessibleOutput":
    "Terminal output. Page Up and Page Down browse history.",
  "terminal.inputLabel": "Terminal input",
  "terminal.scrollbackLabel": "Terminal scrollback",
  "terminal.error.display": "Unable to display terminal",
  "terminal.error.start": "Unable to start terminal",
  "terminal.error.preserved":
    "Your terminal session is preserved. Retry to restore its display.",
  "terminal.error.retry": "Retry",
  "terminal.error.retryDisplay": "Retry display",
  "terminal.outputPaused.title": "Terminal output paused",
  "terminal.outputPaused.failed":
    "The terminal could not process output. Reopen this terminal to recover.",
  "terminal.outputPaused.stalled":
    "Waiting for the terminal connection. Delivery will resume automatically.",
  "terminal.outputPaused.retry": "Retry",

  // ── Editor ──
  "editor.search.find": "Find",
  "editor.search.replace": "Replace",
  "editor.search.next": "next",
  "editor.search.previous": "previous",
  "editor.search.selectAll": "all",
  "editor.search.matchCase": "match case",
  "editor.search.regexp": "regexp",
  "editor.search.byWord": "by word",
  "editor.search.replaceButton": "replace",
  "editor.search.replaceAll": "replace all",
  "editor.search.close": "close",
  "editor.search.currentMatch": "current match",
  "editor.search.onLine": "on line",
  "editor.search.replacedMatches": "replaced $ matches",
  "editor.search.replacedMatchOnLine": "replaced match on line $",
  "editor.gotoLine.label": "Go to line",
  "editor.gotoLine.go": "go",
  "editor.cm.completions": "Completions",
  "editor.cm.controlCharacter": "Control character",
  "editor.cm.diagnostics": "Diagnostics",
  "editor.cm.noDiagnostics": "No diagnostics",
  "editor.cm.foldedCode": "folded code",
  "editor.cm.unfold": "unfold",
  "editor.cm.foldedLines": "Folded lines",
  "editor.cm.unfoldedLines": "Unfolded lines",
  "editor.cm.to": "to",
  "editor.cm.selectionDeleted": "Selection deleted",
  "editor.merge.accept": "Accept",
  "editor.merge.reject": "Reject",
  "editor.merge.revertChunk": "Revert this chunk",
  "editor.merge.unchangedLines": "$ unchanged lines",
  "editor.conflict.title": "File changed on disk",
  "editor.conflict.description":
    "{name} was modified by another program while you had unsaved changes. Overwrite to keep your version.",
  "editor.conflict.overwrite": "Overwrite",
  "editor.format.lspFailed": "Language server format failed",
  "editor.format.skippedTitle": "Format on save skipped",
  "editor.format.skippedNoFormatter":
    "The active language server has no formatter. Pick an external one in Settings (Ruff for Python, Prettier, rustfmt, ...).",
  "editor.format.skippedNoServer":
    "No active language server for this file. Enable one in Settings, or pick an external formatter.",
  "editor.format.noCommand": "No custom format command configured in Settings.",
  "editor.format.timedOut": "{formatter} timed out",
  "editor.format.failed": "{formatter} format failed",
  "editor.binaryFile": "Binary file",
  "editor.fileTooLarge": "File too large",
  "editor.syntaxDisabled": "syntax features disabled",
  "editor.previewUnsupported": "preview not supported",
  "editor.openAnyway": "Open anyway",
  "editor.saveToPreview": "Save to preview",
  "editor.newFile.title": "New file",
  "editor.newFile.description":
    "Filename (relative to workspace root). The extension determines the language mode.",
  "editor.newFile.cancel": "Cancel",
  "editor.newFile.create": "Create",
  "editor.newFile.error.nameRequired": "Name is required",
  "editor.newFile.error.relative": "Path must be relative",
  "editor.newFile.error.noRoot": "No workspace root",
} as const;
