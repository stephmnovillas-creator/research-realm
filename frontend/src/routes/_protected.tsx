import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
	beforeLoad: ({ context }) => {
		const { auth } = context;

		console.log(auth);

		// Redirect to sign-in if not authenticated
		if (!auth.isAuthenticated) {
			throw redirect({
				to: "/sign-in",
			});
		}
	},
});
