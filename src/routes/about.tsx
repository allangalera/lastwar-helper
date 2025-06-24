import { createFileRoute, useRouter } from "@tanstack/solid-router";
import * as fs from "node:fs";
import { createServerFn } from "@tanstack/solid-start";
export const filePath = "count.txt";

export async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
  );
}

export const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  return readCount();
});

export const updateCount = createServerFn({ method: "POST" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

export const Route = createFileRoute("/about")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate();
        });
      }}
    >
      Add 1 to {state()}?
    </button>
  );
}
