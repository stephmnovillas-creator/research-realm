
// Optional: define props if you want a dynamic title
interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Research Realm" }) => {
  return (
    <header className="flex ">
      <div>
        <h1>{title}</h1>
        <p>Research Realm</p>
      </div>

      <nav>
        <a href="/">Home</a>
        <a href="/archive">Archive</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
};


export default Header;
