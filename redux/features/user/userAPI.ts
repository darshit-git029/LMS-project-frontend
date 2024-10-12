'use client'
import { apiSlice } from "../apiSlice";


export const userapi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update/profile/picture",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const,
            }),

        }),
        editProfile: builder.mutation({
            query: ({ name }) => ({
                url: "updateuser",
                method: "PUT",
                body: { name },
                credentials: "include" as const,
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update/password",
                method: "PUT",
                body: { oldPassword, newPassword },
                credentials: "include" as const,
            }),
        }),
        getAllUser: builder.query({
            query: ({ }) => ({
                url: "get/user-admin",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        updateUserRole: builder.mutation({
            query: ({ email, role }) => ({
                url: "update-user-role",
                method: "PUT",
                body: { email, role },
                credentials: "include" as const,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete/user/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),

        })
    })
})

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation, useGetAllUserQuery ,useUpdateUserRoleMutation,useDeleteUserMutation} = userapi