import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}