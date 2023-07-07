import { createSlice } from "@reduxjs/toolkit";

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState: {
    name: "",
    teams: [],
  },
  reducers: {
    createTournament: (state, action) => {
      const { name, teams } = action.payload;
      state = { ...state, name, teams };
    },
    setTeams: (state, action) => {
      state = { ...state, teams: action.payload };
    },
  },
});

export const { createTournament, setTeams } = tournamentSlice.actions;

export default tournamentSlice.reducer;
