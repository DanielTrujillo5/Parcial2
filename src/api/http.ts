const API_URL = "http://localhost:8080/api";

export async function http<T>(

  endpoint: string,

  method: string = "GET",

  body?: unknown

): Promise<T> {

  const token = localStorage.getItem("token");

  const response = await fetch(

    `${API_URL}${endpoint}`,

    {

      method,

      headers: {

        "Content-Type": "application/json",

        Authorization: token
          ? `Bearer ${token}`
          : "",

      },

      body: body
        ? JSON.stringify(body)
        : undefined,

    }

  );

  if (!response.ok) {

    throw new Error(
      "Error en la petición"
    );

  }

  return response.json();

}