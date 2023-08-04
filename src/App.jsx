import { Header } from "./pages";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const tournamentName = "Tournoi";
  const location = useLocation();

  const pageTitle = () => {
    if (location.pathname.startsWith("/tournament")) {
      return tournamentName;
    } else if (location.pathname.startsWith("/create")) {
      return "Créer un tournoi";
    }
  };

  return (
    <div className="app">
      <Header title={pageTitle()} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
