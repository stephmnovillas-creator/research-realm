import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { BACKEND_URL } from "@/lib/config/constants";
import type { User } from "@/lib/types/user.types";
import { useAppForm } from "./createHookForms";

interface AuthHookParams {
	login: (user: User, token: string) => void;
}

interface SignInFormValues {
  lrn: string;
  password: string;
  remember: boolean;
}

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  lrn: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

function asMessage(error: unknown, fallback: string): string {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
  }

  return fallback;
}

function sanitizeLrn(value: string): string {
  return value.replace(/\D/g, "").slice(0, 12);
}

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
        if (sanitizeLrn(value.lrn).length !== 12) {
          return "LRN must be exactly 12 digits.";
        }

        if (!value.password.trim()) {
          return "Password is required.";
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
        toast.error(asMessage(error, "Failed to sign in. Please try again."));
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
        if (!value.firstName.trim() || !value.lastName.trim()) {
          return "First and last name are required.";
        }

        if (sanitizeLrn(value.lrn).length !== 12) {
          return "LRN must be exactly 12 digits.";
        }

        if (!value.email.trim()) {
          return "Email address is required.";
        }

        if (value.password.length < 8) {
          return "Password must be at least 8 characters long.";
        }

        if (value.password !== value.confirmPassword) {
          return "Passwords do not match.";
        }

        if (!value.terms) {
          return "You must agree to the Terms of Service and Privacy Policy.";
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
            email: value.email,
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
        toast.error(asMessage(error, "Failed to sign in. Please try again."));
      }
    },
  });
}

export { sanitizeLrn };
