import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";

const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

// Pass the layout to the root route
export const Route = createRootRoute({
  component: RootLayout,
});
