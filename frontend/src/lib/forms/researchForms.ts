import { toast } from "sonner";
import { z } from "zod";
import {
	generateApaCitation,
	generateResearchId,
} from "../utils/research-generation";
import { toMessage } from "../utils/toMessage";
import { useAppForm } from "./createHookForms";

const createResearchFormSchema = z.object({
	title: z.string(),
	author: z.string(),
	publishedAt: z.union([z.number(), z.literal("")]),
	researchId: z.string(),
	citation: z.string(),
	abstract: z.string(),
});

const createResearchSubmitSchema = createResearchFormSchema.extend({
	title: z.string().trim().min(1, "Research title is required."),
	author: z.string().trim().min(1, "Author is required."),
	publishedAt: z
		.number({ message: "Year published must be a valid number." })
		.int("Year published must be a whole number.")
		.min(1900, "Year published must be between 1900 and 2099.")
		.max(2099, "Year published must be between 1900 and 2099."),
	researchId: z
		.string()
		.trim()
		.regex(/^\d{4}-\d{3}$/, "Research ID must follow YYYY-### format."),
	citation: z.string().trim().min(1, "Citation is required."),
	abstract: z.string().trim().min(1, "Abstract is required."),
});

export type CreateResearchFormValues = z.infer<typeof createResearchFormSchema>;
type CreateResearchSubmitValues = z.infer<typeof createResearchSubmitSchema>;

interface UseCreateResearchFormParams {
	onSubmit: (payload: CreateResearchSubmitValues) => Promise<void>;
}

const defaultValues: CreateResearchFormValues = {
	title: "",
	author: "",
	publishedAt: 2025,
	researchId: generateResearchId(2025, 1),
	citation: "",
	abstract: "",
};

export function useCreateResearchForm({
	onSubmit,
}: UseCreateResearchFormParams) {
	return useAppForm({
		defaultValues,
		validators: {
			onSubmit: ({ value }): string | undefined => {
				const preparedYear =
					typeof value.publishedAt === "number" &&
					Number.isFinite(value.publishedAt)
						? value.publishedAt
						: Number.NaN;
				const preparedResearchId =
					value.researchId.trim() || generateResearchId(preparedYear, 1);
				const preparedCitation =
					value.citation.trim() ||
					generateApaCitation(value.author, preparedYear, value.title);

				const parsed = createResearchSubmitSchema.safeParse({
					...value,
					publishedAt: preparedYear,
					researchId: preparedResearchId,
					citation: preparedCitation,
				});

				if (!parsed.success) {
					return parsed.error.issues[0]?.message;
				}

				return undefined;
			},
		},
		onSubmit: async ({ value, formApi }) => {
			formApi.setErrorMap({ onSubmit: undefined });

			if (
				typeof value.publishedAt !== "number" ||
				Number.isNaN(value.publishedAt)
			) {
				formApi.setErrorMap({
					onSubmit: "Year published must be a valid number.",
				});
				return;
			}

			try {
				const normalizedResearchId =
					value.researchId.trim() || generateResearchId(value.publishedAt, 1);
				const normalizedCitation =
					value.citation.trim() ||
					generateApaCitation(value.author, value.publishedAt, value.title);

				await onSubmit({
					title: value.title.trim(),
					author: value.author.trim(),
					publishedAt: value.publishedAt,
					researchId: normalizedResearchId,
					citation: normalizedCitation,
					abstract: value.abstract.trim(),
				});
				toast.success("Research archive created successfully!");

				formApi.reset();
			} catch (error) {
				toast.error(toMessage(error, "Failed to create research."));
			}
		},
	});
}
