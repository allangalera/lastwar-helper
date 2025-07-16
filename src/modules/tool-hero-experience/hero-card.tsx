import { pascalCase } from "change-case";
import { HeroCategory, HeroInformation, HeroNames } from "./state";
import { Show } from "solid-js";

type HeroCardProps = {
  hero: HeroNames;
  level: number;
  setLevel: (v: number) => void;
  targetLevel: number;
  setTargetLevel: (v: number) => void;
  tier?: number;
};

export function HeroCard(props: HeroCardProps) {
  const heroInformation = () => HeroInformation[props.hero];
  return (
    <Show when={heroInformation()}>
      <div
        class="flex flex-col border rounded-xs w-30 gap-1"
        classList={{
          "bg-amber-300 dark:bg-amber-600":
            heroInformation().category === HeroCategory.UR,
          "bg-purple-300 dark:bg-purple-600":
            heroInformation().category === HeroCategory.SSR,
          "bg-sky-300 dark:bg-sky-600":
            heroInformation().category === HeroCategory.SR,
        }}
      >
        <div class="grid grid-cols-[25px_1fr_25px] items-center">
          <div>
            <img
              src={`/assets/${pascalCase(
                heroInformation().capability
              )}_Capability.webp`}
            />
          </div>
          <div class="flex-1 text-center text-xs font-medium">
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
          <p>From</p>
          <input
            class="border w-full text-center appearance-none"
            type="number"
            value={props.level}
            onInput={(e) => props.setLevel(e.target.valueAsNumber)}
          />
          <p>To</p>
          <input
            class="border w-full text-center appearance-none"
            type="number"
            value={props.targetLevel}
            onInput={(e) => props.setTargetLevel(e.target.valueAsNumber)}
          />
        </div>
      </div>
    </Show>
  );
}
