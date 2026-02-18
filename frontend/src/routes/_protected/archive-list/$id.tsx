import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ArchiveDetailsComponent from "../../../components/ArchiveDetailsComponent";
import {
	archiveDetailsQueryOptions,
	archiveFileStatusQueryOptions,
} from "../../../lib/api/queries/archives.queries";

export const Route = createFileRoute("/_protected/archive-list/$id")({
	component: RouteComponent,

	loader: async ({ context, params }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(
				archiveDetailsQueryOptions(params.id),
			),
			context.queryClient.ensureQueryData(
				archiveFileStatusQueryOptions(params.id),
			),
		]);
	},
	errorComponent: () => <div>Failed to load archives.</div>,
});

function RouteComponent() {
	const params = Route.useParams();
	const { data, isLoading } = useQuery(archiveDetailsQueryOptions(params.id));

	if (isLoading) {
		return (
			<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="rounded-xl bg-white p-8 shadow-sm">
					<div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
					<div className="mt-6 space-y-4">
						<div className="h-5 w-full animate-pulse rounded bg-gray-200" />
						<div className="h-5 w-5/6 animate-pulse rounded bg-gray-200" />
						<div className="h-5 w-4/6 animate-pulse rounded bg-gray-200" />
					</div>
				</div>
			</div>
		);
	}
	if (!data) {
		return (
			<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="rounded-xl bg-white p-8 text-gray-600 shadow-sm">
					No data found.
				</div>
			</div>
		);
	}
	return <ArchiveDetailsComponent research={data} />;
}
