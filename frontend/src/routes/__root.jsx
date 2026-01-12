import { Outlet, Link } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div>
      <h1>Research Realm</h1>

      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Outlet />
    </div>
  );
}
