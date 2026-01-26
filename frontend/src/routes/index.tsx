import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	loader: () => {
		throw redirect({
			to: "/archive-list",
			search: {
				search: undefined,
				year: undefined,
			},
		});
	},
});
