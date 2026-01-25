import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      placeholder="Search research..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        padding: "8px",
        width: "100%",
        margin: "10px 0",
        backgroundColor: "#1E293B", // dark background
        color: "#FFFFFF",            // white text
        border: "1px solid #334155", // subtle dark border
        borderRadius: "4px",         // optional rounded corners
        fontFamily: "'Poppins', sans-serif", // consistent font
        fontWeight: 500,
      }}
    />
  );
};

export default SearchBar;
