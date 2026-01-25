const ArchiveList = () => {
  const archives = [
    {
      id: "1",
      title: "Understanding React",
      author: "Jane Doe",
      year: 2021,
    },
  ];
  return (
    <div>
      <h2>Archive List</h2>
      <ul>
        {archives.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> — {item.author} ({item.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchiveList;
