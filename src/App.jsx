import { Header } from "./pages";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const tournamentName = useSelector((state) => {
    console.log(state, state.tournament, state.tournament.name);
    return state.tournament.name;
  });
  const location = useLocation();
  console.log(location);
  console.log(tournamentName);

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
