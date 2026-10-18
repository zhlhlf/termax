use serde::Serialize;

/// Keep in sync with `--window-radius` in `src/styles/globals.css`.
#[cfg(target_os = "macos")]
const WINDOW_RADIUS: f64 = 25.0;

/// The translucent window backdrop a platform can provide.
///
/// Linux is `None` on purpose: blur there is owned by the compositor, not the
/// app, so there is nothing for the app to apply.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "kebab-case")]
pub enum Backdrop {
    /// macOS `NSVisualEffectView`.
    Vibrancy,
    None,
}

pub fn backdrop_for(os: &str) -> Backdrop {
    if os == "macos" {
        Backdrop::Vibrancy
    } else {
        Backdrop::None
    }
}

#[tauri::command]
pub fn window_backdrop_kind() -> Backdrop {
    backdrop_for(std::env::consts::OS)
}

#[tauri::command]
pub fn window_set_backdrop(window: tauri::Window, enabled: bool) -> Result<(), String> {
    set_backdrop(&window, enabled)
}

#[cfg(target_os = "macos")]
fn set_backdrop(window: &tauri::Window, enabled: bool) -> Result<(), String> {
    use window_vibrancy::{apply_vibrancy, clear_vibrancy, NSVisualEffectMaterial};

    if enabled {
        // UnderWindowBackground is the material meant for a whole-window
        // backdrop; Sidebar/HudWindow are for panels drawn on top of content.
        apply_vibrancy(
            window,
            NSVisualEffectMaterial::UnderWindowBackground,
            None,
            Some(WINDOW_RADIUS),
        )
        .map_err(|e| e.to_string())
    } else {
        clear_vibrancy(window).map(|_| ()).map_err(|e| e.to_string())
    }
}

#[cfg(not(target_os = "macos"))]
fn set_backdrop(_window: &tauri::Window, _enabled: bool) -> Result<(), String> {
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::{backdrop_for, Backdrop};

    #[test]
    fn macos_reports_vibrancy() {
        assert_eq!(backdrop_for("macos"), Backdrop::Vibrancy);
    }

    #[test]
    fn other_platforms_report_none() {
        assert_eq!(backdrop_for("windows"), Backdrop::None);
        assert_eq!(backdrop_for("linux"), Backdrop::None);
        assert_eq!(backdrop_for(""), Backdrop::None);
    }

    #[test]
    fn serializes_as_kebab_case_for_the_webview() {
        assert_eq!(
            serde_json::to_string(&Backdrop::Vibrancy).unwrap(),
            "\"vibrancy\""
        );
        assert_eq!(serde_json::to_string(&Backdrop::None).unwrap(), "\"none\"");
    }
}
