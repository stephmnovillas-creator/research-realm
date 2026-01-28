import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ context }) => {
		const { auth } = context;

		// Redirect to archive-list if already authenticated
		if (auth.isAuthenticated) {
			throw redirect({
				to: "/archive-list",
				search: {
					search: undefined,
					year: undefined,
				},
			});
		}
	},
});
