import React from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  lrn: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}

export interface AuthContext {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
export const AuthContext = React.createContext<AuthContext | null>(null);
