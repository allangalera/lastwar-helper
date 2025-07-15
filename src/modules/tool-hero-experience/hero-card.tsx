import { pascalCase } from "change-case";
import { HeroCategory, HeroInformation, HeroNames } from "./state";

type HeroCardProps = {
  hero: HeroNames;
  level: number;
  setLevel: (v: number) => void;
  tier?: number;
};

export function HeroCard(props: HeroCardProps) {
  return (
    <div
      class="flex flex-col border rounded-xs w-30 gap-1"
      classList={{
        "bg-amber-600":
          HeroInformation[props.hero].category === HeroCategory.UR,
        "bg-purple-600":
          HeroInformation[props.hero].category === HeroCategory.SSR,
        "bg-sky-600": HeroInformation[props.hero].category === HeroCategory.SR,
      }}
    >
      <div class="grid grid-cols-[25px_1fr_25px] items-center">
        <div>
          <img
            src={`/assets/${pascalCase(
              HeroInformation[props.hero].capability
            )}_Capability.webp`}
          />
        </div>
        <div class="flex-1 text-center text-xs font-medium">
          {pascalCase(props.hero)}
        </div>
        <div>
          <img
            src={`/assets/${pascalCase(
              HeroInformation[props.hero].type
            )}_Type.webp`}
          />
        </div>
      </div>
      <div class="flex justify-center">
        <img src={`/assets/heroes/${pascalCase(props.hero)}_Thumbnail.webp`} />
      </div>
      <div class="flex p-2 gap-2">
        <p>Lv.</p>
        <input
          class="border w-full text-center appearance-none"
          type="number"
          value={props.level}
          onInput={(e) => props.setLevel(e.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}
