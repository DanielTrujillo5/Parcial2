import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  TECNICO: "Técnico",
  USUARIO: "Usuario",
};

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-500/20 text-purple-400",
  TECNICO: "bg-sky-500/20 text-sky-400",
  USUARIO: "bg-emerald-500/20 text-emerald-400",
};

export default function Sidebar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }

  const navItems = [
    {
      path: "/inicio",
      label: "Inicio",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      path: "/tickets",
      label: "Listado Tickets",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
  ];

  return (

    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6 flex flex-col">

      <div className="mb-10">

        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-sky-400">Ticket</span>
          <span className="text-white">sApp</span>
        </h1>

      </div>

      <nav className="flex flex-col gap-2">

        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                active
                  ? "bg-sky-500/10 text-sky-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sky-400 rounded-r-full" />
              )}
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

      </nav>

      <div className="mt-auto">

        <div className="border-t border-slate-800 pt-4 mb-4">

          <div className="flex items-center gap-3 px-3 py-2">

            <div className="w-9 h-9 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-sm shrink-0">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">

              <p className="text-sm font-medium text-white truncate">
                {user?.username}
              </p>

              <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-0.5 ${user ? roleColors[user.role] : ""}`}>
                {user ? roleLabels[user.role] : ""}
              </span>

            </div>

          </div>

        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Cerrar sesión</span>
        </button>

      </div>

    </aside>
  );
}