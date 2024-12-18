/* eslint-disable react/jsx-no-undef */
"use client"

import { useGetAlluserCourseQuery } from '@/redux/features/courses/courseApi'
import React, { useEffect, useState } from 'react'
import CourseCard from '../Courses/CaourseCard'

type Props = {}

function Courses({ }: Props) {

    const { data, refetch } = useGetAlluserCourseQuery(undefined, { refetchOnMountOrArgChange: true })
    const [course, setCourse] = useState<any[]>([])

    useEffect(() => {
        setCourse(data?.course)
        refetch()
    }, [data, refetch])

    return (
        <div className='w-[90%] 800px:w-[80%] m-auto'>
            <h1 className='text-center mt-10 font-Poppins text-[25px] leading-[35xp] sm:text-3xl lg:text-4xl dark:text-white text-black 800px:leading-[60px]'>
                Expand Your Career <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">Opportunity</span><br />
                Opportunity With Our Courses
            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                {
                    course && course.map((item: any, index: number) => (
                        <CourseCard
                            item={item}
                            key={index} isProfile={false}
                            refetch={refetch}
                        />
                    ))
                }
            </div>
        </div>
    )
}


export default Courses