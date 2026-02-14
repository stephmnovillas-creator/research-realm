import { Link } from "@tanstack/react-router";
import { useAuth } from "../lib/auth/auth.hooks";
import type { ArchivePaper } from "../types/Archive";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { toast } from "sonner";

interface ArchiveListItemProps {
  paper: ArchivePaper;
  index: number;
  onDelete?: (id: number) => void;
}

export default function ArchiveListItem({
  paper,
  index,
  onDelete,
}: ArchiveListItemProps) {
  const { isAdmin } = useAuth();

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/archives/${paper.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        toast.success("Research deleted successfully");
        onDelete?.(paper.id);
        // Reload the page after a short delay for better UX
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("Failed to delete research");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting research");
    }
  };

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
          {isAdmin && (
            <DeleteConfirmationModal
              title={paper.title}
              researchDate={paper.publishedAt}
              onConfirm={handleDeleteConfirm}
            />
          )}
        </div>
      </td>
    </tr>
  );
}
