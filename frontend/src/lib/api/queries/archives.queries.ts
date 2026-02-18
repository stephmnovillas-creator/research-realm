import { queryOptions } from "@tanstack/react-query";
import type { ArchiveDetails, ArchivePaper } from "../../../types/Archive";
import type { YEARS } from "../../config/constants";
import { tryCatch } from "../../utils/error-handler";
import { apiFetch } from "../client";

export interface ArchiveFileStatus {
	hasFile: boolean;
	viewUrl: string | null;
}

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

			const response = await tryCatch(() =>
				apiFetch<ArchivePaper[]>(`/archives?${finalParams.toString()}`),
			);

			if (response.success) {
				return response.data;
			}
		},
	});

/**
 * Fetches the details of the archive
 */
export const archiveDetailsQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["archiveDetails", id] as const,
		queryFn: async () => {
			const response = await tryCatch(() =>
				apiFetch<ArchiveDetails>(`/archives/${id}`),
			);

			if (response.success) {
				return response.data;
			}
		},
	});

/**
 * Fetches whether an archive has a backend PDF file.
 */
export const archiveFileStatusQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ["archiveFileStatus", id] as const,
		queryFn: async () => {
			const response = await tryCatch(() =>
				apiFetch<ArchiveFileStatus>(`/archives/${id}/file-status`),
			);

			if (response.success) {
				return response.data;
			}

			return {
				hasFile: false,
				viewUrl: null,
			} satisfies ArchiveFileStatus;
		},
	});
