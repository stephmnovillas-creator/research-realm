import React from "react";
import { AuthContext, type User } from "./auth.context";

function getAuthFromLocalStorage(): User | null {
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

function setStoredAuth(user: User | null, token?: string) {
	if (user) {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token || "dummy");
	} else {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<User | null>(
		getAuthFromLocalStorage(),
	);
	const login = (user: User, token: string) => {
		setUser(user);
		setStoredAuth(user, token);
	};

	const logout = () => {
		setUser(null);
		setStoredAuth(null);
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
