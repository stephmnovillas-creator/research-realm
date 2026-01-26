import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ArchiveDetailsComponent from "../../components/ArchiveDetailsComponent";
import { archiveDetailsQueryOptions } from "../../lib/queryOptions";

export const Route = createFileRoute("/archive-list/$id")({
	component: RouteComponent,

	loader: ({ context, params }) => {
		context.queryClient.ensureQueryData(archiveDetailsQueryOptions(params.id));
	},
	errorComponent: () => <div>Failed to load archives.</div>,
});

function RouteComponent() {
	const params = Route.useParams();
	const { data, isLoading } = useQuery(archiveDetailsQueryOptions(params.id));

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!data) {
		return <div>No data found.</div>;
	}
	return <ArchiveDetailsComponent research={data} />;
}
