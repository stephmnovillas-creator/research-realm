import { useMutation } from "@tanstack/react-query";
import { createResearchMutationOptions } from "../lib/api/mutations/archives.mutations";
import { useCreateResearchForm } from "../lib/forms/researchForms";

export default function CreateResearch() {
	const { mutateAsync } = useMutation(createResearchMutationOptions);
	const form = useCreateResearchForm({
		onSubmit: async (payload) => {
			await mutateAsync(payload);
		},
	});

	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
			<div className="w-full rounded-2xl border border-[#dfe7dc] bg-white p-6 shadow-sm sm:p-8">
				<h2 className="mb-6 text-2xl font-bold text-[#2d3b2d]">Add New Research Archive</h2>
				<form.AppForm>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							event.stopPropagation();
							void form.handleSubmit();
						}}
						className="space-y-6"
					>
						<form.Subscribe selector={(state) => state.errorMap.onSubmit}>
							{(submitError) =>
								typeof submitError === "string" ? (
									<div className="bg-red-50 border border-red-200 rounded-lg p-4">
										<p className="text-red-700 text-sm font-medium">{submitError}</p>
									</div>
								) : null
							}
						</form.Subscribe>

						<form.AppField name="title">
							{(field) => (
								<field.FormTextField
									label="Research Title"
									placeholder="Enter the complete research title"
									className="focus-visible:ring-[#7a9b76]"
								/>
							)}
						</form.AppField>

						<form.AppField name="author">
							{(field) => (
								<field.FormTextField
									label="Author(s)"
									placeholder="e.g., Sarah Johnson"
									className="focus-visible:ring-[#7a9b76]"
								/>
							)}
						</form.AppField>

						<form.AppField name="publishedAt">
							{(field) => (
								<field.FormTextField
									label="Year Published"
									type="number"
									min="1900"
									max="2099"
									step="1"
									normalizeValue={(value) =>
										value === "" ? "" : Number.parseInt(value, 10)
									}
									className="focus-visible:ring-[#7a9b76]"
								/>
							)}
						</form.AppField>

						<form.AppField name="abstract">
							{(field) => (
								<field.FormTextareaField
									label="Abstract"
									placeholder="Paste the abstract here..."
									className="min-h-50 focus-visible:ring-[#7a9b76]"
								/>
							)}
						</form.AppField>

						<div className="flex justify-end pt-4">
							<form.FormSubmitButton
								label="Add Archive"
								submittingLabel="Adding Archive..."
								className="rounded-md bg-[#7a9b76] px-8 py-2 text-white hover:bg-[#6a8b66]"
							/>
						</div>
					</form>
				</form.AppForm>
			</div>
		</div>
	);
}
