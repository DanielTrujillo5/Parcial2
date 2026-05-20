import { http } from "./http";

import type { ApiResponse } from "../types/api";

import type { Ticket } from "../types/ticket";

export const ticketsApi = {

  list: async () => {

    const response = await http<ApiResponse<Ticket[]>>(
      "/tickets"
    );

    return response.data;

  },

};