import { useRouter } from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import { addAlliance } from "~/service";

export function AddAllianceForm() {
  const [name, setName] = createSignal<string>("");
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const handleFormSubmission = async () => {
    console.log("handleFormSubmission", name());
    setIsLoading(true);
    try {
      const response = await addAlliance({
        data: {
          name: name(),
        },
      });
      console.log({ response });
      setName("");
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
