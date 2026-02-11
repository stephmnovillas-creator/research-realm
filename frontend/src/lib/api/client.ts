import { getStoredToken } from "../auth/auth.storage";
import { BACKEND_URL } from "../config/constants";

/**
 * Creates fetch request headers with authentication token if available.
 */
function getAuthHeaders(): HeadersInit {
  const token = getStoredToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Enhanced fetch wrapper with authentication and error handling.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const rawError = await response.text().catch(() => "Unknown error");
    let parsedMessage = rawError;

    try {
      const parsed = JSON.parse(rawError) as {
        error?: unknown;
        message?: unknown;
      };
      if (typeof parsed.error === "string") {
        parsedMessage = parsed.error;
      } else if (typeof parsed.message === "string") {
        parsedMessage = parsed.message;
      }
    } catch {
      // Keep raw text as fallback when response is not JSON.
    }

    throw new Error(`API Error (${response.status}): ${parsedMessage}`);
  }

  return response.json();
}
