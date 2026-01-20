import { useState } from "react";

interface ArchiveItem {
  title: string;
  year: string;
  author: string;
}

const ArchiveList = () => {
  // useState to hold archive items
  const [archives, setArchives] = useState<ArchiveItem[]>([
    { title: "Research Paper A", year: "2024", author: "John Doe" },
    { title: "Research Paper B", year: "2025", author: "Jane Smith" },
  ]);

  // Function to add new archive
  const addArchive = (title: string, year: string, author: string) => {
    const newArchive: ArchiveItem = { title, year, author };
    setArchives([...archives, newArchive]);
  };

  return (
    <div>
      <h2>Archive List</h2>
      <ul>
        {archives.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> — {item.author} ({item.year})
          </li>
        ))}
      </ul>

      {/* Example button to add archive */}
      <button
        onClick={() =>
          addArchive("New Research Paper", "2026", "Alex Johnson")
        }
      >
        Add Archive
      </button>
    </div>
  );
};

export default ArchiveList;
