import { Header } from "./pages";
import "./App.css";
import { Link, Outlet, useLocation } from "react-router-dom";

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
        {location.pathname === "/" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1em",
            }}
          >
            <span>This page is currently empty.</span>
            <span>
              You can click on the button bellow to create a tournament
            </span>
            <Link to="/create">
              <button>Create</button>
            </Link>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default App;
