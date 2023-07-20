import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import CreateTournament, {
  actionCreate,
} from "./pages/createTournament/CreateTournament";
import Tournament, { loaderTournament } from "./pages/tournament/Tournament";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "create",
        element: <CreateTournament />,
        action: actionCreate,
      },
      {
        path: "tournament",
        element: <Tournament />,
        loader: loaderTournament,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
