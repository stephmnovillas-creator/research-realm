import { mutationOptions } from "@tanstack/react-query";
import type { ResearchCreateInput } from "backend/src/generated/prisma/models";
import { apiFetch } from "../client";

/**
 * Mutation options for creating a new Research.
 */
export const createResearchMutationOptions = mutationOptions({
  mutationFn: async (newResearch: ResearchCreateInput) => {
    return apiFetch("/archives", {
      method: "POST",
      body: JSON.stringify(newResearch),
    });
  },
});
