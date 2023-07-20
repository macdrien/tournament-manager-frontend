import { Header } from "./pages";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const tournamentName = "Tournament";
  const location = useLocation();

  const pageTitle = () => {
    if (location.pathname.startsWith("/tournament")) {
      return tournamentName;
    } else if (location.pathname.startsWith("/create")) {
      return "Create a tournament";
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
