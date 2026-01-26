import { createFileRoute, redirect } from "@tanstack/react-router";
import CreateResearch from "../components/CreateResearch";

export const Route = createFileRoute("/create-research")({
  beforeLoad: ({ context }) => {
    const { auth } = context;

    // Check if user is authenticated
    if (!auth.isAuthenticated) {
      throw redirect({
        to: "/sign-in",
      });
    }

    // Check if user is admin
    if (!auth.isAdmin) {
      throw redirect({
        to: "/archive-list",
        search: { search: undefined, year: undefined },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateResearch />;
}
