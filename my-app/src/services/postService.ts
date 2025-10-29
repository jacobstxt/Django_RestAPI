import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/CreateBaseQuery.ts";
import type {IPostItem} from "../types/posts/IPostItem.ts";

export const postService = createApi({
    reducerPath: 'postService',
    baseQuery: createBaseQuery('posts'),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<IPostItem[], void>({
            query: () => {
                return {
                    url: '/',
                    method: 'GET'
                };
            },
            providesTags: ["Posts"]
        }),
        createPost: builder.mutation<IPostItem, FormData>({
            query: (formData) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ["Posts"]
        }),

    }),
});

export const {
    useGetPostsQuery,useCreatePostMutation,
} = postService;