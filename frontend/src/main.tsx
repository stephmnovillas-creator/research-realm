import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import { AuthProvider, useAuth } from "./lib/auth";

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

// biome-ignore lint/style/noNonNullAssertion: root present in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  </React.StrictMode>,
);
