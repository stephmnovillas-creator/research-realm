import React from "react";
import { queryClient } from "../../router";
import type { User } from "../types/user.types";
import { AuthContext } from "./auth.context";
import { getAuthFromLocalStorage, setStoredAuth } from "./auth.storage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<User | null>(
		getAuthFromLocalStorage(),
	);

	const login = (user: User, token: string) => {
		setUser(user);
		setStoredAuth(user, token);
		// Invalidate all queries to refetch with new auth token
		queryClient.invalidateQueries();
	};

	const logout = () => {
		setUser(null);
		setStoredAuth(null);
		// Clear all queries from the cache when logging out
		queryClient.clear();
	};

	const isAuthenticated = user !== null;
	const isAdmin = user?.role === "ADMIN";

	return (
		<AuthContext.Provider
			value={{ user, login, logout, isAuthenticated, isAdmin }}
		>
			{children}
		</AuthContext.Provider>
	);
}
