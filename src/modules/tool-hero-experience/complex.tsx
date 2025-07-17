import { Dialog } from "@ark-ui/solid/dialog";
import { Portal } from "solid-js/web";
import { createEffect, createSignal, For } from "solid-js";
import { Combobox, useListCollection } from "@ark-ui/solid/combobox";
import { useFilter } from "@ark-ui/solid/locale";
import {
  addHero,
  deleteHero,
  Hero,
  updateHeroLevel,
  updateHeroTargetLevel,
  heroes,
  heroesArray,
  availableHeroes,
  HeroNames,
  HeroName,
  applyAllTargetLevel,
  resetTargetLevelToCurrentLevel,
} from "./state";
import { formatNumber } from "./utils";
import { HeroCard } from "./hero-card";
import { Menu } from "@ark-ui/solid/menu";
import { Button } from "~/components/button";

function HeroListItem(props: Hero) {
  const updatedHero = () => heroes().get(props.id)!;
  return (
    <HeroCard
      hero={props.hero}
      level={updatedHero().level}
      setLevel={(level) => updateHeroLevel(props.id, level)}
      targetLevel={updatedHero().targetLevel}
      setTargetLevel={(level) => updateHeroTargetLevel(props.id, level)}
      cost={formatNumber(updatedHero().cost)}
      onDelete={() => deleteHero(props.id)}
    />
  );
}

function AddHeroForm() {
  const [open, setOpen] = createSignal(false);
  const handleSubmit = (hero: HeroNames) => {
    addHero({
      hero: hero,
      level: 1,
      targetLevel: 5,
      cost: 0,
    });
    setOpen(false);
  };
  const filterFn = useFilter({ sensitivity: "base" });

  const { collection, filter, set } = useListCollection({
    initialItems: availableHeroes(),
    filter: filterFn().contains,
  });

  createEffect(() => {
    const usedHeroes = Array.from(heroes().values()).map((item) => item.hero);
    set(Object.values(HeroName).filter((item) => !usedHeroes.includes(item)));
  });

  const handleInputChange = (details: any) => {
    filter(details.inputValue);
  };
  return (
    <div class="grid">
      <button
        class="border px-3 py-1"
        type="button"
        onClick={() => setOpen(true)}
      >
        Add hero
      </button>
      <Dialog.Root open={open()} onOpenChange={() => setOpen(false)}>
        <Portal>
          <Dialog.Backdrop class="fixed w-screen h-screen bg-neutral-600/40 top-0 backdrop-blur-sm z-50" />
          <Dialog.Positioner class="fixed w-full h-full top-0 flex items-center justify-center z-100">
            <Dialog.Content class="bg-slate-300 dark:bg-slate-800 border p-3 rounded-xs border-slate-950 dark:border-slate-200 overflow-auto max-w-full max-h-full">
              <Dialog.Title class="text-center text-xl">
                Select hero
              </Dialog.Title>
              <Dialog.Description>
                <Combobox.Root
                  collection={collection()}
                  onInputValueChange={handleInputChange}
                  onSelect={(details) =>
                    handleSubmit(details.itemValue as HeroNames)
                  }
                >
                  <Combobox.Control>
                    <Combobox.Input autofocus />
                    <Combobox.Trigger>Open</Combobox.Trigger>
                    <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
                  </Combobox.Control>
                  <Portal>
                    <Combobox.Positioner>
                      <Combobox.Content class="z-200 bg-slate-300 dark:bg-slate-800 border p-3 rounded-xs border-slate-950 dark:border-slate-200">
                        <Combobox.ItemGroup>
                          <For each={collection().items}>
                            {(item) => (
                              <Combobox.Item item={item}>
                                <Combobox.ItemText>{item}</Combobox.ItemText>
                                <Combobox.ItemIndicator>
                                  ✓
                                </Combobox.ItemIndicator>
                              </Combobox.Item>
                            )}
                          </For>
                        </Combobox.ItemGroup>
                      </Combobox.Content>
                    </Combobox.Positioner>
                  </Portal>
                </Combobox.Root>
              </Dialog.Description>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

function HelperActions() {
  const actions = ["reset"];

  const handleActionSelected = (action: string) => {
    switch (action) {
      case "reset":
        resetTargetLevelToCurrentLevel();
        return;
    }
  };
  return (
    <Menu.Root>
      <Menu.Trigger class="border px-3 py-1 flex gap-2">
        Actions <Menu.Indicator>➡️</Menu.Indicator>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class="py-2 px-4 border border-slate-950 dark:border-slate-200 bg-slate-300 dark:bg-slate-800">
            <For each={actions}>
              {(action) => (
                <Menu.Item
                  class="cursor-pointer hover:underline"
                  value={action}
                  onSelect={() => handleActionSelected(action)}
                >
                  {action}
                </Menu.Item>
              )}
            </For>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export function Complex() {
  const totalCost = () => {
    return heroes()
      .values()
      .reduce((sum, item) => sum + item.cost, 0);
  };
  return (
    <>
      <div class="flex gap-4">
        <AddHeroForm />
        <HelperActions />
      </div>
      <div class="h-full overflow-hidden w-full">
        <div class="flex flex-wrap gap-2 overflow-auto py-2 max-h-full justify-center">
          <For each={heroesArray()}>
            {(heroId) => {
              const hero = heroes().get(heroId)!;
              return (
                <HeroListItem
                  hero={hero.hero}
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
        <p class="text-end text-xl">{formatNumber(totalCost())}</p>
        <img src="/assets/exp-chest.avif" />

        <Button variant="positive" onClick={() => applyAllTargetLevel()}>
          Upgrade
        </Button>
      </div>
    </>
  );
}
