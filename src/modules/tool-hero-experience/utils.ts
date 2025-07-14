import {
  HeroLevelRequirements,
  type HeroLevelRequirementsLevels,
} from "./data";
import { z } from "zod/v4";

export function range(start: number, finish: number) {
  return Array(finish - start)
    .fill(null)
    .map((_, index) => start + index + 1);
}

export function formatNumber(value: number) {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 2,
  });
  return formatter.format(value).replace("B", "G");
}

const calculateCostSchema = z
  .object({
    level: z.coerce.number().min(1).max(175),
    targetLevel: z.coerce.number().min(1).max(175),
  })
  .check((ctx) => {
    if (ctx.value.level >= ctx.value.targetLevel) {
      ctx.issues.push({
        code: "custom",
        message: "level and targetLevel must be different",
        input: ctx.value,
      });
    }
  });

export function calculateCost(input: {
  level: number | string;
  targetLevel: number | string;
}) {
  const validation = calculateCostSchema.safeParse({
    level: input.level,
    targetLevel: input.targetLevel,
  });
  if (validation.error) {
    return 0;
  }
  const { level, targetLevel } = validation.data;
  let sum = 0;

  for (const currentLevel of range(level, targetLevel)) {
    sum +=
      HeroLevelRequirements[
        currentLevel as unknown as HeroLevelRequirementsLevels
      ].exp;
  }
  return sum;
}
