import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import ArchiveList from "../../../components/ArchiveList";
import { SearchAndFilters } from "../../../components/ArchiveSearchAndFilter";
import { useAuth } from "../../../lib/auth";
import type { YEARS } from "../../../lib/constants";
import { archivesQueryOptions } from "../../../lib/queryOptions";

export const Route = createFileRoute("/_authed/archive-list/")({
	component: RouteComponent,
	validateSearch: (search) => {
		if (!search.search && !search.year) {
			return {
				search: undefined,
				year: undefined,
			}
		}

		return {
			search: search.search ? String(search.search) : undefined,
			year: (search.year && search.year !== "all"
				? String(search.year)
				: undefined) as (typeof YEARS)[keyof typeof YEARS] | "all" | undefined,
		}
	},

	loaderDeps: ({ search }) => ({
		search,
	}),
	loader: ({ context, deps: { search } }) => {
		const { queryClient } = context;
		queryClient.ensureQueryData(
			archivesQueryOptions(search.search, search.year),
		)
	},
	errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RouteComponent() {
	const { search, year } = Route.useSearch();
	const { data } = useQuery(archivesQueryOptions(search, year));
	const { isAdmin } = useAuth();
	if (data === undefined) {
		return <div>No archives available.</div>;
	}

	return (
		<div className="space-y-6 w-full p-10">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-gray-900">Research Archives</h1>
				{isAdmin && (
					<Link
						to={"/create-research"}
						className="flex items-center gap-2 px-4 py-2 bg-[#7a9b76] text-white rounded-lg hover:bg-[#6a8b66] transition-colors font-medium"
					>
						<PlusCircle className="w-5 h-5" />
						Add Research
					</Link>
				)}
			</div>
			<SearchAndFilters />
			<ArchiveList papers={data} />
		</div>
	)
}
