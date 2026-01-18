import React from "react";

// Optional: define props if you want a dynamic title
interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Welcome to Research Realm" }) => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <nav style={navStyle}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/archive" style={linkStyle}>Archive</a>
        <a href="/about" style={linkStyle}>About</a>
      </nav>
    </header>
  );
};

// Inline styles
const headerStyle: React.CSSProperties = {
  backgroundColor: "#F5E7C6", // soft cream background
  color: "#333",              // dark text for contrast
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1.8rem",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
};

const linkStyle: React.CSSProperties = {
  color: "#333",       // readable on cream background
  textDecoration: "none",
  fontWeight: 500,
};

export default Header;
