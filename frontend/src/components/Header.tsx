import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
	ChevronDown,
	GraduationCap,
	Home,
	LogOut,
	UserCircle,
} from "lucide-react";
import React from "react";
import { useAuth } from "../lib/useAuth";

export default function Header() {
	const router = useRouter();
	const location = useLocation();
	const { user, logout: authLogout } = useAuth();
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);

	// Check if we're on auth pages
	const isAuthPage =
		location.pathname === "/sign-in" || location.pathname === "/sign-up";

	const isHomePage = location.pathname === "/";

	// Close dropdown when clicking outside
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = async () => {
		await authLogout();
		setIsDropdownOpen(false);
		await router.navigate({ to: "/sign-in" });
	};

	return (
		<header className="bg-linear-to-r from-[#7a9b76] to-[#6a8b66] text-white px-8 py-5 shadow-lg z-10 border-b border-green-800/20">
			<div className="flex items-center justify-between max-w-7xl mx-auto">
				<div className="flex items-center gap-8">
					<div className="flex items-center gap-4">
						<div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
							<GraduationCap className="w-8 h-8 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-wide drop-shadow-md">
								RESEARCH REALM
							</h1>
							<p className="text-xs text-green-50 font-light opacity-90">
								Cabatuan National Comprehensive High School
							</p>
						</div>
					</div>

					{user && !isAuthPage && (
						<nav className="ml-4">
							<Link
								to="/"
								className={`
									flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
									transition-all duration-200 ease-in-out
									${isHomePage ? "bg-white/20 shadow-md" : "hover:bg-white/10"}
								`}
							>
								<Home className="w-4 h-4" />
								<span>Home</span>
							</Link>
						</nav>
					)}
				</div>

				{/* User Profile Dropdown */}
				{user && !isAuthPage && (
					<div className="relative" ref={dropdownRef}>
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10 backdrop-blur-sm border border-white/20"
						>
							<div className="text-right">
								<p className="font-semibold text-sm">
									{user.firstName} {user.lastName}
								</p>
								<p className="text-xs text-green-50 opacity-90 capitalize">
									{user.role.toLowerCase()}
								</p>
							</div>
							<div className="bg-white/20 p-1.5 rounded-full">
								<UserCircle className="w-6 h-6" />
							</div>
							<ChevronDown
								className={`w-4 h-4 transition-transform duration-200 ${
									isDropdownOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
								<div className="px-4 py-3 border-b border-gray-100">
									<p className="text-sm font-semibold text-gray-900">
										{user.firstName} {user.lastName}
									</p>
									<p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
								</div>
								<div className="py-1">
									<button
										onClick={handleLogout}
										className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left group"
									>
										<LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
										<span className="font-medium text-sm">Log Out</span>
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</header>
	);
}
