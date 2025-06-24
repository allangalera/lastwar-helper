import { useRouter } from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import { addCharacter } from "~/service";

export function AddCharacterForm() {
  const router = useRouter();
  const [name, setName] = createSignal<string>("");
  const [combarPower, setCombarPower] = createSignal<string>("");
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const handleFormSubmission = async () => {
    setIsLoading(true);
    try {
      await addCharacter({
        data: {
          name: name(),
        },
      });
      setName("");
      setCombarPower("");
      router.invalidate();
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
            name="combarPower"
            value={combarPower()}
            onInput={(e) => setCombarPower(e.target.value)}
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
