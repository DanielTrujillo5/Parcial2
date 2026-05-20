import { useAuth } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <MainLayout>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10">
        <h1 className="text-5xl font-bold mb-6">Bienvenido</h1>
        <p className="text-2xl text-slate-300 mb-4">
          Usuario: {user?.username}
        </p>
        <p className="text-xl text-slate-400">Rol: {user?.role}</p>
      </div>
    </MainLayout>
  );
}

//hola
