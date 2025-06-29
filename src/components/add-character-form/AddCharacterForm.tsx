import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import { addCharacter, getCharactersQueryOptions } from "~/service";

export function AddCharacterForm() {
  const queryClient = useQueryClient();
  const [name, setName] = createSignal<string>("");
  const [combatPower, setCombatPower] = createSignal<string>("");
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  // const { mutate, isPending, isSuccess } = useMutation({
  //   mutationFn: addCharacter,
  // });

  const handleFormSubmission = async () => {
    setIsLoading(true);
    try {
      await addCharacter({
        data: {
          name: name(),
          combatPower: combatPower(),
        },
      });
      setName("");
      setCombatPower("");
      queryClient.invalidateQueries({
        queryKey: getCharactersQueryOptions.queryKey,
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name()}
            onInput={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Combat Power
          <input
            type="text"
            name="combatPower"
            value={combatPower()}
            onInput={(e) => setCombatPower(e.target.value)}
          />
        </label>
        <button
          disabled={isLoading()}
          onClick={handleFormSubmission}
          type="button"
        >
          {isLoading() ? "Adding . . ." : "Add Character"}
        </button>
      </form>
    </>
  );
}
