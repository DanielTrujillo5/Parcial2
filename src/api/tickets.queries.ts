import { useQuery } from "@tanstack/react-query";

import { ticketsApi } from "./tickets";

export function useTickets() {

  return useQuery({

    queryKey: ["tickets"],

    queryFn: ticketsApi.list,

  });

}