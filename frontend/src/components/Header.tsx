import { UserCircle } from "lucide-react";

export default function Header() {
	return (
		<header className="bg-[#7a9b76] text-white px-8 py-4 shadow-md z-10">
			<div className="flex items-center justify-end gap-4">
				{/* User Account */}
				<div className="relative">
					<button
						onClick={() => {
							console.log("Login clicked");
						}}
						className="flex items-center gap-2 px-4 py-2 bg-[#6a8b66] hover:bg-[#5a7b56] rounded-full transition-colors"
					>
						<UserCircle className="w-6 h-6" />
						<span className="font-medium">Login</span>
					</button>
				</div>
			</div>
		</header>
	);
}
