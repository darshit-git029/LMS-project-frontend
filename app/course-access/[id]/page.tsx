/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import CourseContent from "@/app/components/Courses/CourseContent"
import Header from "@/app/components/Header"
import Loader from "@/app/components/Loaders/Loader"
import Heading from "@/app/utils/Heading"
import { useLoaduserQuery } from "@/redux/features/apiSlice"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react";

type Props = {
    params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
    const { id } = await params

    const [Route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)

    const { isLoading, error, data, refetch } = useLoaduserQuery(undefined, { refetchOnMountOrArgChange: true })

    useEffect(() => {
        if (data) {
            const isPurchsed = data.user.courses.find((item: any) => item._id === id)
            if (!isPurchsed) {
                refetch()
                redirect(`/course/${id}`)
            }
            if (error) {
                redirect("/")
            }
        }
    }, [data, error, id, refetch])

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Heading
                        title={`${data?.name} - E-Learning`}
                        description="E-learning is a platform for students to learn and get help from teachers"
                        keyWord="Course Content"
                    />
                    <Header
                        Route={Route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    <CourseContent id={id} user={data?.user} />
                </div>
            )}
        </>
    )
}

export default Page
