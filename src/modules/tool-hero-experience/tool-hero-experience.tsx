import { createEffect, createSignal, Index, Match, Switch } from "solid-js";
import { RadioGroup } from "@ark-ui/solid/radio-group";
import { Simple } from "./simple";
import { Complex } from "./complex";
import { z } from "zod/v4";

const Mode = {
  Simple: "simple",
  Complex: "complex",
} as const;

type Modes = (typeof Mode)[keyof typeof Mode];

const LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_MODE =
  "LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_MODE";

const modeSchema = z.enum(Object.values(Mode));

export function ToolHeroExperience() {
  const [mode, setMode] = createSignal<Modes>(
    modeSchema.safeParse(
      localStorage.getItem(LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_MODE)
    ).data ?? Mode.Simple
  );
  createEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_MODE, mode());
  });

  return (
    <div class="grid items-center justify-center gap-4 grid-rows-[auto_1fr_auto] h-full">
      <div class="px-4">
        <h1 class="text-xl">Hero Experience Calculator</h1>
        <RadioGroup.Root
          class="flex justify-between items-center py-4 gap-4"
          value={mode()}
          onValueChange={(details) => setMode(details.value as Modes)}
        >
          <RadioGroup.Label>Mode</RadioGroup.Label>
          <div class="flex gap-4">
            <Index each={Object.values(Mode)}>
              {(thisMode) => (
                <RadioGroup.Item
                  value={thisMode()}
                  class="flex flex-row-reverse items-center gap-2 cursor-pointer"
                >
                  <RadioGroup.ItemText>{thisMode()}</RadioGroup.ItemText>
                  <RadioGroup.ItemControl class="border rounded-full w-4 h-4 data-[state=checked]:bg-slate-400" />
                  <RadioGroup.ItemHiddenInput />
                </RadioGroup.Item>
              )}
            </Index>
          </div>
        </RadioGroup.Root>
      </div>
      <Switch>
        <Match when={mode() === Mode.Simple}>
          <Simple />
        </Match>
        <Match when={mode() === Mode.Complex}>
          <Complex />
        </Match>
      </Switch>
    </div>
  );
}
