/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from 'next/link'
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react'
import Navitem from '../utils/Navitem'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'
import CustomModel from "../components/CustomModel" // Fixed import
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Verification from './Auth/Verification'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import avatar from "../../../client/assect/client-1.jpg"
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
    const { user } = useSelector((state: any) => state.auth)
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

    console.log(user);


    return (
        <div className="w-full relative">
            <div
                className={`${active
                    ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                    : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
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
                                user ? (
                                    <a href={"/profile"}>
                                    <Image
                                    src={user.avatar ? user.avatar : avatar}
                                    alt=''
                                    className='rounded-full w-[30px] h-[30px] cursor-pointer'
                                    />
                                    </a>
                                ): (
                                        <HiOutlineUserCircle
                                        className = 'hidden 800px:block cursor-pointer dark:text-white text-black'
                                        size = { 25 }
                                        onClick = { () => setOpen(true) }
                        />
                            )
                           }
                        </div>
                    </div>
                </div>
                {/* mobile sidebar */}
                {
                    opensidebar && (
                        <div className="fixed w-full h-screen top-0 left-0 z[99990] dark:bg-[unset] bg-[#00000024]" onClick={handleClose} id="screen">

                            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-950 dark:bg-opacity-90 top-0 right-0">
                                <Navitem activeItem={activeItem} isMobile={true} />
                                <HiOutlineUserCircle
                                    className='cursor-pointer ml-5 my-2 dark:text-white text-black'
                                    size={25}
                                    onClick={() => setOpen(true)}
                                />
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
            {/* LOGIN/ SIGNUP MODAL LOGIC */}
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
