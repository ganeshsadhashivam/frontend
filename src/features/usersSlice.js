import { createSlice } from "@reduxjs/toolkit";
import appAPI from "../services/appAPI";
const initialState = {};
export const usersSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      appAPI.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => {
        console.log(state, "user signup");
        state.user = payload.user;
        state.token = payload.token;
      }
    );
    builder.addMatcher(
      appAPI.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        console.log(state, "user login");
        state.user = payload.user;
        state.token = payload.token;
      }
    );

    builder.addMatcher(appAPI.endpoints.logoutUser.matchFulfilled, (state) => {
      delete state.user;
      delete state.token;
    });
  },
});

export default usersSlice.reducer;
