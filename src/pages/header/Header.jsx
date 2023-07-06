import { useSelector } from "react-redux";
import './Header.css';

const Header = () => {
  const pageName = useSelector((state) => state.global.pageName);
  return (
    <header>
      <h1>Tournament manager</h1>
      <h2>{pageName}</h2>
    </header>
  );
};

export default Header;
