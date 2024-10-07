/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from 'next/link'
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react'
import Navitem from '../utils/Navitem'
import { ThemeSwitcher } from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'
import CustomModel from "../components/CustomModel"


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    Route: string;
    setRoute: string;
}

const Header: FC<Props> = ({ activeItem, setOpen, Route ,open}) => {

    const [active, setActive] = useState(false)
    const [opensidebar, setOpensidebar] = useState(false)
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setActive(true)
            } else {
                setActive(false)
            }
        })
    }

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpensidebar(false)
        }
    }

    return (
        <div className='w-full relative '>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-10 left-0 w-full h-[80px] z-[80] border-b border-[#ffff] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ff42421c] h-[80px] z-[80] dark:shadow "}`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full ">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div className="">
                            <Link href="/" className='text-[25px] font-Poppins font-[500] text-black dark:text-white'>
                                Elearning
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
                            <HiOutlineUserCircle
                                className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                size={25}
                                onClick={() => setOpen(true)}
                            />
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
            {/* LOGIN LOGIC */}
            {
                Route === "Login" && (
                    <>
                        {
                            open && (
                                <CustomModel/>
                            )
                        }
                    </>
                )
            }

        </div>
    )
}

export default Header