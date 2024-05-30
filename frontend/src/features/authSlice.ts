import {postsStructure, userStructure} from "@/utils/types";
import {createSlice} from "@reduxjs/toolkit";


interface initState {
    theme: "dark" | "light";
    token: null | string;
    user: null | userStructure;
    posts: postsStructure[] | null



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
                if (state.user)
                    state.user.friends = action.payload;
            },
            setPosts: (state, action) => {
                state.posts = action.payload

            }



        }

    }

)
export const {changeTheme, loginSuccess, logOut, setFriends, setPosts} = demoSlice.actions;
export default demoSlice.reducer;
