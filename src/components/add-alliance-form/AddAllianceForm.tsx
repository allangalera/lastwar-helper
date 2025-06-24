import { useQueryClient } from "@tanstack/solid-query";
import { useRouter } from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import { addAlliance, getAlliancesQueryOptions } from "~/service";

export function AddAllianceForm() {
  const queryClient = useQueryClient();
  const [name, setName] = createSignal<string>("");
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const handleFormSubmission = async () => {
    setIsLoading(true);
    try {
      await addAlliance({
        data: {
          name: name(),
        },
      });
      setName("");
      queryClient.invalidateQueries({
        queryKey: getAlliancesQueryOptions.queryKey,
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
        <button
          disabled={isLoading()}
          onClick={handleFormSubmission}
          type="button"
        >
          {isLoading() ? "Adding . . ." : "Add Alliance"}
        </button>
      </form>
    </>
  );
}
