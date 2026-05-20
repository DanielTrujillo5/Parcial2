import { useAuth } from "../context/AuthContext";

export default function TicketsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Sistema de Tickets
          </h1>

          <p className="text-slate-400 mt-2">
            Bienvenido {user?.username}
          </p>

          <p className="text-slate-400">
            Rol: {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Ruta Protegida
        </h2>

        <p>
          Solo usuarios autenticados pueden ver esta página.
        </p>
      </div>
    </div>
  );
}