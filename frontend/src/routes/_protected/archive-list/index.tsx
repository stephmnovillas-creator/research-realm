import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import ArchiveList from "../../../components/ArchiveList";
import { SearchAndFilters } from "../../../components/ArchiveSearchAndFilter";
import { archivesQueryOptions } from "../../../lib/api/queries/archives.queries";
import { useAuth } from "../../../lib/auth/auth.hooks";
import type { YEARS } from "../../../lib/config/constants";

export const Route = createFileRoute("/_protected/archive-list/")({
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
		const { queryClient } = context;
		queryClient.ensureQueryData(
			archivesQueryOptions(search.search, search.year),
		);
	},
	errorComponent: ({ error }) => <div>{error.message}</div>,
});

function ArchiveListSkeleton() {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-sm">
			<div className="grid grid-cols-[2fr_0.7fr_1.3fr_0.7fr] gap-4 border-b border-gray-300 bg-[#d4dcd0] px-6 py-3">
				<div className="h-5 w-24 animate-pulse rounded bg-gray-300/70" />
				<div className="h-5 w-16 animate-pulse rounded bg-gray-300/70" />
				<div className="h-5 w-20 animate-pulse rounded bg-gray-300/70" />
				<div className="h-5 w-10 animate-pulse justify-self-end rounded bg-gray-300/70" />
			</div>
			<div className="space-y-3 px-6 py-4">
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={`archive-skeleton-${index}`}
						className="grid grid-cols-[2fr_0.7fr_1.3fr_0.7fr] gap-4 py-2"
					>
						<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
						<div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
						<div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
						<div className="h-4 w-16 animate-pulse justify-self-end rounded bg-gray-200" />
					</div>
				))}
			</div>
		</div>
	);
}

function RouteComponent() {
	const { search, year } = Route.useSearch();
	const { data, isLoading } = useQuery(archivesQueryOptions(search, year));
	const { isAdmin } = useAuth();

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
				{isLoading ? (
					<ArchiveListSkeleton />
				) : (
					<ArchiveList papers={data ?? []} />
				)}
			</div>
		);
}
