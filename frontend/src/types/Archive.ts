import type { Research } from "backend/src/generated/prisma/client";

/**
 * Type for fetching the archive list
 */
export type ArchivePaper = Omit<Research, "abstract"| "createdAt"| "updatedAt">;


/**
 * Type for fetching the archive details
 */
export type ArchiveDetails = Omit<Research, "createdAt"| "updatedAt">;
