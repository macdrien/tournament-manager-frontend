import {createHashRouter} from "react-router-dom";
import App from "./App.jsx";
import { CreateTournament, Tournament, loaderTournament } from "./pages";
import { actionCreate } from "./actions";
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
        path: "tournament",
        element: <Tournament />,
        loader: loaderTournament,
      },
      ],
  },
]);