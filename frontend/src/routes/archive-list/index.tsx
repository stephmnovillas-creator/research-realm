import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import ArchiveList from "../../components/ArchiveList";
import { SearchAndFilters } from "../../components/ArchiveSearchAndFilter";
import type { YEARS } from "../../lib/constants";
import { archivesQueryOptions } from "../../lib/queryOptions";
import { useAuth } from "../../lib/auth";

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
  const router = useRouter();
  const { search, year } = Route.useSearch();
  const { data } = useQuery(archivesQueryOptions(search, year));
  const { isAdmin } = useAuth();
  if (data === undefined) {
    return <div>No archives available.</div>;
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Research Archives</h1>
        {isAdmin && (
          <button
            onClick={() => router.navigate({ to: "/create-research" })}
            className="flex items-center gap-2 px-4 py-2 bg-[#7a9b76] text-white rounded-lg hover:bg-[#6a8b66] transition-colors font-medium"
          >
            <PlusCircle className="w-5 h-5" />
            Add Research
          </button>
        )}
      </div>
      <SearchAndFilters />
      <ArchiveList papers={data} />
    </div>
  );
}
