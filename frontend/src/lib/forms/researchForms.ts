import { useAppForm } from "./createHookForms";

export interface CreateResearchFormValues {
	title: string;
	author: string;
	publishedAt: number | "";
	abstract: string;
}

interface UseCreateResearchFormParams {
	onSubmit: (payload: {
		title: string;
		author: string;
		publishedAt: number;
		abstract: string;
	}) => Promise<void>;
}

function toMessage(error: unknown): string {
	if (typeof error === "string") {
		return error;
	}

	if (error && typeof error === "object" && "message" in error) {
		const message = (error as { message?: unknown }).message;
		if (typeof message === "string") {
			return message;
		}
	}

	return "Failed to create research.";
}

export function useCreateResearchForm({ onSubmit }: UseCreateResearchFormParams) {
	return useAppForm({
		defaultValues: {
			title: "",
			author: "",
			publishedAt: 2025,
			abstract: "",
		} as CreateResearchFormValues,
			validators: {
				onSubmit: ({ value }): string | undefined => {
				if (!value.title.trim()) {
					return "Research title is required.";
				}

				if (!value.author.trim()) {
					return "Author is required.";
				}

				if (
					typeof value.publishedAt !== "number" ||
					Number.isNaN(value.publishedAt)
				) {
					return "Year published must be a valid number.";
				}

				return undefined;
			},
		},
		onSubmit: async ({ value, formApi }) => {
			formApi.setErrorMap({ onSubmit: undefined });

			if (typeof value.publishedAt !== "number" || Number.isNaN(value.publishedAt)) {
				formApi.setErrorMap({
					onSubmit: "Year published must be a valid number.",
				});
				return;
			}

			try {
				await onSubmit({
					title: value.title.trim(),
					author: value.author.trim(),
					publishedAt: value.publishedAt,
					abstract: value.abstract.trim(),
				});
			} catch (error) {
				formApi.setErrorMap({ onSubmit: toMessage(error) });
			}
		},
	});
}
