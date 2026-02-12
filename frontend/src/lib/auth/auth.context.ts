import React from "react";
import type { User } from "../types/user.types";

export interface AuthContext {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const AuthContext = React.createContext<AuthContext | null>(null);
