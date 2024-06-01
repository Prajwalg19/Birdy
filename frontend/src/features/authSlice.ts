import {postsStructure, userStructure} from "@/utils/types";
import {calculateTime} from "@/utils/utilityFunctions";
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

            },
            setPost: (state, action) => {
                const updatedPost: postsStructure = action.payload;
                if (state.posts)
                    state.posts = state.posts.map((post: postsStructure): postsStructure => {
                        if (post._id == updatedPost._id) {
                            updatedPost.createdAt = calculateTime(new Date(updatedPost.createdAt).getTime())
                            return updatedPost;
                        } else {
                            return post
                        }
                    })
            },
            setComment: (state, action) => {
                const updatedPost: postsStructure = action.payload;
                if (state.posts)
                    state.posts = state.posts.map((post: postsStructure): postsStructure => {
                        if (post._id == updatedPost._id) {
                            updatedPost.createdAt = calculateTime(new Date(updatedPost.createdAt).getTime())
                            return updatedPost

                        } else return post

                    }
                    )

            },
            setTempLike: (state, action) => {
                const {postId, userId} = action.payload;

                if (state.posts)
                    state.posts = state.posts.map((post: postsStructure): postsStructure => {
                        if (post._id == postId) {
                            if (post.likes[userId]) {
                                delete post.likes[userId];
                                return post;

                            } else {
                                const temp = post;
                                temp.likes[userId] = true;
                                return temp
                            }
                        } else {
                            return post
                        }
                    })

            }

        }




    }

)
export const {changeTheme, loginSuccess, logOut, setFriends, setPosts, setPost, setComment, setTempLike} = demoSlice.actions;
export default demoSlice.reducer;
