import { createSlice } from "@reduxjs/toolkit";

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: {
        name: '',
        teams: [],
    },
    reducers: {
        setTeams: (state, action) => {
            state = {...state, teams: action.payload};
        }
    }
})

export const { setTeams } = tournamentSlice.actions;

export default tournamentSlice.reducer;