import { nanoid } from "nanoid";
import { calculateCost } from "./utils";
import { createEffect, createSignal } from "solid-js";
import { z } from "zod/v4";

export const heroSchema = z.object({
  id: z.string(),
  level: z.number().min(1).max(175),
  targetLevel: z.number().min(1).max(175),
  cost: z.number(),
});

export const heroInsertSchema = heroSchema.omit({
  id: true,
});

export type Hero = z.infer<typeof heroSchema>;

export type HeroInsert = z.infer<typeof heroInsertSchema>;

const LOCAL_STORAGE_KEY = "last-war-hero-experience-calculator";

function getDataFromLocalStorage() {
  if (!localStorage) {
    return;
  }
  const loadFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY) as any;

  if (!loadFromLocalStorage) {
    return;
  }
  return new Map(JSON.parse(loadFromLocalStorage));
}

const dataFromLocalStorage = getDataFromLocalStorage();

export const [heroes, setHeroes] = createSignal<Map<Hero["id"], Hero>>(
  dataFromLocalStorage ? dataFromLocalStorage : new Map()
);

createEffect(() => {
  if (!localStorage) {
    return;
  }
  const dataString = JSON.stringify(Array.from(heroes().entries()));
  localStorage.setItem(LOCAL_STORAGE_KEY, dataString);
});

export const heroesArray = () =>
  JSON.parse(JSON.stringify(Array.from(heroes().keys()))) as Array<Hero["id"]>;

export function addHero(hero: HeroInsert) {
  const parsedHero = heroInsertSchema.parse(hero);
  const heroesCopy = new Map(
    JSON.parse(JSON.stringify(Array.from(heroes())))
  ) as Map<Hero["id"], Hero>;
  const id = nanoid();
  const newCharacter = {
    id,
    ...parsedHero,
    cost: calculateCost({
      level: parsedHero.level,
      targetLevel: parsedHero.targetLevel,
    }),
  };
  heroesCopy.set(id, newCharacter);
  setHeroes(heroesCopy);
}

export function updateHero(heroToUpdate: Hero) {
  const parsedHero = heroSchema.parse(heroToUpdate);
  const heroesCopy = new Map(
    JSON.parse(JSON.stringify(Array.from(heroes())))
  ) as Map<Hero["id"], Hero>;
  heroesCopy.set(parsedHero.id, {
    ...parsedHero,
    cost: calculateCost({
      level: parsedHero.level,
      targetLevel: parsedHero.targetLevel,
    }),
  });
  setHeroes(heroesCopy);
}

export function updateHeroLevel(id: Hero["id"], level: Hero["level"]) {
  const hero = heroes().get(id);
  if (!hero) return;
  updateHero({
    ...hero,
    level,
    ...(hero.targetLevel < level ? { targetLevel: level + 5 } : {}),
  });
}

export function updateHeroTargetLevel(
  id: Hero["id"],
  targetLevel: Hero["targetLevel"]
) {
  const hero = heroes().get(id);
  if (!hero) return;
  updateHero({
    ...hero,
    targetLevel,
  });
}

export function deleteHero(id: Hero["id"]) {
  const heroesCopy = new Map(
    JSON.parse(JSON.stringify(Array.from(heroes())))
  ) as Map<Hero["id"], Hero>;
  heroesCopy.delete(id);
  setHeroes(heroesCopy);
}
