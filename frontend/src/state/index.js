//Biblioteca Redux: para cambios de estado
import { createSlice } from "@reduxjs/toolkit";
//Estado inicial de mode, user, token y posts
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};
//Cambios: light/dark
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    //restablecemos valores de user y token a null
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    //Estado user si existe el usuario, si no error
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    //Valor de los posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    //Actualización de los posts
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
