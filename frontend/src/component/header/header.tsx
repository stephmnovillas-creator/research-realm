import React from "react";

// Optional: define props if you want a dynamic title
interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Research Realm" }) => {
  return (
    <header style={headerStyle}>
      <div>
        <h1 style={titleStyle}>{title}</h1>
        <p style={taglineStyle}>Discover. Learn. Research.</p>
      </div>

      <nav style={navStyle}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/archive" style={linkStyle}>Archive</a>
        <a href="/about" style={linkStyle}>About</a>
      </nav>
    </header>
  );
};

// =====================
// Inline Styles
// =====================

const headerStyle: React.CSSProperties = {
  backgroundColor: "#0F172A", // Dark blue
  color: "#FFFFFF",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Poppins', sans-serif",
  fontSize: "32px", // 28px – 36px
  fontWeight: 700,  // 600 – 700
};

const taglineStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Poppins', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "#38BDF8", // Sky blue accent
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "1.5rem",
};

const linkStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: "15px", // 14px – 16px
  fontWeight: 500,
  color: "#FFFFFF",
  textDecoration: "none",
};

export default Header;
