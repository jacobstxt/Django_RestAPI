import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/CreateBaseQuery";
import type {IUserItem} from "../types/users/IUserItem";
import type {ILoginResponse} from "../types/users/ILoginResponse.ts";
import type {IUserRegister} from "../types/users/IUserRegister.ts";
import {serialize} from "object-to-formdata";

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: createBaseQuery('users'),
    tagTypes: ['Users'],

    endpoints: (builder) => ({
        getUsers: builder.query<IUserItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Users"]
        }),
        register: builder.mutation<ILoginResponse, IUserRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);
                return {
                    url: 'register/',
                    method: 'POST',
                    body: formData
                };
            },
        }),






    }),
})

export const {
    useGetUsersQuery,
    useRegisterMutation,
} = userService;