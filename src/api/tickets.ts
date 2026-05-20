import { http } from "./http";

import type { ApiResponse } from "../types/api";

import type { Ticket, CreateTicketRequest } from "../types/ticket";

export const ticketsApi = {

  list: async () => {

    const response = await http<ApiResponse<Ticket[]>>(
      "/tickets"
    );

    return response.data;

  },

  create: async (data: CreateTicketRequest) => {
    const response = await http<ApiResponse<Ticket>>("/tickets", "POST", data);
    return response.data;
  },

};