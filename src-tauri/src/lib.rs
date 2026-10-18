pub mod modules;

#[cfg(target_os = "macos")]
use modules::app_menu;
use modules::{
    control, fs, history, lsp, pty, shell, vibrancy, workspace,
};
use std::path::PathBuf;
use std::sync::Mutex;
#[cfg(target_os = "macos")]
use tauri::WindowEvent;
use tauri::{Emitter, Manager, PhysicalPosition, State, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_window_state::StateFlags;

/// Drained on first read so HMR / re-mounts can't replay the launch dir.
#[derive(Default)]
struct LaunchDir(Mutex<Option<String>>);

/// Drained on first read so HMR / re-mounts can't replay the launch files.
#[derive(Default)]
struct LaunchFiles(Mutex<Vec<String>>);

#[tauri::command]
fn get_launch_dir(state: State<'_, LaunchDir>) -> Option<String> {
    state.0.lock().expect("LaunchDir mutex poisoned").take()
}

#[tauri::command]
fn get_launch_files(state: State<'_, LaunchFiles>) -> Vec<String> {
    std::mem::take(&mut *state.0.lock().expect("LaunchFiles mutex poisoned"))
}

enum LaunchEntry {
    Dir(PathBuf),
    File(PathBuf),
}

#[derive(Default, Debug, PartialEq)]
struct LaunchTarget {
    dir: Option<String>,
    files: Vec<String>,
}

/// First dir arg (else the first file's parent) becomes the workspace; every
/// file arg is opened. Kept free of fs/env access so it stays unit-testable.
fn resolve_launch_target(entries: Vec<LaunchEntry>) -> LaunchTarget {
    let mut dir = None;
    let mut files = Vec::new();
    for entry in entries {
        match entry {
            LaunchEntry::Dir(path) => {
                if dir.is_none() {
                    dir = Some(fs::to_canon(&path));
                }
            }
            LaunchEntry::File(path) => {
                if dir.is_none() {
                    dir = path.parent().map(fs::to_canon);
                }
                files.push(fs::to_canon(&path));
            }
        }
    }
    LaunchTarget { dir, files }
}

fn parse_launch_target() -> LaunchTarget {
    let entries = std::env::args()
        .skip(1)
        .filter(|arg| !arg.starts_with('-'))
        .filter_map(|arg| std::fs::canonicalize(arg).ok())
        .filter_map(|path| {
            let meta = std::fs::metadata(&path).ok()?;
            Some(if meta.is_dir() {
                LaunchEntry::Dir(path)
            } else {
                LaunchEntry::File(path)
            })
        })
        .collect();
    resolve_launch_target(entries)
}

const SETTINGS_WIDTH: f64 = 900.0;
const SETTINGS_HEIGHT: f64 = 700.0;
const SETTINGS_MIN_WIDTH: f64 = 820.0;
const SETTINGS_MIN_HEIGHT: f64 = 620.0;

/// Sizes Settings against the monitor showing the main window. Monitor size is
/// physical; convert to logical before applying the rule below.
fn settings_size_for_monitor(monitor: Option<&tauri::Monitor>) -> (f64, f64) {
    let Some(monitor) = monitor else {
        return (SETTINGS_WIDTH, SETTINGS_HEIGHT);
    };

    let scale = monitor.scale_factor();
    if !(scale.is_finite() && scale > 0.0) {
        return (SETTINGS_WIDTH, SETTINGS_HEIGHT);
    }

    let work = monitor.work_area();
    clamp_settings_size(
        f64::from(work.size.width) / scale,
        f64::from(work.size.height) / scale,
    )
}

/// Heights near the full display read as broken, so cap Settings at 70% of the
/// usable height and never taller than the 700 default, floored at the 620 min.
/// Width is 900 capped at 90% of the monitor, floored at the 820 min.
fn clamp_settings_size(logical_w: f64, logical_h: f64) -> (f64, f64) {
    if !(logical_w.is_finite() && logical_h.is_finite() && logical_w > 0.0 && logical_h > 0.0) {
        return (SETTINGS_WIDTH, SETTINGS_HEIGHT);
    }

    let width = SETTINGS_WIDTH.min(logical_w * 0.9).max(SETTINGS_MIN_WIDTH);
    let height = (logical_h * 0.7).clamp(SETTINGS_MIN_HEIGHT, SETTINGS_HEIGHT);

    (width, height)
}

#[tauri::command]
async fn open_settings_window(app: tauri::AppHandle, tab: Option<String>) -> Result<(), String> {
    let url_path = match tab.as_deref() {
        Some(t) if !t.is_empty() => format!("settings.html?tab={}", t),
        _ => "settings.html".to_string(),
    };

    if let Some(window) = app.get_webview_window("settings") {
        let _ = window.show();
        let _ = window.set_focus();
        if let Some(t) = tab.as_deref().filter(|s| !s.is_empty()) {
            // emit() serializes via JSON — no string-escape footgun, unlike
            // eval() with format!(). Frontend listens via Tauri event API.
            let _ = window.emit("terax:settings-tab", t);
        }
        return Ok(());
    }

    // Size against the monitor the main window sits on, not the primary one, so
    // a multi-monitor setup does not place Settings off-screen. Never taller
    // than 70% of the work area (see clamp_settings_size).
    let settings_monitor = app
        .get_webview_window("main")
        .and_then(|main| main.current_monitor().ok().flatten())
        .or_else(|| app.primary_monitor().ok().flatten());
    let (settings_width, settings_height) = settings_size_for_monitor(settings_monitor.as_ref());

    let builder = WebviewWindowBuilder::new(&app, "settings", WebviewUrl::App(url_path.into()))
        .title("Settings")
        .inner_size(settings_width, settings_height)
        .min_inner_size(SETTINGS_MIN_WIDTH, SETTINGS_MIN_HEIGHT)
        .resizable(true)
        .visible(false);

    // A normal-level child stays above Terax but recedes with the app on macOS.
    // macOS parenting controls app-relative stacking, not desktop always-on-top.
    let builder = if let Some(main) = app.get_webview_window("main") {
        builder.parent(&main).map_err(|e| e.to_string())?
    } else {
        builder
    };

    #[cfg(target_os = "macos")]
    let builder = builder
        .title_bar_style(tauri::TitleBarStyle::Overlay)
        .hidden_title(true)
        .transparent(true);

    // On Linux/Windows we render our own titlebar, so drop native chrome
    // and make the window transparent.
    #[cfg(any(target_os = "linux", target_os = "windows"))]
    let builder = builder
        .decorations(false)
        .transparent(true)
        .shadow(false);

    let window = builder.build().map_err(|e| e.to_string())?;

    // Some Linux compositors (GNOME/Mutter with CSD-by-default) ignore the
    // builder-time decorations flag — re-assert it after realize.
    #[cfg(target_os = "linux")]
    {
        let _ = window.set_decorations(false);
    }

    // Center on the monitor that hosts the main window, on every platform. The
    // macOS parent-child relationship governs stacking, not placement, so the
    // same work-area centering applies there too; `window.center()` covers the
    // case where the monitor could not be read at all.
    if let Some(monitor) = &settings_monitor {
        let scale = monitor.scale_factor();
        let work = monitor.work_area();
        if scale.is_finite() && scale > 0.0 {
            let win_w = (settings_width * scale).round() as i32;
            let win_h = (settings_height * scale).round() as i32;
            let x = work.position.x + (work.size.width as i32 - win_w) / 2;
            let y = work.position.y + (work.size.height as i32 - win_h) / 2;
            let _ = window.set_position(PhysicalPosition::new(x, y));
        } else {
            let _ = window.center();
        }
    } else {
        let _ = window.center();
    }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let launch = parse_launch_target();
    let cli_dir = launch.dir.clone();
    workspace::init_launch_cwd(cli_dir.as_deref());
    let control_state = control::ControlState::default();
    let control_for_setup = control_state.clone();

    let builder = tauri::Builder::default();
    let builder = builder.plugin(tauri_plugin_clipboard_manager::init());
    #[cfg(target_os = "macos")]
    let builder = builder
        .menu(app_menu::build)
        .on_menu_event(app_menu::handle_event);
    builder
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        // Skip restoring VISIBLE — frontend calls window.show() after first
        // paint so the user never sees a transparent window-shadow flash on
        // Windows/Linux.
        // Settings is also denied initial restore: it is a dialog whose size is
        // computed from the monitor on open, and a stale saved entry (an older
        // build could be dragged taller than the display while always-on-top)
        // would otherwise override that and reopen near full height.
        .plugin(
            tauri_plugin_window_state::Builder::new()
                .with_state_flags(StateFlags::all() & !StateFlags::VISIBLE)
                .skip_initial_state("settings")
                .build(),
        )
        .plugin(tauri_plugin_autostart::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .level(tauri_plugin_log::log::LevelFilter::Info)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .setup(move |_app| {
            #[cfg(target_os = "macos")]
            modules::window_presentation::macos::install(_app.handle());
            if let Some(main) = _app.get_webview_window("main") {
                std::thread::spawn(move || {
                    std::thread::sleep(std::time::Duration::from_millis(350));
                    if let Err(error) = main.show() {
                        log::warn!("could not show main window: {error}");
                    }
                });
            }
            if let Err(error) = control::start(_app.handle().clone(), control_for_setup.clone()) {
                log::warn!("could not start Terax control server: {error}");
            }
            #[cfg(target_os = "macos")]
            if let Some(main) = _app.get_webview_window("main") {
                let handle = _app.handle().clone();
                main.on_window_event(move |event| {
                    // CloseRequested can be cancelled by the frontend guard.
                    if matches!(event, WindowEvent::Destroyed) {
                        if let Some(settings) = handle.get_webview_window("settings") {
                            let _ = settings.destroy();
                        }
                    }
                });
            }
            Ok(())
        })
        .manage(pty::PtyState::default())
        .manage(modules::window_presentation::WindowPresentationState::default())
        .manage(control_state)
        .manage(shell::ShellState::default())
        .manage(fs::watch::FsWatchState::default())
        .manage(history::HistoryState::default())
        .manage(lsp::LspState::default())
        .manage(fs::grep::ContentSearchState::default())
        .manage({
            let registry = workspace::WorkspaceRegistry::default();
            workspace::bootstrap_registry(&registry);
            if let Some(ref launch_dir) = cli_dir {
                let _ = registry.authorize(launch_dir);
            }
            registry
        })
        .manage(LaunchDir(Mutex::new(cli_dir)))
        .manage(LaunchFiles(Mutex::new(launch.files)))
        .invoke_handler(tauri::generate_handler![
            pty::pty_open,
            pty::pty_write,
            pty::pty_ack_output,
            pty::pty_diagnostics,
            pty::pty_resize,
            pty::pty_close,
            pty::pty_close_all,
            pty::pty_has_foreground_process,
            pty::pty_has_foreground_job,
            pty::pty_shell_name,
            pty::pty_list_shells,
            fs::tree::list_subdirs,
            fs::tree::fs_read_dir,
            fs::file::fs_read_file,
            fs::file::fs_write_file,
            fs::file::fs_stat,
            fs::file::fs_canonicalize,
            fs::mutate::fs_create_file,
            fs::mutate::fs_create_dir,
            fs::mutate::fs_rename,
            fs::mutate::fs_move,
            fs::mutate::fs_delete,
            fs::mutate::fs_delete_batch,
            fs::mutate::fs_copy,
            fs::watch::fs_watch_add,
            fs::watch::fs_watch_remove,
            lsp::lsp_detect,
            lsp::lsp_host_pid,
            lsp::lsp_resolve_root,
            lsp::lsp_spawn,
            lsp::lsp_send,
            lsp::lsp_kill,
            fs::search::fs_search,
            fs::search::fs_list_files,
            fs::grep::fs_grep,
            fs::grep::fs_grep_interactive,
            fs::grep::fs_glob,
            shell::shell_run_command,
            shell::shell_session_open,
            shell::shell_session_run,
            shell::shell_session_close,
            shell::shell_bg_spawn,
            shell::shell_bg_logs,
            shell::shell_bg_kill,
            shell::shell_bg_list,
            workspace::wsl_list_distros,
            workspace::wsl_default_distro,
            workspace::wsl_home,
            workspace::workspace_authorize,
            workspace::workspace_current_dir,
            control::control_frontend_ready,
            control::control_respond,
            get_launch_dir,
            get_launch_files,
            open_settings_window,
            history::history_suggest,
            history::history_commands,
            history::history_record,
            history::history_list,
            vibrancy::window_backdrop_kind,
            vibrancy::window_set_backdrop,
            modules::window_presentation::window_presentation_state,
        ])
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app, event| {
            match event {
                // Servers exit on stdin EOF, but destructors are not guaranteed
                // on process exit; kill explicitly.
                tauri::RunEvent::Exit => {
                    #[cfg(target_os = "macos")]
                    modules::window_presentation::macos::uninstall();
                    if let Some(state) = app.try_state::<lsp::LspState>() {
                        state.kill_all();
                    }
                    if let Some(state) = app.try_state::<control::ControlState>() {
                        state.shutdown();
                    }
                }
                // macOS delivers "Open With" files here, not as argv (cold and
                // warm start, several at once). Seed the drain-once state and
                // emit; canonicalize so the /tmp -> /private/tmp symlink can't
                // defeat openFileTab's path dedupe against a CLI launch.
                #[cfg(target_os = "macos")]
                tauri::RunEvent::Opened { urls } => {
                    let entries = urls
                        .iter()
                        .filter_map(|u| u.to_file_path().ok())
                        .filter_map(|p| std::fs::canonicalize(p).ok())
                        .filter(|p| p.is_file())
                        .map(LaunchEntry::File)
                        .collect();
                    let target = resolve_launch_target(entries);
                    if target.files.is_empty() {
                        return;
                    }
                    if let Some(dir) = &target.dir {
                        if let Some(registry) = app.try_state::<workspace::WorkspaceRegistry>() {
                            let _ = registry.authorize(dir);
                        }
                        if let Some(state) = app.try_state::<LaunchDir>() {
                            *state.0.lock().expect("LaunchDir mutex poisoned") = Some(dir.clone());
                        }
                    }
                    if let Some(state) = app.try_state::<LaunchFiles>() {
                        *state.0.lock().expect("LaunchFiles mutex poisoned") = target.files.clone();
                    }
                    let _ = app.emit("terax:open-file", target.files);
                }
                _ => {}
            }
        });
}

#[cfg(test)]
mod launch_target_tests {
    use super::{resolve_launch_target, LaunchEntry, LaunchTarget};
    use std::path::PathBuf;

    #[test]
    fn no_entries_resolves_to_empty() {
        assert_eq!(resolve_launch_target(vec![]), LaunchTarget::default());
    }

    #[test]
    fn dir_arg_sets_workspace_and_opens_nothing() {
        let out = resolve_launch_target(vec![LaunchEntry::Dir(PathBuf::from("/home/u/proj"))]);
        assert_eq!(out.dir.as_deref(), Some("/home/u/proj"));
        assert!(out.files.is_empty());
    }

    #[test]
    fn file_arg_opens_file_and_uses_parent_as_workspace() {
        let out = resolve_launch_target(vec![LaunchEntry::File(PathBuf::from(
            "/home/u/proj/main.rs",
        ))]);
        assert_eq!(out.dir.as_deref(), Some("/home/u/proj"));
        assert_eq!(out.files, vec!["/home/u/proj/main.rs".to_string()]);
    }

    #[test]
    fn multiple_files_all_open_and_first_parent_wins() {
        let out = resolve_launch_target(vec![
            LaunchEntry::File(PathBuf::from("/a/one.txt")),
            LaunchEntry::File(PathBuf::from("/b/two.txt")),
        ]);
        assert_eq!(out.dir.as_deref(), Some("/a"));
        assert_eq!(
            out.files,
            vec!["/a/one.txt".to_string(), "/b/two.txt".to_string()]
        );
    }

    #[test]
    fn explicit_dir_takes_precedence_over_file_parent() {
        let out = resolve_launch_target(vec![
            LaunchEntry::Dir(PathBuf::from("/workspace")),
            LaunchEntry::File(PathBuf::from("/other/x.rs")),
        ]);
        assert_eq!(out.dir.as_deref(), Some("/workspace"));
        assert_eq!(out.files, vec!["/other/x.rs".to_string()]);
    }

}

#[cfg(test)]
mod settings_size_tests {
    use super::{
        clamp_settings_size, SETTINGS_HEIGHT, SETTINGS_MIN_HEIGHT, SETTINGS_MIN_WIDTH,
        SETTINGS_WIDTH,
    };

    #[test]
    fn no_monitor_falls_back_to_defaults() {
        assert_eq!(
            clamp_settings_size(f64::NAN, 0.0),
            (SETTINGS_WIDTH, SETTINGS_HEIGHT)
        );
        assert_eq!(
            clamp_settings_size(-1.0, -1.0),
            (SETTINGS_WIDTH, SETTINGS_HEIGHT)
        );
    }

    #[test]
    fn tall_display_is_capped_at_seventy_percent() {
        // 1440 logical height would otherwise reopen near full height.
        assert_eq!(clamp_settings_size(2560.0, 1440.0).1, 700.0);
    }

    #[test]
    fn short_display_uses_seventy_percent() {
        // 500 * 0.7 = 350, below the 620 floor, so the floor wins.
        assert_eq!(clamp_settings_size(1280.0, 500.0).1, SETTINGS_MIN_HEIGHT);
        assert_eq!(clamp_settings_size(1280.0, 2000.0).1, 700.0);
    }

    #[test]
    fn narrow_display_never_goes_below_the_width_floor() {
        assert_eq!(clamp_settings_size(600.0, 1000.0).0, SETTINGS_MIN_WIDTH);
        assert_eq!(clamp_settings_size(1000.0, 1000.0).0, 900.0);
    }
}
