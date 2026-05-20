import { useState } from "react";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await authApi.login({
        username,
        password,
      });

      const jwt = response.data;

      login(jwt.token, {
        username: jwt.username,
        role: jwt.role,
      });

      alert("Login exitoso");

    } catch (err) {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-white mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3 rounded"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}