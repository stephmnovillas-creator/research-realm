import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Check, CreditCard, Lock, Mail, User, UserPlus } from "lucide-react";
import React from "react";
import { useAuth } from "../../lib/useAuth";

export const Route = createFileRoute("/_auth/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { login } = useAuth();
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [lrn, setLrn] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [passwordsMatch, setPasswordsMatch] = React.useState(true);

	const handlePasswordChange = (value: string) => {
		setPassword(value);
		setPasswordsMatch(value === confirmPassword);
	};

	const handleConfirmPasswordChange = (value: string) => {
		setConfirmPassword(value);
		setPasswordsMatch(password === value);
	};

	const handleLrnChange = (value: string) => {
		// Only allow digits and limit to 12 characters
		const numericValue = value.replace(/\D/g, "").slice(0, 12);
		setLrn(numericValue);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (lrn.length !== 12) {
			setError("LRN must be exactly 12 digits.");
			return;
		}

		if (!passwordsMatch) {
			setError("Passwords do not match.");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long.");
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("http://localhost:4000/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ firstName, lastName, lrn, email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || "Failed to create account");
				return;
			}

			// Use auth context to login
			login(data.user, data.token);

			// Invalidate router to pick up new auth state
			await router.invalidate();

			// Redirect to archive list on success
			await router.navigate({
				to: "/archive-list",
				search: { search: undefined, year: undefined },
			});
			
		} catch (err) {
			setError("Failed to create account. Please try again.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Join Research Realm
					</h1>
					<p className="text-gray-600">Create an account to explore archives</p>
				</div>

				{/* Form Card */}
				<form
					onSubmit={handleSubmit}
					className="bg-white rounded-lg shadow-md p-8 space-y-5"
				>
					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-4">
							<p className="text-red-700 text-sm font-medium">{error}</p>
						</div>
					)}

					{/* First Name Field */}
					<div>
						<label
							htmlFor="firstName"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							First Name
						</label>
						<div className="relative">
							<User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="firstName"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="John"
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent transition-colors"
								required
							/>
						</div>
					</div>

					{/* Last Name Field */}
					<div>
						<label
							htmlFor="lastName"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Last Name
						</label>
						<div className="relative">
							<User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="lastName"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Doe"
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent transition-colors"
								required
							/>
						</div>
					</div>

					{/* LRN Field */}
					<div>
						<label
							htmlFor="lrn"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							LRN (Learner Reference Number)
						</label>
						<div className="relative">
							<CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="lrn"
								type="text"
								value={lrn}
								onChange={(e) => handleLrnChange(e.target.value)}
								maxLength={12}
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent transition-colors"
								required
							/>
						</div>
						<p className="text-xs text-gray-500 mt-1">
							Enter Your Learner Reference Number
						</p>
					</div>

					{/* Email Field */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Email Address
						</label>
						<div className="relative">
							<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent transition-colors"
								required
							/>
						</div>
					</div>

					{/* Password Field */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Password
						</label>
						<div className="relative">
							<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => handlePasswordChange(e.target.value)}
								placeholder="••••••••"
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent transition-colors"
								required
							/>
						</div>
						<p className="text-xs text-gray-500 mt-1">
							At least 8 characters long
						</p>
					</div>

					{/* Confirm Password Field */}
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Confirm Password
						</label>
						<div className="relative">
							<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(e) => handleConfirmPasswordChange(e.target.value)}
								placeholder="••••••••"
								className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
									confirmPassword &&
									(passwordsMatch
										? "border-green-300 focus:ring-green-400"
										: "border-red-300 focus:ring-red-400")
								} ${!confirmPassword && "border-gray-300 focus:ring-[#7a9b76]"}`}
								required
							/>
							{confirmPassword && passwordsMatch && (
								<Check className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
							)}
						</div>
					</div>

					{/* Terms Agreement */}
					<div className="flex items-start">
						<input
							id="terms"
							type="checkbox"
							className="w-4 h-4 rounded border-gray-300 text-[#7a9b76] focus:ring-[#7a9b76] cursor-pointer mt-1"
							required
						/>
						<label
							htmlFor="terms"
							className="ml-2 text-sm text-gray-600 cursor-pointer"
						>
							I agree to the Terms of Service and Privacy Policy
						</label>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-[#7a9b76] text-white py-3 rounded-lg font-semibold hover:bg-[#6a8b66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
					>
						<UserPlus className="w-5 h-5" />
						{isLoading ? "Creating Account..." : "Create Account"}
					</button>

					{/* Divider */}
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Already have an account?
							</span>
						</div>
					</div>

					{/* Sign In Link */}
					<button
						type="button"
						onClick={() => router.navigate({ to: "/sign-in" })}
						className="w-full border-2 border-[#7a9b76] text-[#7a9b76] py-3 rounded-lg font-semibold hover:bg-[#f5f7f4] transition-colors"
					>
						Sign In
					</button>
				</form>

				{/* Footer Note */}
				<p className="text-center text-gray-500 text-sm mt-6">
					Your research awaits
				</p>
			</div>
		</div>
	);
}
