import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createResearchMutationOptions } from "../lib/mutationOptions";

export default function CreateResearch() {
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		publishedAt: 2025,
		abstract: "",
	});
	const { mutate } = useMutation(createResearchMutationOptions);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would gather form data

		mutate(formData);
	};

	const handleChangeText = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	return (
		<div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
			<h2 className="text-2xl font-bold text-[#2d3b2d] mb-6">
				Add New Research Archive
			</h2>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2 flex flex-col">
					<label htmlFor="title">Research Title</label>
					<input
						id="title"
						placeholder="Enter the complete research title"
						className="focus-visible:ring-[#7a9b76]"
						value={formData.title}
						onChange={handleChangeText}
					/>
				</div>

				<div className="space-y-2 flex flex-col">
					<label htmlFor="author">Author(s)</label>
					<input
						id="author"
						placeholder="e.g., Sarah Johnson"
						className="focus-visible:ring-[#7a9b76]"
						value={formData.author}
						onChange={handleChangeText}
					/>
				</div>

				<div className="space-y-2 flex flex-col">
					<label htmlFor="publishedAt">Year Published</label>
					<input
						type="number"
						min="1900"
						max="2099"
						step="1"
						value={formData.publishedAt}
						onChange={(e) => {
							setFormData((prevData) => ({
								...prevData,
								publishedAt: e.target.valueAsNumber,
							}));
						}}
					/>
				</div>

				<div className="space-y-2 flex flex-col">
					<label htmlFor="abstract">Abstract</label>
					<textarea
						id="abstract"
						placeholder="Paste the abstract here..."
						className="min-h-50 focus-visible:ring-[#7a9b76]"
						value={formData.abstract}
						onChange={handleChangeText}
					/>
				</div>

				<div className="flex justify-end pt-4">
					<button
						type="submit"
						className="bg-[#7a9b76] hover:bg-[#6a8b66] text-white py-2 px-8 rounded-md"
					>
						Add Archive
					</button>
				</div>
			</form>
		</div>
	);
}
