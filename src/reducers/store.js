import { configureStore } from "@reduxjs/toolkit";
import tournamentReducer from "./tournamentSlice";

export default configureStore({
    reducer: {
        tournament: tournamentReducer,
    },
});
