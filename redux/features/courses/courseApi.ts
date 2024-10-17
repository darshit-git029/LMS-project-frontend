import { apiSlice } from "../apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete/course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),

        }),
        editCourse: builder.mutation({
            query: ({id,data}) => ({
                url: `edit/course/${id}`,
                method: "PUT",
                body:{data},
                credentials: "include" as const,
            }),

        }),
        getAlluserCourse : builder.query({
            query: () => ({
                url:"get/all/course",
                method:"GET",
                credentials:"include" as const
            })
        }),
        getAllCourseUsers: builder.query({
            query: (id) => ({
                url: `get/course/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),

        }),
        getCourseContentData:builder.query({
            query:(id) => ({
                url:`get/course/content/${id}`,
                method:"GET",
                credentials:"include" as const
            })
        }),
        addNewQuestion:builder.mutation({
            query: ({question,courseId,contentId}) => ({
                url:"add/question",
                method:"PUT",
                body:{
                    question,
                    courseId,
                    contentId
                },
                credentials:"include" as const
            }) 
        })

    })
})

export const {useCreateCourseMutation,
    useGetAllCourseQuery,
    useDeleteCourseMutation,
    useEditCourseMutation,
    useGetAlluserCourseQuery,
    useGetAllCourseUsersQuery,
    useGetCourseContentDataQuery,
    useAddNewQuestionMutation,
} = courseApi