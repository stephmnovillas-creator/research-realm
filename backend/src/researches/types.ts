import type { Research } from "../generated/prisma/client";

export type ResearchSeedEntry = Omit<
	Research,
	"id" | "createdAt" | "updatedAt"
>;
