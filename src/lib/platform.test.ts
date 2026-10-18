import { describe, expect, it } from "vitest";
import { windowChromeFor } from "./platform";

describe("window chrome", () => {
  it("uses native chrome on macOS", () => {
    expect(windowChromeFor("macos")).toBe("native");
  });

  it("uses custom borderless chrome elsewhere", () => {
    expect(windowChromeFor("windows")).toBe("borderless");
    expect(windowChromeFor("linux")).toBe("borderless");
  });

  it("leaves the attribute unset when the platform is unknown", () => {
    expect(windowChromeFor("")).toBeNull();
  });
});
