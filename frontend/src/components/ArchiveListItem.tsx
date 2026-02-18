import { Link } from "@tanstack/react-router";
import type { ArchivePaper } from "../types/Archive";

interface ArchiveListItemProps {
	paper: ArchivePaper;
	index: number;
}

export default function ArchiveListItem({
	paper,
	index,
}: ArchiveListItemProps) {
	return (
		<tr
			className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
				index % 2 === 0 ? "bg-white" : "bg-gray-50"
			}`}
		>
			<td className="px-6 py-4 text-gray-700">{paper.title}</td>
			<td className="px-6 py-4 text-gray-700">{paper.publishedAt}</td>
			<td className="px-6 py-4 text-gray-700">{paper.author}</td>
			<td className="px-6 py-4 text-center">
				<div className="flex gap-2 justify-center">
					<Link to="/archive-list/$id" params={{ id: String(paper.id) }}>
						<button
							type="button"
							className="px-5 py-2 bg-[#7a9b76] text-white rounded-md hover:bg-[#6a8b66] transition-colors text-sm font-medium"
						>
							VIEW ABSTRACT
						</button>
					</Link>
				</div>
			</td>
		</tr>
	);
}
