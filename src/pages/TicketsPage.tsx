import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { useTickets } from "../api/tickets.queries";
import { useCategorias } from "../api/categorias.queries";

export default function TicketsPage() {

  const { data: tickets, isLoading, error } = useTickets();
  const { data: categorias } = useCategorias();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredTickets = tickets?.filter((ticket) => {
    const matchesSearch = ticket.titulo
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      ticket.categoriaId === Number(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (

    <MainLayout>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Listado Tickets
          </h1>

          <div className="flex gap-4">

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-white"
            >
              <option value="">
                Todas las categorías
              </option>
              {categorias?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Buscar ticket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-white w-72"
            />

          </div>

        </div>

        {isLoading && (
          <p>Cargando tickets...</p>
        )}

        {error && (
          <p>Error cargando tickets</p>
        )}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-800 text-slate-400">

                <th className="text-left p-4">
                  Título
                </th>

                <th className="text-left p-4">
                  Estado
                </th>

                <th className="text-left p-4">
                  Prioridad
                </th>

                <th className="text-left p-4">
                  Categoría
                </th>

                <th className="text-left p-4">
                  Usuario Asignado
                </th>

                <th className="text-left p-4">
                  Fecha
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTickets?.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 font-medium">
                    {ticket.titulo}
                  </td>

                  <td className="p-4">
                    {ticket.status}
                  </td>

                  <td className="p-4">
                    {ticket.prioridad}
                  </td>

                  <td className="p-4">
                    {ticket.categoriaNombre}
                  </td>

                  <td className="p-4">
                    {ticket.asignadoAUsername || "Sin asignar"}
                  </td>

                  <td className="p-4">
                    {new Date(ticket.createdAt)
                      .toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}