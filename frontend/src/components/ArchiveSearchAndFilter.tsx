import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Search } from "lucide-react";
import React from "react";
import { YEARS } from "../lib/constants";

const archiveListRouteApi = getRouteApi("/archive-list/");

export function SearchAndFilters() {
	const params = archiveListRouteApi.useSearch();
	const router = useRouter();

	const [searchQuery, setSearchQuery] = React.useState(params.search || "");

	const handleSearch = (
		search: string,
		year: "all" | (typeof YEARS)[keyof typeof YEARS],
	) => {
		const params = new URLSearchParams();

		if (search) params.append("search", search);
		if (year !== "all") {
			params.append("year", String(year));
		}

		console.log("Navigating to /archive-list with params:", params.toString());

		router.navigate({});
		router.navigate({
			to: `/archive-list`,
			search: {
				search: searchQuery || undefined,
				year: year,
			},
		});
		return;
	};

	return (
		<form
			className="bg-white rounded-lg shadow-sm p-6"
			onSubmit={(e) => {
				e.preventDefault();
				handleSearch(
					searchQuery,
					params.year as "all" | (typeof YEARS)[keyof typeof YEARS],
				);
			}}
		>
			{/* Search Bar */}
			<div className="relative mb-6">
				<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
				<input
					type="text"
					placeholder="Search by title or author..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onBlur={(e) =>
						handleSearch(
							e.target.value,
							params.year as "all" | (typeof YEARS)[keyof typeof YEARS],
						)
					}
					className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent"
				/>
				<button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#7a9b76] text-white px-4 py-2 rounded-lg hover:bg-[#6b8f66] focus:outline-none focus:ring-2 focus:ring-[#5c7f57]">
					SEARCH
				</button>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap gap-4 items-end">
				<div className="flex-1 min-w-37.5 max-w-xs">
					<label
						className="block text-sm font-medium text-gray-700 mb-1 ml-1"
						htmlFor="filter"
					>
						Filter by Year
					</label>
					<select
						value={params.year}
						onChange={(e) => {
							handleSearch(
								searchQuery,
								e.target.value as "all" | (typeof YEARS)[keyof typeof YEARS],
							);
						}}
						className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent bg-white appearance-none cursor-pointer text-gray-600"
					>
						<option value="all">All Years</option>
						{Object.values(YEARS).map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
			</div>
		</form>
	);
}
