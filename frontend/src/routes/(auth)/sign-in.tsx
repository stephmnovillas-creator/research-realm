import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Lock, LogIn, CreditCard } from "lucide-react";
import React from "react";
import { useAuth } from "../../lib/auth";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { login } = useAuth();
  const [lrn, setLrn] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLrnChange = (value: string) => {
    // Only allow digits and limit to 12 characters
    const numericValue = value.replace(/\D/g, "").slice(0, 12);
    setLrn(numericValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (lrn.length !== 12) {
      setError("LRN must be exactly 12 digits.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lrn, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to sign in");
        return;
      }

      // Use auth context to login
      login(data.user, data.token);

      // Redirect to archive list on success
      router.navigate({
        to: "/archive-list",
        search: { search: undefined, year: undefined },
      });
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-2xl text-gray-600">
            Sign in to access research archives
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

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
                placeholder="12345678901"
                maxLength={12}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent transition-colors"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter your 12-digit Learner Reference Number
            </p>
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a9b76] focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-[#7a9b76] focus:ring-[#7a9b76] cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7a9b76] text-white py-3 rounded-lg font-semibold hover:bg-[#6a8b66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <button
            type="button"
            onClick={() => router.navigate({ to: "/sign-up" })}
            className="w-full border-2 border-[#7a9b76] text-[#7a9b76] py-3 rounded-lg font-semibold hover:bg-[#f5f7f4] transition-colors"
          >
            Create Account
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-[#7a9b76] hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
