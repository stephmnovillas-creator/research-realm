import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import { queryClient } from "../router";

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
    <TanStackRouterDevtools />
    <ReactQueryDevtools />
  </QueryClientProvider>
);

// Pass the layout to the root route
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
  },
);
