import { http } from "./http";
import type { ApiResponse } from "../types/api";
import type { Categoria } from "../types/categoria";

export const categoriasApi = {
  list: async () => {
    const response = await http<ApiResponse<Categoria[]>>("/categorias");
    return response.data;
  },
};
