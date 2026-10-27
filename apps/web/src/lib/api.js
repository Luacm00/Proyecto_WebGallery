const API_URL = import.meta.env.VITE_API_URL;

/** Error de la API con el formato { error: { code, message, requestId } }. */
export class ApiError extends Error {
  constructor(status, code, message, requestId) {
    super(message);
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

/**
 * fetch a nuestra API. Si se pasa "token", agrega Authorization: Bearer.
 * Devuelve el JSON de la respuesta, o lanza ApiError si el estado no es 2xx.
 */
export async function apiFetch(path, { token, headers, ...options } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const body = await res.json().catch(() => null); // en caso de que la respuesta no sea JSON
  if (!res.ok) {
    throw new ApiError(
      res.status,
      body?.error?.code ?? "NETWORK_ERROR",
      body?.error?.message ?? "No pudimos conectar con el servidor",
      body?.error?.requestId,
    );
  }
  return body;
}
