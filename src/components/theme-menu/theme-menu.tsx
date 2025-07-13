import { Menu } from "@ark-ui/solid/menu";

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
  return (
    <Menu.Root>
      <Menu.Trigger>
        Theme <Menu.Indicator>➡️</Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="light" onSelect={() => setTheme("light")}>
            Light
          </Menu.Item>
          <Menu.Item value="dark" onSelect={() => setTheme("dark")}>
            Dark
          </Menu.Item>
          <Menu.Item value="system" onSelect={() => setTheme("system")}>
            System
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
