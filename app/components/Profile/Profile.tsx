/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { FC, useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogoutQuery } from '@/redux/features/auth/authapi'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ProfileInfo from './ProfileInfo'
import Changepassword from './Changepassword'

type Props = {
    user:any
}

const Profile:FC<Props> = ({user}) => {

    const [scroll,setScroll] = useState(false)
    const [active,setActive]  = useState(0)
    const [avatar,setAvatar]  = useState(null)
    const [logout,setLogout] = useState(false)

    const {} = useLogoutQuery(undefined,{
        skip: !logout ? true : false
    })
    const logoutHandler = async () => {
        setLogout(true)
        await signOut()
    }

    // if (typeof window !== "undefined") {
    //     window.addEventListener("scroll", () => {
    //         if (window.scrollY > 85) {
    //             setScroll(true)
    //         } else {
    //             setScroll(false)
    //         }
    //     })
    // }

  return (
    <div className='w-[85%] h-screen flex mx-auto'>
        <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#cfcfcf27] rounded-[5px] shadow-xl dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>
            <SidebarProfile
                user={user}
                active={active}
                avatar={avatar}
                setActive={setActive}
                logoutHandler={logoutHandler}
            />
        </div>
            {
                active === 1 && (
                    <div className="w-full h-full bg-transparent mt-[80px]">
                        <ProfileInfo avatar={avatar} user={user}/>
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
    </div>
  )
}

export default Profile