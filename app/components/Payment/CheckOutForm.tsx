/* eslint-disable @typescript-eslint/no-unused-vars */
import { style } from '@/app/style'
import { useLoaduserQuery } from '@/redux/features/apiSlice'
import { useGetPaymentMutation } from '@/redux/features/order/orderApi'
import { Flag } from '@mui/icons-material'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { redirect } from 'next/dist/server/api-utils'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

type Props = {
    setOpen: any
    data: any
    user: any
}

const CheckOutForm = ({ setOpen, data }: Props) => {

    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<any>("")
    const [createOrder, { data: orderData }] = useGetPaymentMutation()
    const [loadUser, setLoaduser] = useState()
    const { } = useLoaduserQuery(loadUser ? false : true)
    const [isLoading, setisLoading] = useState(false)

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
        redirect(`/course-access/${data._id}`);
       }
       if(Error){
        if ("data" in Error) {
            const errorMessage = Error as any;
            toast.error(errorMessage.data.message);
          }
       }
      }, [orderData,Error])
      
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className={`${style.button} spinner dark:text-white text-black `} id="spinner"></div> : <div className={`${style.button}  dark:text-white text-black mt-5 `}> Pay now</div>}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message" className='text-red-500 mt-3 font-Poppins text-sm'>*{message}</div>}
        </form>
    )
}

export default CheckOutForm