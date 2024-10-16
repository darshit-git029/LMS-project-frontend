import build from "next/dist/build";
import { apiSlice } from "../apiSlice";


 const Orderapi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: "get/order-admin",
                method: "GET",
                credentials: "include" as const,
            }),

        }),
        getstripePublishKey: builder.query({
            query:() => ({
                url:"payment/publishStripeKey",
                method:"GET",
                credentials:"include" as const
            })
        }),
        getPayment:builder.mutation({
            query:(amount) => ({
                url:"/payment",
                method:"POST",
                body:{amount},
                credentials:"include" as const
            })
        }),
        createOrder:builder.mutation({
            query:({courseId,payment_info}) => ({
                url:"create/order",
                method:"POST",
                body:{
                    courseId,payment_info
                },
                credentials:"include" as const
            })
        })
    })

})

export const  {useGetAllOrderQuery,useGetPaymentMutation,useGetstripePublishKeyQuery,useCreateOrderMutation} = Orderapi