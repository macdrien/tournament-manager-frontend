import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Home } from "./pages";
import "./App.css";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const tournamentName = "Tournoi";
  const location = useLocation();

  const pageTitle = () => {
    if (location.pathname.startsWith("/tournament")) {
      return tournamentName;
    } else if (location.pathname.startsWith("/create")) {
      return "Créer un tournoi";
    }
  };

  const onThemeChange = event => {
    setDarkTheme(event.target.checked);
  }

  return (
    <div className="app" data-theme={darkTheme ? 'dark' : 'light'}>
      <Header title={pageTitle()} onThemeChange={onThemeChange} darkTheme={darkTheme}/>
      <div className="content">
        {location.pathname === '/' ? <Home/> : <Outlet />}
      </div>
    </div>
  );
}

export default App;
