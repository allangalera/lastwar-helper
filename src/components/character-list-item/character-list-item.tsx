import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { deleteCharacter, getCharactersQueryOptions } from "~/service";

export function CharacterListItem(props: {
  id: string;
  name: string;
  combatPower: string;
}) {
  const queryClient = useQueryClient();
  const deleteCharacterMutation = useMutation(() => ({
    mutationFn: deleteCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCharactersQueryOptions.queryKey,
      });
    },
  }));

  return (
    <div>
      <a href={`/characters/${props.id}`}>
        {props.name} - {props.combatPower}
      </a>
      <div>
        <button
          disabled={deleteCharacterMutation.isPending}
          onClick={() => {
            deleteCharacterMutation.mutate({ data: { id: props.id } });
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}
