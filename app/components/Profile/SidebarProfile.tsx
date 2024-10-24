/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
'use client'

import Image from 'next/image'
import React, { FC, useEffect, useState, } from 'react'
import avatarDefault from "../../../assect/Dumy-profile.jpeg"
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineLogout } from 'react-icons/ai'
import { SiCoursera } from 'react-icons/si'
import { useSession } from 'next-auth/react'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'

type Props = {
    user: any,
    active: number,
    avatar: string | null
    setActive: (active: number) => void
    logoutHandler: any
    refetch?:any
}

const SidebarProfile: FC<Props> = ({ user, active, avatar, logoutHandler, setActive,refetch }) => {
    const { data } = useSession()
    const [loaduser, setLoaduser] = useState(false)

    useEffect(() => {
        setLoaduser(true)
    }, [setLoaduser,refetch])
    
    return (
        <div className='w-full'>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(1)}>
                <Image
                    src={user?.avatar ? data?.user?.image || user?.avatar.url : avatarDefault}
                    width={120}
                    height={120}
                    alt="Avatar"
                    className='w-[40px] h-[40px] 800px:w-[20px] 800px:h-[20px] cursor-pointer rounded-full'
                >
                </Image>
                <h2 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'>
                    {user?.name}
                </h2>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(2)}>
                <RiLockPasswordLine size={20} className=" text-black dark:text-white" />
                <h2 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'> Change Password</h2>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(3)}>
                <SiCoursera size={20} className=" text-black dark:text-white" />
                <h2 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'> Enrolled Course</h2>
            </div>
            {
                user?.role === "admin" && (
                    <Link  href={'/admin'} className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 5 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(5)}>
                        <MdOutlineAdminPanelSettings size={20} className=" text-black dark:text-white"/>
                        <h2 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'> Admin Dashboard</h2>
                    </Link>
                )
            }

            <div className={`w-full flex items-center px-3 py-4 cursor-pointer  ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => logoutHandler()}>
                <AiOutlineLogout size={20} className=" text-black dark:text-white" />
                <h2 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'>Logout</h2>
            </div>
        </div>
    )
}

export default SidebarProfile