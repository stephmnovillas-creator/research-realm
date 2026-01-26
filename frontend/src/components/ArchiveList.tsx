import { FileText } from "lucide-react";
import type { ArchivePaper } from "../types/Archive";
import ArchiveListItem from "./ArchiveListItem";

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
						<ArchiveListItem key={paper.id} paper={paper} index={index} />
					))}
				</tbody>
			</table>
		</div>
	);
}
