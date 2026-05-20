import { useQuery } from "@tanstack/react-query";
import { categoriasApi } from "./categorias";

export function useCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: categoriasApi.list,
  });
}
