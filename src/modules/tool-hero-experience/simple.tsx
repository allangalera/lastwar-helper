import { createEffect, createSignal, onMount } from "solid-js";
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

export function Simple() {
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
    <div class="border p-1">
      <div>
        <label>
          Current level:
          <input
            type="number"
            class="border min-w-14 text-center"
            value={currentLevel()}
            onInput={(e) => setCurrentLevel(e.target.valueAsNumber)}
          ></input>
        </label>
        <label>
          Target level:
          <input
            type="number"
            class="border min-w-14 text-center"
            value={targetLevel()}
            onInput={(e) => setTargetLevel(e.target.valueAsNumber)}
          ></input>
        </label>
        <label>
          Number of heroes:
          <input
            type="number"
            class="border min-w-14 text-center"
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
  );
}
