/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from 'next/link'
import React, { FC, useState, useEffect } from 'react'
import Navitem from '../utils/Navitem'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'
import CustomModel from "../components/CustomModel" // Fixed import
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Verification from './Auth/Verification'
import Image from 'next/image'
import avatarDefault from "../../assect/Dumy-profile.jpeg"
import { useSession } from 'next-auth/react'
import { useLogoutQuery, useSocialAuthMutation } from '@/redux/features/auth/authapi'
import toast from 'react-hot-toast'
import { useLoaduserQuery } from '@/redux/features/apiSlice'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    Route: string;
    setRoute: (Route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, Route, open, setRoute }) => {

    const [active, setActive] = useState(false)
    const [opensidebar, setOpensidebar] = useState(false)
    const { data: userData, isLoading, refetch } = useLoaduserQuery(undefined, {})
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation()
    const { data } = useSession()
    const [logout, setLogout] = useState(false)

    const { } = useLogoutQuery(undefined, {
        skip: !logout ? true : false
    })
    useEffect(() => {
        if (!isLoading) {
            if (!userData) {
                if (data) {

                    socialAuth({ email: data?.user?.email, name: data?.user?.name, avatar: data?.user?.image })
                }
            }
        }
        else if (data === null)
            if (isSuccess) {
                toast.success("Login Successfully")
            } else if (error) {
                toast.error("Login failed")
            }

        if (data === null && !isLoading && !userData) {
            setLogout(true)
        }

    }, [data, socialAuth, isSuccess, error, isLoading, userData])






    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setActive(true)
            } else {
                setActive(false)
            }
        }

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll)
        }

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Disable body scroll when the modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [open]);

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpensidebar(false)
        }
    }



    return (
        <div className="w-full relative z-[99]">
            <div
                className={`${active
                    ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[99  ] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                    : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[99] dark:shadow"
                    }`}
            >
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={"/"}
                                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                            >
                                ELearning
                            </Link>
                        </div>
                        <div className="flex item-center">
                            <Navitem
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            {/* only for mobile */}
                            <div className="800px:hidden">
                                <HiOutlineMenuAlt3
                                    className='cursor-pointer dark:text-white text-black'
                                    size={25}
                                    onClick={() => setOpensidebar(true)}
                                />
                            </div>
                            {
                                userData ? (
                                    <Link href={"/profile"}>
                                        <Image
                                            src={userData?.user.avatar ? data?.user?.image || userData?.user.avatar.url : avatarDefault}
                                            width={120}
                                            height={120}
                                            alt=''
                                            className='rounded-full ml-3 w-[30px] h-[30px] cursor-pointer'
                                            style={{ border: activeItem === 5 ? "2px solid #ffc107" : "none" }}

                                        />
                                    </Link>
                                ) : (
                                    <HiOutlineUserCircle
                                        className=' 800px:block cursor-pointer dark:text-white text-black'
                                        size={25}
                                        onClick={(e) => (e.preventDefault(), setOpen(true))}

                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
                {/* mobile sidebar */}
                {
                    opensidebar && (
                        <div className="fixed w-full h-screen top-0 left-0 z-[99] dark:bg-[unset] bg-[#00000024]" onClick={handleClose} id="screen">

                            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-950 dark:bg-opacity-90 top-0 right-0">
                                <Navitem activeItem={activeItem} isMobile={true} />
                                {
                                    userData ? (
                                        <Link href={"/profile"}>
                                            <Image
                                                src={userData?.user.avatar ? data?.user?.image || userData?.user.avatar.url : avatarDefault}
                                                width={120}
                                                height={120}
                                                alt=''
                                                className='rounded-full ml-6 w-[30px] h-[30px] cursor-pointer'
                                                style={{ border: activeItem === 5 ? "2px solid #ffc107" : "none" }}

                                            />
                                        </Link>
                                    ) : (
                                        <HiOutlineUserCircle
                                            className=' 800px:block cursor-pointer dark:text-white text-black'
                                            size={25}
                                            onClick={(e) => (e.preventDefault(), setOpen(true))}

                                        />
                                    )
                                }
                                <br />
                                <br />
                                <p className='ml-5'>
                                    Copyright © 2024 Elearning
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                Route === "Login" && (
                    <>{

                        open && (
                            <CustomModel
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={Login}
                                refetch={refetch}
                            />
                        )
                    }
                    </>
                )
            }
            {
                Route === "Sign-Up" && (
                    <>{

                        open && (
                            <CustomModel
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={Signup}
                            />
                        )
                    }
                    </>
                )
            }
            {
                Route === "Verification" && (
                    <>
                        {
                            open && (
                                <CustomModel
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Verification}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Header
