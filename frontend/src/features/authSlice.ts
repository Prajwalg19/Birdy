import {createSlice} from "@reduxjs/toolkit";


interface initState {
    theme: "dark" | "light";
    token: null | string;
    user: null | {
        _id: string;
        firstName?: string;
        lastName?: string;
        email?: string,
        photoPath?: string
        location?: string,
        friends?: Array<string>;
        viewedProfile?: number;
        impression?: number;
    };
    posts: [] | null



}
const initialState: initState = {
    theme: "dark",
    token: null,
    user: null,
    posts: []
}
const demoSlice = createSlice(
    {
        name: "auth",
        initialState: initialState,
        reducers: {
            changeTheme: (state) => {
                state.theme = state.theme == "light" ? "dark" : "light"
            },
            loginSuccess: (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
            },
            logOut: (state) => {
                state.user = null;
                state.token = null;
            },
            setFriends: (state, action) => {
                //state.user?.friends = action.payload.
            }


        }

    }

)
export const {changeTheme, loginSuccess, logOut} = demoSlice.actions;
export default demoSlice.reducer;
