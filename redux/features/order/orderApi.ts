import { apiSlice } from "../apiSlice";


 const Orderapi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: "get/order-admin", //get/all/course
                method: "GET",
                credentials: "include" as const,
            }),

        })
    })
})

export const  {useGetAllOrderQuery} = Orderapi