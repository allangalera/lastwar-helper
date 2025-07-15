import { nanoid } from "nanoid";
import { calculateCost } from "./utils";
import { createEffect, createSignal } from "solid-js";
import { z } from "zod/v4";

export const HeroName = {
  Adam: "adam",
  Ambolt: "ambolt",
  Blaz: "blaz",
  Cage: "cage",
  Carlie: "carlie",
  DVA: "dva",
  Elsa: "elsa",
  Farhad: "farhad",
  Fiona: "fiona",
  Gump: "gump",
  Kane: "kane",
  Kimberly: "kimberly",
  Loki: "loki",
  Lucius: "lucius",
  Marshall: "marshall",
  Mason: "mason",
  Maxwell: "maxwell",
  McGregor: "mcgregor",
  Monica: "monica",
  Morrison: "morrison",
  Murphy: "murphy",
  Richard: "richard",
  Sarah: "sarah",
  Scarlett: "scarlett",
  Schuyler: "schuyler",
  Stetmann: "stetmann",
  Swift: "swift",
  Tesla: "tesla",
  Venom: "venom",
  Violet: "violet",
  Williams: "williams",
} as const;

export type HeroNames = (typeof HeroName)[keyof typeof HeroName];

const HeroType = {
  Aircraft: "aircraft",
  Missile: "missile",
  Tank: "tank",
} as const;

export type HeroTypes = (typeof HeroType)[keyof typeof HeroType];

export const HeroCategory = {
  UR: "ur",
  SSR: "ssr",
  SR: "sr",
} as const;

export type HeroCategories = (typeof HeroCategory)[keyof typeof HeroCategory];

const HeroCapability = {
  GiveBuffs: "give-buffs",
  GiveDamage: "give-damage",
  TakeDamage: "take-damage",
} as const;

export type HeroCapabilities =
  (typeof HeroCapability)[keyof typeof HeroCapability];

type HeroInformation = {
  type: HeroTypes;
  category: HeroCategories;
  capability: HeroCapabilities;
};

export const HeroInformation: Record<HeroNames, HeroInformation> = {
  [HeroName.Adam]: {
    type: HeroType.Missile,
    category: HeroCategory.UR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Ambolt]: {
    type: HeroType.Aircraft,
    category: HeroCategory.SR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Blaz]: {
    type: HeroType.Missile,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Cage]: {
    type: HeroType.Aircraft,
    category: HeroCategory.SSR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Carlie]: {
    type: HeroType.Aircraft,
    category: HeroCategory.UR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.DVA]: {
    type: HeroType.Aircraft,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Elsa]: {
    type: HeroType.Missile,
    category: HeroCategory.SSR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Farhad]: {
    type: HeroType.Tank,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Fiona]: {
    type: HeroType.Missile,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Gump]: {
    type: HeroType.Tank,
    category: HeroCategory.SR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Kane]: {
    type: HeroType.Missile,
    category: HeroCategory.SR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Kimberly]: {
    type: HeroType.Tank,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Loki]: {
    type: HeroType.Tank,
    category: HeroCategory.SR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Lucius]: {
    type: HeroType.Aircraft,
    category: HeroCategory.UR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Marshall]: {
    type: HeroType.Tank,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveBuffs,
  },
  [HeroName.Mason]: {
    type: HeroType.Tank,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Maxwell]: {
    type: HeroType.Aircraft,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.McGregor]: {
    type: HeroType.Missile,
    category: HeroCategory.UR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Monica]: {
    type: HeroType.Tank,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveBuffs,
  },
  [HeroName.Morrison]: {
    type: HeroType.Aircraft,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Murphy]: {
    type: HeroType.Tank,
    category: HeroCategory.UR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Richard]: {
    type: HeroType.Tank,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Sarah]: {
    type: HeroType.Aircraft,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveBuffs,
  },
  [HeroName.Scarlett]: {
    type: HeroType.Tank,
    category: HeroCategory.SSR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Schuyler]: {
    type: HeroType.Aircraft,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Stetmann]: {
    type: HeroType.Tank,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Swift]: {
    type: HeroType.Missile,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Tesla]: {
    type: HeroType.Missile,
    category: HeroCategory.UR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Venom]: {
    type: HeroType.Missile,
    category: HeroCategory.SSR,
    capability: HeroCapability.GiveDamage,
  },
  [HeroName.Violet]: {
    type: HeroType.Tank,
    category: HeroCategory.SSR,
    capability: HeroCapability.TakeDamage,
  },
  [HeroName.Williams]: {
    type: HeroType.Tank,
    category: HeroCategory.UR,
    capability: HeroCapability.TakeDamage,
  },
};

export const heroSchema = z.object({
  id: z.string(),
  level: z.number().min(1).max(175),
  targetLevel: z.number().min(1).max(175),
  cost: z.number(),
  hero: z.enum(Object.values(HeroName)),
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

export const availableHeroes = () => {
  const usedHeroes = Array.from(heroes().values()).map((item) => item.hero);
  return Object.values(HeroName).filter((item) => !usedHeroes.includes(item));
};

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

export function applyAllTargetLevel() {
  const heroesCopy = new Map(
    JSON.parse(JSON.stringify(Array.from(heroes())))
  ) as Map<Hero["id"], Hero>;
  heroesCopy.forEach((item) =>
    heroesCopy.set(item.id, { ...item, level: item.targetLevel })
  );
  setHeroes(heroesCopy);
}
