import { useSelector } from "react-redux";
import './Header.css';

const Header = () => {
  const tournamentName = useSelector((state) => state.tournament.name);
  return (
    <header>
      <h1>Tournament manager</h1>
      <h2>{tournamentName}</h2>
    </header>
  );
};

export default Header;
