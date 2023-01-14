import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/postsSlice";
import usersSlice from "./features/usersSlice";
import appAPI from "./services/appAPI";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: usersSlice,
  posts: postsSlice,
  [appAPI.reducerPath]: appAPI.reducer,
});

// const store = configureStore({
//   reducer: {
//     user: usersSlice,
//     posts: postsSlice,

//     // Add the generated reducer as a specific top-level slice
//     [appAPI.reducerPath]: appAPI.reducer,
//   },
// Adding the api middleware enables caching, invalidation, polling,
// and other useful features of `rtk-query`.
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(appAPI.middleware),
const persistConfig = {
  key: "root",
  storage,
  blacklist: [appAPI.reducerPath],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appAPI.middleware],
});

export default store;
