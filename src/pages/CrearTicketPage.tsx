import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useCategorias } from "../api/categorias.queries";
import { useCreateTicket } from "../api/tickets.queries";

const prioridades = ["BAJA", "MEDIA", "ALTA", "CRITICA"];

export default function CrearTicketPage() {

  const navigate = useNavigate();
  const { data: categorias } = useCategorias();
  const { mutateAsync: createTicket, isPending } = useCreateTicket();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    try {

      setError("");

      await createTicket({
        titulo,
        descripcion,
        prioridad,
        ...(categoriaId ? { categoriaId: Number(categoriaId) } : {}),
      });

      navigate("/tickets");

    } catch {
      setError("Error al crear el ticket");
    }
  }

  return (

    <MainLayout>

      <div className="max-w-2xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h1 className="text-3xl font-bold mb-8">
            Nuevo Ticket
          </h1>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Título
              </label>

              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white"
                required
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción
              </label>

              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={5}
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white resize-none"
                required
              />

            </div>

            <div className="flex gap-4">

              <div className="flex-1">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Prioridad
                </label>

                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white"
                  required
                >
                  <option value="">Seleccionar...</option>
                  {prioridades.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex-1">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Categoría
                </label>

                <select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white"
                >
                  <option value="">Sin categoría</option>
                  {categorias?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white p-3 rounded-xl font-medium transition"
            >
              {isPending ? "Creando..." : "Crear Ticket"}
            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}
