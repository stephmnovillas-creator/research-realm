import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, FileText, User, Download } from "lucide-react";
import type { ArchiveDetails } from "../types/Archive";
import { getResearchPdfUrl } from "../lib/utils/pdf-url";

interface ArchiveDetailsProps {
    research: ArchiveDetails;
}

export default function ArchiveDetailsComponent({
    research,
}: ArchiveDetailsProps) {
    const pdfUrl = research.researchId ? getResearchPdfUrl(research.researchId) : null;

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            {/* Back Button */}
            <Link
                to=".."
                className="mb-8 inline-flex items-center gap-2 text-[#7a9b76] font-medium transition-colors hover:text-[#6a8b66]"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Archives
            </Link>

            {/* research Header */}
            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#7a9b76] rounded-lg">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {research.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-gray-600">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-[#7a9b76]" />
                                <span className="font-medium">Author:</span>
                                <span>{research.author}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#7a9b76]" />
                                <span className="font-medium">Year:</span>
                                <span>{research.publishedAt}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Abstract Section */}
            <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#7a9b76] rounded"></div>
                    Abstract
                </h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {research.abstract}
                    </p>
                </div>
            </div>

            {/* Additional Information (Optional) */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#7a9b76] rounded"></div>
                    Research Information
                </h2>

                <div className="mb-6 rounded-lg border border-[#dfe7dc] bg-[#f7faf6] p-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">APA Citation</p>
                    <p className="text-gray-800 wrap-break-word">
                        {research.citation ?? "Citation not available."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            Research ID
                        </p>
                        <p className="text-gray-800">
                            {research.researchId ?? research.id}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            Institution
                        </p>
                        <p className="text-gray-800">
                            Cabatuan National Comprehensive High School
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            Publication Year
                        </p>
                        <p className="text-gray-800">{research.publishedAt}</p>
                    </div>

                    {/* PDF Link Section */}
                    {pdfUrl && (
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">
                                Research Document
                            </p>
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#7a9b76] text-white rounded-md hover:bg-[#6a8b66] transition-colors font-medium text-sm"
                            >
                                <Download className="w-4 h-4" />
                                View PDF
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}