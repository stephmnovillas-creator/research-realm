import React from "react";
import { AuthContext } from "./auth.context";

/**
 * Custom hook to access authentication context.
 * Must be used within an AuthProvider.
 */
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
