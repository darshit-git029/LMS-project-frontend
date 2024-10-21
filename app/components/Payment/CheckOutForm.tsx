/* eslint-disable @typescript-eslint/no-unused-vars */
import { style } from '@/app/style'
import { useLoaduserQuery } from '@/redux/features/apiSlice'
import { useCreateOrderMutation, useGetPaymentMutation } from '@/redux/features/order/orderApi'
import { Flag } from '@mui/icons-material'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import socketIO from "socket.io-client"
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

type Props = {
    setOpen: any
    data: any
    user:any
  }

const CheckOutForm = ({ setOpen, data ,user}: Props) => {

    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<any>("")
    const [createOrder, { data: orderData,error }] = useCreateOrderMutation()
    const [loadUser, setLoaduser] = useState(false)
    const { } = useLoaduserQuery({skip: loadUser ? false : true})
    const [isLoading, setisLoading] = useState(false)
    console.log(data);
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
          return;
        }
        setisLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });
        if (error) {
          setMessage(error.message);
          setisLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          setisLoading(false);
          createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
      };
    
      useEffect(() => {
       if(orderData){
        setLoaduser(true)
        toast.success("order create completed")
        socketId.emit("notification", {
          title:"New Order",
          message:`You have new order from ${data.name}`,
          userId:user._id
        })
        redirect(`/course-access/${data._id}`)
      }
       console.log(orderData);
       
       if(error){
        if ("data" in error) {
            const errorMessage = error as any;
          }
       }
      }, [orderData,error])
      
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className= "spinner" ></div> : <div className={`${style.button}  dark:text-white text-black mt-5 `}> Pay now</div>}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message" className='text-red-500 mt-3 font-Poppins text-sm'>*{message}</div>}
        </form>
    )
}

export default CheckOutForm