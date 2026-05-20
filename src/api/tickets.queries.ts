import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ticketsApi } from "./tickets";

export function useTickets() {

  return useQuery({

    queryKey: ["tickets"],

    queryFn: ticketsApi.list,

  });

}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ticketsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}