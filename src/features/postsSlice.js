import { createSlice } from "@reduxjs/toolkit";
import appAPI from "../services/appAPI";

const initialState = [];
export const postsSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      appAPI.endpoints.getAllPosts.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
  },
});

export default postsSlice.reducer;
