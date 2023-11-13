import {createHashRouter} from "react-router-dom";
import App from "./App.jsx";
import { CreateTournament, Generate, Tournament, loaderTournament } from "./pages";
import {actionCreate, actionGenerate} from "./actions";

export default createHashRouter([
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
        path: "generate",
        element: <Generate/>,
        loader: loaderTournament,
        action: actionGenerate,
      },
      {
        path: "tournament",
        element: <Tournament />,
        loader: loaderTournament,
      },
      ],
  },
]);