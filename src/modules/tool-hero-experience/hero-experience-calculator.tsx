import { createEffect, createSignal } from "solid-js";
import { calculateCost, formatNumber } from "./utils";
import { z } from "zod/v4";

const LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_SIMPLE_DATA =
  "LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_SIMPLE_DATA";

const simpleSchema = z.object({
  currentLevel: z.coerce.number().min(1).max(175),
  targetLevel: z.coerce.number().min(1).max(175),
  numberOfHeroes: z.coerce.number().min(1).max(50),
});

function getDataFromLocalStorage() {
  const localStorageData = localStorage.getItem(
    LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_SIMPLE_DATA
  );
  if (!localStorageData) return;
  const parsedLocalStorageData = JSON.parse(localStorageData);
  if (!parsedLocalStorageData) return;
  const validated = simpleSchema.safeParse(parsedLocalStorageData);
  if (!validated.success) return;
  return validated.data;
}

export function HeroExperienceCalculator() {
  const dataFromLocalStorage = getDataFromLocalStorage();
  const [currentLevel, setCurrentLevel] = createSignal(
    dataFromLocalStorage?.currentLevel ?? 1
  );
  const [targetLevel, setTargetLevel] = createSignal(
    dataFromLocalStorage?.targetLevel ?? 5
  );
  const [numberOfHeroes, setNumberOfHeroes] = createSignal(
    dataFromLocalStorage?.numberOfHeroes ?? 5
  );

  createEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_TOOLS_HERO_EXPERIENCE_SIMPLE_DATA,
      JSON.stringify({
        currentLevel: currentLevel(),
        targetLevel: targetLevel(),
        numberOfHeroes: numberOfHeroes(),
      })
    );
  });

  const costForSingleHero = () =>
    calculateCost({
      level: currentLevel(),
      targetLevel: targetLevel(),
    });

  const totalCost = () => costForSingleHero() * numberOfHeroes();
  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="px-4">
        <h1 class="text-xl">Hero Experience Calculator</h1>
        <div class="border p-1 flex flex-col gap-4">
          <div class="flex flex-wrap gap-2">
            <label class="flex gap-2 items-center">
              Current level:
              <input
                type="number"
                class="border w-15 text-center"
                value={currentLevel()}
                onInput={(e) => setCurrentLevel(e.target.valueAsNumber)}
              ></input>
            </label>
            <label class="flex gap-2 items-center">
              Target level:
              <input
                type="number"
                class="border w-15 text-center"
                value={targetLevel()}
                onInput={(e) => setTargetLevel(e.target.valueAsNumber)}
              ></input>
            </label>
            <label class="flex gap-2 items-center">
              Number of heroes:
              <input
                type="number"
                class="border w-15 text-center"
                value={numberOfHeroes()}
                onInput={(e) => setNumberOfHeroes(e.target.valueAsNumber)}
              ></input>
            </label>
          </div>
          <div>
            <div>
              <p>Single hero cost:{formatNumber(costForSingleHero())} </p>
            </div>
            <div>
              <p>Single hero cost: {formatNumber(totalCost())}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
