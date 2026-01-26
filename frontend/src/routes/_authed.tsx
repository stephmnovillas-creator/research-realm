import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
	beforeLoad: ({ context }) => {
		const { auth } = context;

    console.log(auth)

		// Redirect to sign-in if not authenticated
		if (!auth.isAuthenticated) {
			throw {
				redirectTo: "/sign-in",
			};
		}
	},
});
