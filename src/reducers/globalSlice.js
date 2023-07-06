import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        pageName: 'Create a tournament',
    },
    reducers: {
    }
})

export default globalSlice.reducer;