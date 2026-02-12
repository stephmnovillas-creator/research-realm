import React from "react";
import ReactDOM from "react-dom/client";
import InnerApp from "./components/entry/InnerApp";
import { AuthProvider } from "./lib/auth/auth.provider";

// biome-ignore lint/style/noNonNullAssertion: root present in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
	</React.StrictMode>,
);
