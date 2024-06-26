import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
    name: "user",
    initialState: storedUser ? storedUser : null,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;