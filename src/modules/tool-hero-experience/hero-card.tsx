import { pascalCase } from "change-case";
import { HeroCategory, HeroInformation, HeroNames } from "./state";
import { Show } from "solid-js";
import { AiFillDelete } from "solid-icons/ai";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

type HeroCardProps = {
  hero: HeroNames;
  level: number;
  setLevel: (v: number) => void;
  targetLevel: number;
  setTargetLevel: (v: number) => void;
  tier?: number;
  cost: string;
  onDelete: () => void;
};

export function HeroCard(props: HeroCardProps) {
  const heroInformation = () => HeroInformation[props.hero];
  return (
    <Show when={heroInformation()}>
      <div
        class="flex flex-col border-none rounded-md w-30 gap-1 overflow-hidden"
        classList={{
          "bg-amber-300 dark:bg-amber-600":
            heroInformation().category === HeroCategory.UR,
          "bg-purple-300 dark:bg-purple-600":
            heroInformation().category === HeroCategory.SSR,
          "bg-sky-300 dark:bg-sky-600":
            heroInformation().category === HeroCategory.SR,
        }}
      >
        <div class="grid grid-cols-[25px_1fr_25px] items-center bg-neutral-100/30 dark:bg-neutral-950/30">
          <div>
            <img
              src={`/assets/${pascalCase(
                heroInformation().capability
              )}_Capability.webp`}
            />
          </div>
          <div class="flex-1 text-center text-sm font-medium">
            {pascalCase(props.hero)}
          </div>
          <div>
            <img
              src={`/assets/${pascalCase(heroInformation().type)}_Type.webp`}
            />
          </div>
        </div>
        <div class="flex justify-center">
          <img
            src={`/assets/heroes/${pascalCase(props.hero)}_Thumbnail.webp`}
          />
        </div>
        <div class="grid grid-cols-[auto_1fr] gap-1 p-1">
          <p class="text-sm">From</p>
          <Input
            type="number"
            value={props.level}
            onInput={(e) => props.setLevel(e.target.valueAsNumber)}
          />
          <p class="text-sm">To</p>
          <Input
            type="number"
            value={props.targetLevel}
            onInput={(e) => props.setTargetLevel(e.target.valueAsNumber)}
          />
        </div>
        <div class="flex justify-between gap-2 p-1 bg-neutral-100/30 dark:bg-neutral-950/30">
          <div class="flex items-center gap-1 text-sm">
            {props.cost}
            <img src="/assets/exp.avif" class="w-5" />
          </div>
          <Button square color="negative" onClick={() => props.onDelete()}>
            <AiFillDelete />
          </Button>
        </div>
      </div>
    </Show>
  );
}
