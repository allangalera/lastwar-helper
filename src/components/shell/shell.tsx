import { ParentProps } from "solid-js";
import { Footer } from "../footer";
import { Nav } from "../nav";

export const Shell = (props: ParentProps) => {
  return (
    <main class="min-w-screen min-h-svh flex flex-col bg-slate-200 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <Nav />
      <div class="py-10 flex-1">{props.children}</div>
      <Footer />
    </main>
  );
};
