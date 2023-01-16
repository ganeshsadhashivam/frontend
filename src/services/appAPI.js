import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const appAPI = createApi({
  reducerPath: "appAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://backendformernblog.vercel.app/",
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
      providesTags: ["Post"],
    }),

    //Getting All of of a user
    getAllUserPosts: builder.query({
      query: () => ({
        url: "/posts/me",
      }),
      providesTags: ["Post"],
    }),

    deletePosts: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    updatePosts: builder.mutation({
      query: ({ id, ...post }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
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
  useDeletePostsMutation,
  useUpdatePostsMutation,
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
