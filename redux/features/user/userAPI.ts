'use client'
import { apiSlice } from "../apiSlice";


export const userapi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update/profile/picture",
                method: "PUT",
                body: {avatar},
                credentials: "include" as const,
            }),

        }),
        editProfile: builder.mutation({
            query: ({name}) => ({
                url: "updateuser",
                method: "PUT",
                body: {name},
                credentials: "include" as const,
            }),
        }),
        updatePassword: builder.mutation({
            query: ({oldpassword,newpassword}) => ({
                url: "update/password",
                method: "PUT",
                body: {oldpassword,newpassword},
                credentials: "include" as const,
            }),
        })
    })
})

export const {useUpdateAvatarMutation,useEditProfileMutation,useUpdatePasswordMutation} = userapi