const API_URL = import.meta.env.VITE_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function http<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: unknown
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response.json();
}