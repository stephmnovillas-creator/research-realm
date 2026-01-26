import { createRouter, ErrorComponent } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import type { AuthContext } from "./lib/auth.context";

export const queryClient = new QueryClient();

export const router = createRouter({
	routeTree,
	context: {
		queryClient,
		auth: undefined!,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	defaultErrorComponent: ErrorComponent,
	scrollRestoration: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}

	interface RouterContext {
		queryClient: QueryClient;
		auth: AuthContext;
	}
}
