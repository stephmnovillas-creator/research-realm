import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import CreateResearch from "../../components/CreateResearch";

export const Route = createFileRoute("/_protected/create-research")({
	beforeLoad: ({ context }) => {
		const { auth } = context;

		// Check if user is admin
		if (!auth.isAdmin) {
			toast.error("You do not have permission to access this page.");
			throw redirect({
				to: "/archive-list",
				search: { search: undefined, year: undefined },
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <CreateResearch />;
}
