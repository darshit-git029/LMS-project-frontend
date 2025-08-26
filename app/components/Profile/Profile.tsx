/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { FC, useEffect, useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogoutQuery } from '@/redux/features/auth/authapi'
import { signOut } from 'next-auth/react'
import ProfileInfo from './ProfileInfo'
import Changepassword from './Changepassword'
import CourseCard from '../Courses/CaourseCard'
import { useGetAlluserCourseQuery } from '@/redux/features/courses/courseApi'

type Props = {
    user: any
}

const Profile: FC<Props> = ({ user }) => {

    const { data, isLoading, refetch } = useGetAlluserCourseQuery(undefined, { refetchOnMountOrArgChange: true })

    const [scroll, setScroll] = useState(false)
    const [active, setActive] = useState(1)
    const [avatar, setAvatar] = useState(null)
    const [logout, setLogout] = useState(false)
    const [course, setCourse] = useState([]);

    const { } = useLogoutQuery(undefined, {
        skip: !logout ? true : false
    })
    const logoutHandler = async () => {
        setLogout(true)
        await signOut()
    }

    useEffect(() => {
        if (data) {
            const filteredCourses = user.courses
                .map((userCourse: any) =>
                    data.course.find((course: any) => course._id === userCourse._id)
                )
                .filter((course: any) => course !== undefined);
            setCourse(filteredCourses);
        }
    }, [data]);

    return (
        <div className='w-[85%] min-h-screen flex mx-auto'>
            <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#cfcfcf27] rounded-[5px] shadow-xl dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>
                <SidebarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                    refetch={refetch}
                />
            </div>
            {
                active === 1 && (
                    <div className="w-full h-full bg-transparent mt-[80px]">
                        <ProfileInfo avatar={avatar} user={user} refetch={refetch} />
                    </div>
                )
            }
            {
                active === 2 && (
                    <div className="w-full h-full bg-transparent mt-[80px]">
                        <Changepassword />
                    </div>
                )
            }
            {active === 3 && (
                <div className="w-full min-h-screen pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                        {course &&
                            course.map((item: any, index: number) => (
                                // @ts-ignore: CourseCard props typing doesn't include 'user' yet
                                <CourseCard item={item} key={index} user={user} isProfile={true} />
                            ))}
                    </div>
                    {course.length === 0 && (
                        <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
                            You don&apos;t have any purchased courses!
                        </h1>
                    )}
                </div>
            )}
        </div>
    )
}


export default Profile