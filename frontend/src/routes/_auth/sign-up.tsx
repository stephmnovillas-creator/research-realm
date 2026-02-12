import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Check, CreditCard, Lock, Mail, User } from "lucide-react";
import { useSignUpForm, sanitizeLrn } from "@/lib/forms/authForms";
import { useAuth } from "../../lib/auth/auth.hooks";

export const Route = createFileRoute("/_auth/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { login } = useAuth();
	const form = useSignUpForm({ login });

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Join Research Realm</h1>
					<p className="text-gray-600">Create an account to explore archives</p>
				</div>

				<form.AppForm>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							event.stopPropagation();
							void form.handleSubmit();
						}}
						className="bg-white rounded-lg shadow-md p-8 space-y-5"
					>
						<form.Subscribe selector={(state) => state.errorMap.onSubmit}>
							{(submitError) =>
								typeof submitError === "string" ? (
									<div className="bg-red-50 border border-red-200 rounded-lg p-4">
										<p className="text-red-700 text-sm font-medium">{submitError}</p>
									</div>
								) : null
							}
						</form.Subscribe>

						<form.AppField name="firstName">
							{(field) => (
								<field.FormTextField
									label="First Name"
									placeholder="John"
									icon={<User className="w-5 h-5" />}
									className="py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
								/>
							)}
						</form.AppField>

						<form.AppField name="lastName">
							{(field) => (
								<field.FormTextField
									label="Last Name"
									placeholder="Doe"
									icon={<User className="w-5 h-5" />}
									className="py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
								/>
							)}
						</form.AppField>

						<form.AppField name="lrn">
							{(field) => (
								<field.FormTextField
									label="LRN (Learner Reference Number)"
									description="Enter Your Learner Reference Number"
									icon={<CreditCard className="w-5 h-5" />}
									maxLength={12}
									normalizeValue={sanitizeLrn}
									className="py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
								/>
							)}
						</form.AppField>

						<form.AppField name="email">
							{(field) => (
								<field.FormTextField
									label="Email Address"
									type="email"
									placeholder="you@example.com"
									icon={<Mail className="w-5 h-5" />}
									className="py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
								/>
							)}
						</form.AppField>

						<form.AppField name="password">
							{(field) => (
								<field.FormPasswordField
									label="Password"
									placeholder="••••••••"
									description="At least 8 characters long"
									icon={<Lock className="w-5 h-5" />}
									className="py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
								/>
							)}
						</form.AppField>

						<form.Subscribe
							selector={(state) => ({
								password: state.values.password,
								confirmPassword: state.values.confirmPassword,
							})}
						>
							{({ password, confirmPassword }) => {
								const passwordsMatch =
									!confirmPassword || password === confirmPassword;

								return (
									<form.AppField name="confirmPassword">
										{(field) => (
											<field.FormPasswordField
												label="Confirm Password"
												placeholder="••••••••"
												icon={<Lock className="w-5 h-5" />}
												rightAdornment={
													confirmPassword && passwordsMatch ? (
														<Check className="w-5 h-5 text-green-500" />
													) : null
												}
												className={
													confirmPassword
														? passwordsMatch
															? "py-3 border-green-300 rounded-lg focus-visible:ring-2 focus-visible:ring-green-400"
															: "py-3 border-red-300 rounded-lg focus-visible:ring-2 focus-visible:ring-red-400"
														: "py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
												}
											/>
										)}
									</form.AppField>
								);
							}}
						</form.Subscribe>

						<form.AppField name="terms">
							{(field) => (
								<div className="flex items-start">
									<input
										id="terms"
										type="checkbox"
										checked={Boolean(field.state.value)}
										onChange={(event) => field.handleChange(event.currentTarget.checked)}
										onBlur={field.handleBlur}
										className="w-4 h-4 rounded border-gray-300 text-[#7a9b76] focus:ring-[#7a9b76] cursor-pointer mt-1"
									/>
									<label htmlFor="terms" className="ml-2 text-sm text-gray-600 cursor-pointer">
										I agree to the Terms of Service and Privacy Policy
									</label>
								</div>
							)}
						</form.AppField>

						<form.FormSubmitButton
							label="Create Account"
							submittingLabel="Creating Account..."
							className="w-full bg-[#7a9b76] text-white py-3 rounded-lg font-semibold hover:bg-[#6a8b66] transition-colors mt-6"
						/>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Already have an account?</span>
							</div>
						</div>

						<button
							type="button"
							onClick={() => router.navigate({ to: "/sign-in" })}
							className="w-full border-2 border-[#7a9b76] text-[#7a9b76] py-3 rounded-lg font-semibold hover:bg-[#f5f7f4] transition-colors"
						>
							Sign In
						</button>
					</form>
				</form.AppForm>

				<p className="text-center text-gray-500 text-sm mt-6">Your research awaits</p>
			</div>
		</div>
	);
}
