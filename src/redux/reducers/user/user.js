import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: storedUser ? storedUser : null,
        token: storedToken ? storedToken : null
    },
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;