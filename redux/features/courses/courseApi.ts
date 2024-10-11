import { apiSlice } from "../apiSlice";


export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create/course",
                method: "POST",
                body:  data ,
                credentials: "include" as const,
            }),

        }),
        getAllCourse: builder.query({
            query: () => ({
                url: "get/course-admin", //get/all/course
                method: "GET",
                credentials: "include" as const,
            }),

        }),

    })
})

export const {useCreateCourseMutation,useGetAllCourseQuery} = courseApi