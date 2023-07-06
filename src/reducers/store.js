import { configureStore } from "@reduxjs/toolkit";
import tournamentReducer from "./tournamentSlice";
import globalReducer from "./globalSlice";

export default configureStore({
    reducer: {
        global: globalReducer,
        tournament: tournamentReducer,
    },
});
