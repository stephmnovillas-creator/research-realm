import { useState } from "react";
import AddArchive from "./components/AddArchive";
import ArchiveList from "./components/ArchiveList";
import CategoryFilter from "./components/CategoryFilter";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import UserRoles from "./components/UserRoles";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <NavBar />
      <UserRoles role="admin" />
      <SearchBar />
      <CategoryFilter />
      <ArchiveList />
      <AddArchive />

      {/* Example state usage */}
      <button onClick={() => setCount(count + 1)}>count is {count}</button>
    </>
  );
};

export default App;
