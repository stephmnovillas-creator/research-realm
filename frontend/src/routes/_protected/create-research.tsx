import { createFileRoute } from "@tanstack/react-router";
import CreateResearch from "../../components/CreateResearch";

export const Route = createFileRoute("/_protected/create-research")({
	beforeLoad: ({ context }) => {
		const { auth } = context;

		// Check if user is admin
		if (!auth.isAdmin) {
			throw new Error("Access denied. Admins only.");
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <CreateResearch />;
}
