import { queryOptions } from "@tanstack/react-query";
import type { ArchivePaper } from "../types/Archive";
import { BACKEND_URL, type YEARS } from "./constants";
import { tryCatch } from "./tryCatch";

/**
 * Query options for fetching the research list.
 */
export const archivesQueryOptions = (
	search?: string,
	year?: (typeof YEARS)[keyof typeof YEARS] | "all",
) =>
	queryOptions({
		queryKey: ["researchList", search, year] as const,
		queryFn: async () => {

			const finalParams = new URLSearchParams();
			if (search) {
				finalParams.append("search", search);
			}
			if (year && year !== "all") {
				finalParams.append("year", year);
			}
			const response = await tryCatch(
				() =>
					fetch(`${BACKEND_URL}/archives?${finalParams.toString()}`).then((res) => res.json()) as Promise<
						ArchivePaper[]
					>,
			);

			if (response.success) {
				return response.data;
			}
			
		},
	});
