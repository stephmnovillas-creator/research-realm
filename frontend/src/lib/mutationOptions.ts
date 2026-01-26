import { mutationOptions } from "@tanstack/react-query";
import type { ResearchCreateInput } from "backend/src/generated/prisma/models";
import { BACKEND_URL } from "./constants";

/**
 * Mutation options for creating a new Research.
 */
export const createResearchMutationOptions = mutationOptions({
  mutationFn: async (newResearch: ResearchCreateInput) => {
    const response = await fetch(`${BACKEND_URL}/archives`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newResearch),
    });

    if (!response.ok) {
      throw new Error("Failed to create research");
    }

    return response.json();
  }
})
