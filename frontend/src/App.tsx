import { useState } from "react";

import Header from "./component/header/header"; 
import NavBar from "./component/header/navigation menu/NavBar"; 
import SearchBar from "./component/header/SearchBar/SearchBar"; 
import CategoryFilter from "./component/header/CategoryFilter/CategoryFilter"; 
import ArchiveList from "./component/header/ArchiveList/ArchiveList"; 
import AddArchive from "./component/header/AddArchive/AddArchive"; 
import UserRoles from "./component/header/UserRoles/UserRoles";

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
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </>
  );
};

export default App;
