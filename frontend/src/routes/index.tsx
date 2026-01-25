import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <h2>Welcome to Research Realm 🚀</h2>;
}
