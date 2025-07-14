import { For } from "solid-js";
import {
  addHero,
  deleteHero,
  Hero,
  updateHeroLevel,
  updateHeroTargetLevel,
  heroes,
  heroesArray,
} from "./state";
import { formatNumber } from "./utils";
import expIcon from "~/assets/exp.avif";

function HeroListItem(props: Hero) {
  const updatedHero = () => heroes().get(props.id)!;
  return (
    <div class="grid gap-2 border p-1 max-w-max">
      <div class="flex gap-4 items-center">
        <p class="flex-1">Level:</p>
        <div class="flex gap-2">
          <input
            class="border w-14 text-center"
            type="number"
            value={updatedHero().level}
            onInput={(e) => updateHeroLevel(props.id, parseInt(e.target.value))}
          />
          <button
            class="border px-3 py-1"
            onClick={() => updateHeroLevel(props.id, updatedHero().level - 1)}
          >
            -
          </button>
          <button
            class="border px-3 py-1"
            onClick={() => updateHeroLevel(props.id, updatedHero().level + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <p class="flex-1">Target Level:</p>
        <div class="flex gap-2">
          <input
            class="border w-14 text-center"
            type="number"
            value={updatedHero().targetLevel}
            onInput={(e) =>
              updateHeroTargetLevel(props.id, parseInt(e.target.value))
            }
          />
          <button
            class="border px-3 py-1"
            onClick={() =>
              updateHeroTargetLevel(props.id, updatedHero().targetLevel - 1)
            }
          >
            -
          </button>
          <button
            class="border px-3 py-1"
            onClick={() =>
              updateHeroTargetLevel(props.id, updatedHero().targetLevel + 1)
            }
          >
            +
          </button>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <p>Cost:</p>
          <p>{formatNumber(updatedHero()?.cost)}</p>
        </div>
        <button class="border px-3 py-1" onClick={() => deleteHero(props.id)}>
          delete
        </button>
      </div>
    </div>
  );
}

function AddHeroForm() {
  const handleSubmit = () => {
    addHero({
      level: 1,
      targetLevel: 5,
      cost: 0,
    });
  };
  return (
    <div class="grid">
      <button class="border px-3 py-1" onClick={handleSubmit}>
        Add hero
      </button>
    </div>
  );
}

export function ToolHeroExperience() {
  const totalCost = () =>
    heroes()
      .values()
      .reduce((sum, item) => sum + item.cost, 0);
  return (
    <div class="grid items-center justify-center gap-4 grid-rows-[auto_1fr_auto] h-full">
      <div class="px-4">
        <h1 class="text-xl">Hero Experience Calculator</h1>
        <AddHeroForm />
      </div>
      <div class="px-4 h-full overflow-hidden">
        <div class="grid gap-2 overflow-auto py-2 max-h-full justify-center">
          <For each={heroesArray()}>
            {(heroId) => {
              const hero = heroes().get(heroId)!;
              return (
                <HeroListItem
                  id={heroId}
                  level={hero.level}
                  targetLevel={hero.targetLevel}
                  cost={hero.cost}
                />
              );
            }}
          </For>
        </div>
      </div>
      <div class="flex items-center justify-end gap-2">
        <p class="text-end text-xl">Total cost: {formatNumber(totalCost())}</p>
        <img src={expIcon} class="" />
      </div>
    </div>
  );
}
