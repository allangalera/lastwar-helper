import { Menu } from "@ark-ui/solid/menu";
import { createSignal, For } from "solid-js";
import { Portal } from "solid-js/web";
import z from "zod/v4";

const Theme = {
  Light: "light",
  Dark: "dark",
  System: "system",
} as const;

const ThemeColor = {
  [Theme.Dark]: "#020617",
  [Theme.Light]: "#e2e8f0",
};

const themeSchema = z.enum(Object.values(Theme));

type Themes = (typeof Theme)[keyof typeof Theme];

function setTheme(theme: Themes) {
  switch (theme) {
    case Theme.Dark:
      localStorage.setItem("theme", Theme.Dark);
      document.documentElement.dataset.theme = Theme.Dark;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", ThemeColor[Theme.Dark]);
      document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", Theme.Dark);
      return;
    case Theme.Light:
      localStorage.setItem("theme", Theme.Light);
      document.documentElement.dataset.theme = Theme.Light;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", ThemeColor[Theme.Light]);
      document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", Theme.Light);
      return;
    case Theme.System:
      localStorage.removeItem("theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? Theme.Dark
        : Theme.Light;
      document.documentElement.dataset.theme = systemTheme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          systemTheme === Theme.Dark
            ? ThemeColor[Theme.Dark]
            : ThemeColor[Theme.Light]
        );
      document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", systemTheme);
      return;
  }
}

export const ThemeMenu = () => {
  const [currentTheme, setCurrentTheme] = createSignal<Themes>(
    themeSchema.safeParse(localStorage.getItem("theme")).data ?? Theme.System
  );

  const handleThemeUpdate = (theme: Themes) => {
    setCurrentTheme(theme);
    setTheme(theme);
  };

  return (
    <Menu.Root>
      <Menu.Trigger class="flex gap-2">
        Theme <Menu.Indicator>➡️</Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class="py-2 px-4 border border-slate-950 dark:border-slate-200 bg-slate-300 dark:bg-slate-800">
            <For each={Object.values(Theme)}>
              {(theme) => (
                <Menu.Item
                  class="cursor-pointer hover:underline"
                  value={theme}
                  onSelect={() => handleThemeUpdate(theme)}
                  classList={{
                    "font-bold": currentTheme() === theme,
                  }}
                >
                  {theme}
                </Menu.Item>
              )}
            </For>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
