import { FileText } from "lucide-react";
import type { ArchivePaper } from "../types/Archive";

interface ArchiveListProps {
	papers: ArchivePaper[];
}

export default function ArchiveList({ papers }: ArchiveListProps) {
	if (papers.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-sm p-12 text-center">
				<FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
				<p className="text-gray-500 text-lg">
					No research papers found matching your criteria.
				</p>
				<p className="text-gray-400 text-sm mt-2">
					Try adjusting your search or filters.
				</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm overflow-hidden">
			<table className="w-full">
				<thead>
					<tr className="bg-[#d4dcd0] border-b border-gray-300">
						<th className="px-6 py-3 text-left font-semibold text-gray-700">
							Title
						</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">
							Year
						</th>
						<th className="px-6 py-3 text-left font-semibold text-gray-700">
							Author
						</th>
						<th className="px-6 py-3 text-center font-semibold text-gray-700"></th>
					</tr>
				</thead>
				<tbody>
					{papers.map((paper, index) => (
						<tr
							key={paper.id}
							className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
								index % 2 === 0 ? "bg-white" : "bg-gray-50"
							}`}
						>
							<td className="px-6 py-4 text-gray-700">{paper.title}</td>
							<td className="px-6 py-4 text-gray-700">{paper.publishedAt}</td>
							<td className="px-6 py-4 text-gray-700">{paper.author}</td>
							<td className="px-6 py-4 text-center">
								<button
									onClick={() => {
										console.log(`View abstract for paper ID: ${paper.id}`);
									}}
									className="px-5 py-2 bg-[#7a9b76] text-white rounded-md hover:bg-[#6a8b66] transition-colors text-sm font-medium"
								>
									VIEW ABSTRACT
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
