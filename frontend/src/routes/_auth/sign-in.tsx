import { createFileRoute, useRouter } from "@tanstack/react-router";
import { CreditCard, Lock } from "lucide-react";
import { useSignInForm, sanitizeLrn } from "@/lib/forms/authForms";
import { useAuth } from "../../lib/auth/auth.hooks";

export const Route = createFileRoute("/_auth/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { login } = useAuth();
	const form = useSignInForm({ login });

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md">
				<div className="text-center mb-12">
					<h1 className="text-6xl font-bold text-gray-900 mb-4">Welcome Back</h1>
					<p className="text-2xl text-gray-600">Sign in to access research archives</p>
				</div>

				<form.AppForm>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							event.stopPropagation();
							void form.handleSubmit();
						}}
						className="bg-white rounded-lg shadow-md p-8 space-y-6"
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

						<form.AppField name="lrn">
							{(field) => (
								<field.FormTextField
									label="LRN (Learner Reference Number)"
									description="Enter your 12-digit Learner Reference Number"
									placeholder="123456789012"
									icon={<CreditCard className="w-5 h-5" />}
									maxLength={12}
									normalizeValue={sanitizeLrn}
									className="py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
								/>
							)}
						</form.AppField>

						<form.AppField name="password">
							{(field) => (
								<field.FormPasswordField
									label="Password"
									placeholder="••••••••"
									icon={<Lock className="w-5 h-5" />}
									className="py-3 border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-[#7a9b76] focus-visible:border-transparent"
								/>
							)}
						</form.AppField>

						<form.AppField name="remember">
							{(field) => (
								<div className="flex items-center">
									<input
										id="remember"
										type="checkbox"
										checked={Boolean(field.state.value)}
										onChange={(event) => field.handleChange(event.currentTarget.checked)}
										onBlur={field.handleBlur}
										className="w-4 h-4 rounded border-gray-300 text-[#7a9b76] focus:ring-[#7a9b76] cursor-pointer"
									/>
									<label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">
										Remember me
									</label>
								</div>
							)}
						</form.AppField>

						<form.FormSubmitButton
							label="Sign In"
							submittingLabel="Signing in..."
							className="w-full bg-[#7a9b76] text-white py-3 rounded-lg font-semibold hover:bg-[#6a8b66] transition-colors"
						/>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Don't have an account?</span>
							</div>
						</div>

						<button
							type="button"
							onClick={() => router.navigate({ to: "/sign-up" })}
							className="w-full border-2 border-[#7a9b76] text-[#7a9b76] py-3 rounded-lg font-semibold hover:bg-[#f5f7f4] transition-colors"
						>
							Create Account
						</button>

						<div className="text-center">
							<button type="button" className="text-sm text-[#7a9b76] hover:underline">
								Forgot password?
							</button>
						</div>
					</form>
				</form.AppForm>

				<p className="text-center text-gray-500 text-sm mt-6">
					By signing in, you agree to our Terms of Service
				</p>
			</div>
		</div>
	);
}
