import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { BACKEND_URL } from "@/lib/config/constants";
import type { User } from "@/lib/types/user.types";
import { toMessage } from "@/lib/utils/toMessage";
import { useAppForm } from "./createHookForms";

interface AuthHookParams {
	login: (user: User, token: string) => void;
}

function sanitizeLrn(value: string): string {
	return value.replace(/\D/g, "").slice(0, 12);
}

const signInSchema = z.object({
	lrn: z
		.string({ message: "LRN is required." })
		.min(1, "LRN is required.")
		.refine((value) => sanitizeLrn(value).length === 12, {
			message: "LRN must be exactly 12 digits.",
		}),
	password: z.string().trim().min(1, "Password is required."),
	remember: z.boolean(),
});

const signUpSchema = z
	.object({
		firstName: z.string().trim().min(1, "First name is required."),
		lastName: z.string().trim().min(1, "Last name is required."),
		lrn: z
			.string({ message: "LRN is required." })
			.min(1, "LRN is required.")
			.refine((value) => sanitizeLrn(value).length === 12, {
				message: "LRN must be exactly 12 digits.",
			}),
		email: z
			.string()
			.min(1, "Email address is required.")
			.email("Please provide a valid email address."),
		password: z.string().min(8, "Password must be at least 8 characters long."),
		confirmPassword: z.string().min(1, "Confirm password is required."),
		terms: z.boolean().refine((value) => value, {
			message: "You must agree to the Terms of Service and Privacy Policy.",
		}),
	})
	.refine((value) => value.password === value.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match.",
	});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function useSignInForm({ login }: AuthHookParams) {
	const router = useRouter();

	return useAppForm({
		defaultValues: {
			lrn: "",
			password: "",
			remember: false,
		} as SignInFormValues,
		validators: {
			onSubmit: ({ value }): string | undefined => {
				const parsed = signInSchema.safeParse(value);
				if (!parsed.success) {
					return parsed.error.issues[0]?.message;
				}
				return undefined;
			},
		},
		onSubmit: async ({ value, formApi }) => {
			formApi.setErrorMap({ onSubmit: undefined });

			try {
				const response = await fetch(`${BACKEND_URL}/api/auth/signin`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						lrn: sanitizeLrn(value.lrn),
						password: value.password,
					}),
				});

				const data = await response.json();

				if (!response.ok) {
					formApi.setErrorMap({
						onSubmit: data.error || "Failed to sign in",
					});
					return;
				}

				login(data.user, data.token);
				await router.invalidate();
				await router.navigate({
					to: "/archive-list",
					search: { search: undefined, year: undefined },
				});
			} catch (error) {
				toast.error(toMessage(error, "Failed to sign in. Please try again."));
			}
		},
	});
}

export function useSignUpForm({ login }: AuthHookParams) {
	const router = useRouter();

	return useAppForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			lrn: "",
			email: "",
			password: "",
			confirmPassword: "",
			terms: false,
		} as SignUpFormValues,
		validators: {
			onSubmit: ({ value }): string | undefined => {
				const parsed = signUpSchema.safeParse(value);
				if (!parsed.success) {
					return parsed.error.issues[0]?.message;
				}
				return undefined;
			},
		},
		onSubmit: async ({ value, formApi }) => {
			formApi.setErrorMap({ onSubmit: undefined });

			try {
				const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstName: value.firstName,
						lastName: value.lastName,
						lrn: sanitizeLrn(value.lrn),
						email: value.email.trim(),
						password: value.password,
					}),
				});

				const data = await response.json();

				if (!response.ok) {
					formApi.setErrorMap({
						onSubmit: data.error || "Failed to create account",
					});
					return;
				}

				login(data.user, data.token);
				await router.invalidate();
				await router.navigate({
					to: "/archive-list",
					search: { search: undefined, year: undefined },
				});
			} catch (error) {
				toast.error(toMessage(error, "Failed to sign in. Please try again."));
			}
		},
	});
}

export { sanitizeLrn };
