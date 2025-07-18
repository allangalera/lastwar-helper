import { ClientOnly } from "@tanstack/solid-router";
import { ThemeMenu } from "../theme-menu";

export const Nav = () => {
  return (
    <header class="w-screen fixed flex justify-center top-0 p-2 gap-3 bg-slate-100 dark:bg-slate-900 z-100">
      <div>Last War Helper</div>
      <ClientOnly>
        <ThemeMenu />
      </ClientOnly>
    </header>
  );
};
