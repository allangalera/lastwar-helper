import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { deleteAlliance, getAlliancesQueryOptions } from "~/service";

export function AlliancesListItem(props: { id: string; name: string }) {
  const queryClient = useQueryClient();
  const deleteAllianceMutation = useMutation(() => ({
    mutationFn: deleteAlliance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAlliancesQueryOptions.queryKey,
      });
    },
  }));

  return (
    <div>
      <a href={`/alliances/${props.id}`}>{props.name}</a>
      <div>
        <button
          disabled={deleteAllianceMutation.isPending}
          onClick={() => {
            deleteAllianceMutation.mutate({ data: { id: props.id } });
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}
