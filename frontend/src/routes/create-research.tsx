import { createFileRoute } from "@tanstack/react-router";
import CreateResearch from "../components/CreateResearch";

export const Route = createFileRoute("/create-research")({
	component: RouteComponent,
});

function RouteComponent() {
	return <CreateResearch />;
}
