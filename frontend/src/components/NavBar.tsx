import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <nav style={{ background: "#EDEDCE", padding: "10px" }}>
      <Link to="#" style={{ marginRight: 15, color: "black" }}>
        Home
      </Link>
      <Link to="#" style={{ marginRight: 15, color: "black" }}>
        Archives
      </Link>
      <Link to="#" style={{ color: "black" }}>
        Add Archive
      </Link>
    </nav>
  );
};

export default NavBar;
