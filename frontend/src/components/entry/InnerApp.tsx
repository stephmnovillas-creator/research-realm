import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth/auth.hooks";
import { router } from "../../router";

export default function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}
