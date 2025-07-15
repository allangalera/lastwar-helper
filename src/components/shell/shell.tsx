import { ParentProps } from "solid-js";
import { Footer } from "../footer";
import { Nav } from "../nav";

export const Shell = (props: ParentProps) => {
  return (
    <main class="min-w-screen min-h-svh flex flex-col bg-slate-200 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <Nav />
      <div class=" my-10 py-5 px-4 flex-1 flex flex-col">{props.children}</div>
      <Footer />
    </main>
  );
};
