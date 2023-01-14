import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const appAPI = createApi({
  reducerPath: "appAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      console.log("appAPI:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "DELETE",
      }),
    }),
    //POST Routes
    createPost: builder.mutation({
      query: (article) => ({
        url: "/posts",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Post"],
    }),
    //GET Posts
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
      }),
      providesTags: ["Post"],
    }),

    //GET Single posts
    getOnePost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
      // providesTags: ["Post"],
    }),
    //Getting All of of a user
    getAllUserPosts: builder.query({
      query: () => ({
        url: "/posts/me",
      }),
    }),
    providesTags: ["Post"],
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useGetAllUserPostsQuery,
} = appAPI;

export default appAPI;

// Define a service using a base URL and expected endpoints
// export const appAPI = createApi({
//   reducerPath: "appAPI",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3000/" }),
//   endpoints: (builder) => ({
//     loginUser: builder.mutation({
//       query: (user) => ({
//         url: "/users/login",
//         method: "POST",
//         body: user,
//       }),
//     }),
//     signupUser: builder.mutation({
//       query: (user) => ({
//         url: "/users",
//         method: "POST",
//         body: user,
//       }),
//     }),
//   }),
// });

// export default appAPI;

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { userLoginUseMutation, useSignupUserMutaion } = appAPI;