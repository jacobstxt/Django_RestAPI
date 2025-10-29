import {createApi} from "@reduxjs/toolkit/query/react";
import type {IParentTopic} from "../types/topics/IParentTopic.ts";
import {createBaseQuery} from "../utils/CreateBaseQuery.ts";

export const topicService = createApi({
    reducerPath: 'topicService',
    baseQuery: createBaseQuery('topics'),
    tagTypes: ['Topics'],

    endpoints: (builder) => ({

        // all topics
        getTopics: builder.query<IParentTopic[], void>({
            query: () => {
                return {
                    url: '/all',
                    method: 'GET'
                };
            },
            providesTags: ["Topics"]
        }),
        // root topics only
        getRootTopics: builder.query<IParentTopic[], void>({
            query: () => ({
                url: '?parent=null',
                method: 'GET',
            }),
            providesTags: ['Topics'],
        }),
    }),
});

export const {
    useGetTopicsQuery, useGetRootTopicsQuery
} = topicService;