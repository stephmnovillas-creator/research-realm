export const BACKEND_URL =
  (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:4000";

export const YEARS = {
  "2018": "2018",
  "2023": "2023",
  "2024": "2024",
  "2025": "2025",
} as const;
