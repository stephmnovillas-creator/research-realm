import type { User } from "../types/user.types";

/**
 * Retrieves user authentication data from localStorage.
 * Returns null if no user is stored or if parsing fails.
 */
export function getAuthFromLocalStorage(): User | null {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
  return null;
}

/**
 * Stores user authentication data in localStorage.
 * If user is null, removes auth data from storage.
 */
export function setStoredAuth(user: User | null, token?: string) {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    if (token) {
      localStorage.setItem("token", token);
    }
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}

/**
 * Retrieves the stored authentication token from localStorage.
 */
export function getStoredToken(): string | null {
  return localStorage.getItem("token");
}
