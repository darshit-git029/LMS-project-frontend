import { apiSlice } from "../apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAllNotification:builder.query({
            query:() => ({
                url:"get/notification",
                method:"GET",
                credentials:"include" as const 
            })
        }),
        updateNotificationstatus:builder.mutation({
            query:(id) => ({
                url:`update/notification/${id}`,
                method:"PUT",
                credentials:"include" as const 
            })
        })
    })
})

export const {useGetAllNotificationQuery,useUpdateNotificationstatusMutation} = notificationApi