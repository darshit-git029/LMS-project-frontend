/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import CourseContent from "@/app/components/Courses/CourseContent"
import Header from "@/app/components/Header"
import Loader from "@/app/components/Loaders/Loader"
import Heading from "@/app/utils/Heading"
import { useLoaduserQuery } from "@/redux/features/apiSlice"
import { Route } from "@mui/icons-material"
import next from "next"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {
    params: any
}

const page = ({ params }: Props) => {
    const id = params.id
    const [Route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const { isLoading, error, data } = useLoaduserQuery(undefined, {})

    useEffect(() => {
        if (data) {
            const isPurchsed = data.user.courses.find((item: any) => item._id === id)
            if (!isPurchsed) {
                toast.error("you are purchased this course, first purchased this")
                redirect("/")
            }if(error){
                redirect("/")
            }
        }
    }, [data,error])






    return (
        <>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <div className="">
                         <Heading
                        title={`${data?.name} - E-Learning`}
                        description="E-learing is a paltfrom for student to learn and get help form teachers"
                        keyWord="Course Content"
                    />
                    <Header
                        Route={Route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                        <CourseContent id={id} user={data?.user}/>
                    </div>
                )
            }
        </>

    )
}

export default page