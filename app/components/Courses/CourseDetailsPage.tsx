import { useGetAllCourseUsersQuery } from '../../../redux/features/courses/courseApi'
import React, { useEffect, useState } from 'react'
import Loader from '../Loaders/Loader'
import Heading from '../../utils/Heading'
import Header from '../Header'
import CourseDetails from './CourseDetails'
import Footer from '@/app/Footer/Footer'
import { useGetPaymentMutation, useGetstripePublishKeyQuery } from '@/redux/features/order/orderApi'
import {loadStripe} from "@stripe/stripe-js"

type Props = {
    id: string

}

const CourseDetailsPage = ({ id }: Props) => {

    const [Route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetAllCourseUsersQuery(id)
    const {data:config} = useGetstripePublishKeyQuery({})
    const [createPaymentIntents,{data:paymentdata}] = useGetPaymentMutation()
    const [stripePromise,setStripePromise] = useState<any>(null)

    const [clientSecret,setClientSecret] = useState('')

    useEffect(() => {
        if(config){
            const publishableKey = config?.publishableKey
            setStripePromise(loadStripe(publishableKey))
            
        }
        if(data){
            const amount = Math.round(data?.course.price * 100)
            createPaymentIntents(amount)
        }
    },[config,data])

    useEffect(() => {
        if(paymentdata){
            setClientSecret(paymentdata.client_secret)
        }
    },[paymentdata])

    

    return (
        <>
            {isLoading ? (<Loader />) : (
                <div className="">
                    <Heading
                        title={`${data?.course.name} - E-Learning`}
                        description="E-learing is a paltfrom for student to learn and get help form teachers"
                        keyWord={data?.course.tags}
                    />
                    <Header
                        Route={Route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    {
                        stripePromise && (
                            <CourseDetails data={data.course} stripePromise={stripePromise} clientSecret={clientSecret}/>
                        )
                    }
                    <Footer/>
                </div>
            )
            }
        </>
    )
}

export default CourseDetailsPage