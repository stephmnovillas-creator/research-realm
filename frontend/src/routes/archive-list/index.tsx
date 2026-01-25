import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ArchiveList from "../../components/ArchiveList";
import { SearchAndFilters } from "../../components/ArchiveSearchAndFilter";
import type { YEARS } from "../../lib/constants";
import { archivesQueryOptions } from "../../lib/queryOptions";

export const Route = createFileRoute("/archive-list/")({
	component: RouteComponent,
	validateSearch: (search) => {
		if (!search.search && !search.year) {
			return {
				search: undefined,
				year: undefined,
			};
		}

		return {
			search: search.search ? String(search.search) : undefined,
			year: (search.year && search.year !== "all"
				? String(search.year)
				: undefined) as (typeof YEARS)[keyof typeof YEARS] | "all" | undefined,
		};
	},

	loaderDeps: ({ search }) => ({
		search,
	}),
	loader: ({ context, deps: { search } }) => {
		console.log("Loader search param:", search);
		context.queryClient.ensureQueryData(
			archivesQueryOptions(search.search, search.year),
		);
	},
	errorComponent: () => <div>Failed to load archives.</div>,
});

function RouteComponent() {
	const { search, year } = Route.useSearch();
	const { data, isLoading } = useQuery(archivesQueryOptions(search, year));

	if (isLoading) {
		return <div>Loading archives...</div>;
	}
	if (data === undefined) {
		return <div>No archives available.</div>;
	}

	return (
		<div className="space-y-6 w-full">
			<SearchAndFilters />
			<ArchiveList papers={data} />
		</div>
	);
}
