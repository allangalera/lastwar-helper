import { Menu } from "@ark-ui/solid/menu";
import { createSignal } from "solid-js";

function setTheme(theme: "dark" | "light" | "system") {
  switch (theme) {
    case "dark":
      localStorage.setItem("theme", "dark");
      document.documentElement.dataset.theme = "dark";
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#020617");
      document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", "dark");
      return;
    case "light":
      localStorage.setItem("theme", "light");
      document.documentElement.dataset.theme = "light";
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#e2e8f0");
      document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", "light");
      return;
    case "system":
      localStorage.removeItem("theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.dataset.theme = systemTheme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          systemTheme === "dark" ? "#020617" : "#e2e8f0"
        );
      document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", systemTheme);
      return;
  }
}

export const ThemeMenu = () => {
  const [currentTheme, setCurrentTheme] = createSignal(
    localStorage.getItem("theme") ?? "system"
  );

  const handleThemeUpdate = (theme: "dark" | "light" | "system") => {
    setCurrentTheme(theme);
    setTheme(theme);
  };
  return (
    <Menu.Root>
      <Menu.Trigger class="flex gap-2">
        Theme <Menu.Indicator>➡️</Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class="py-2 px-4 border border-slate-950 dark:border-slate-200">
          <Menu.Item
            value="light"
            onSelect={() => handleThemeUpdate("light")}
            classList={{
              "font-bold": currentTheme() === "light",
            }}
          >
            Light
          </Menu.Item>
          <Menu.Item
            value="dark"
            onSelect={() => handleThemeUpdate("dark")}
            classList={{
              "font-bold": currentTheme() === "dark",
            }}
          >
            Dark
          </Menu.Item>
          <Menu.Item
            value="system"
            onSelect={() => handleThemeUpdate("system")}
            classList={{
              "font-bold": currentTheme() === "system",
            }}
          >
            System
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
