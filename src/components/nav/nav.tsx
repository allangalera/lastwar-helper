import { ThemeMenu } from "../theme-menu";

export const Nav = () => {
  return (
    <header class="w-screen fixed flex justify-center top-0 p-2 gap-3">
      <div>Last War Helper</div>
      <ThemeMenu />
    </header>
  );
};
