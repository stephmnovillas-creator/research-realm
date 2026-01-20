const AddArchive = () => {
  return (
    <form>
      <input placeholder="Title" required />
      <br /><br />

      <input placeholder="Author" required />
      <br /><br />

      <input placeholder="Year" required />
      <br /><br />

      <textarea placeholder="Abstract" />
      <br /><br />

      <button type="submit">Add Archive</button>
    </form>
  );
};

export default AddArchive;
